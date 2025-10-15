import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useMemo } from "react";
import { secureStorage } from "../utils/secureStorage";
const BASE_URL = "http://localhost:8000";
export class ApiError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
export const useAxios = (): AxiosInstance => {
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
    });

    instance.interceptors.request.use(
      (config) => {
        const storedUser = secureStorage.getItem("user");
        // console.log(storedUser);
        const token = storedUser ? storedUser.token : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Handle responses
    instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // Network / timeout errors
        if (!error.response) {
          if (error.message.includes("Network Error")) {
            return Promise.reject(
              new ApiError("No network connection. Please check your internet.")
            );
          }
          if (error.code === "ECONNABORTED") {
            return Promise.reject(
              new ApiError("Request timed out. Please try again.")
            );
          }
          return Promise.reject(new ApiError(error.message));
        }
        const isAuthRequest = originalRequest.url?.includes("/api/users/login");
        const status = error.response.status;

        // Handle 401 Unauthorized — attempt refresh token if available
        if (status === 401 && !originalRequest._retry && !isAuthRequest) {
          originalRequest._retry = true;

          try {
            const refreshResponse = await axios.post(
              `${BASE_URL}/api/auth/refresh`,
              {},
              { withCredentials: true }
            );
            const newToken = refreshResponse.data?.token;

            if (newToken) {
              const currentUser = secureStorage.getItem("user");
              currentUser.token = newToken;
              secureStorage.setItem("user", currentUser);

              instance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
              originalRequest.headers!.Authorization = `Bearer ${newToken}`;
              return instance(originalRequest);
            }
          } catch {
            return Promise.reject(
              new ApiError("Session expired. Please log in again.", 401)
            );
          }
        }
        // Backend message if exists
        const backendMessage = (error.response.data as any)?.message;
        // Default fallback messages
        let errorMessage =
          backendMessage || "An error occurred. Please try again.";

        switch (status) {
          case 400:
            errorMessage =
              backendMessage || "Bad request. Please check your input.";
            break;
          case 403:
            errorMessage =
              backendMessage ||
              "You don't have permission to perform this action.";
            break;
          case 404:
            errorMessage = backendMessage || "Resource not found.";
            break;
          case 408:
            errorMessage =
              backendMessage || "Request timeout. Please try again.";
            break;
          case 500:
            errorMessage =
              backendMessage || "Server error. Please try again later.";
            break;
          case 502:
            errorMessage = backendMessage || "Bad gateway. Server may be down.";
            break;
          case 503:
            errorMessage =
              backendMessage || "Service unavailable. Please try again later.";
            break;
          case 504:
            errorMessage =
              backendMessage || "Gateway timeout. Please try again later.";
            break;
        }

        return Promise.reject(new ApiError(errorMessage, status));
      }
    );
    return instance;
  }, []);

  return axiosInstance;
};
