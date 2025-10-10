import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useMemo } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
const BASE_URL = "http://localhost:8000";

export const useAxios = (): AxiosInstance => {
  const navigator = useNavigate();
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
    });

    instance.interceptors.request.use(
      (config) => {
        const storedUser = localStorage.getItem("user");
        const token = storedUser ? JSON.parse(storedUser).token : null;
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

        // Handle 401 Unauthorized — attempt refresh token if available
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshResponse = await axios.post(
              `${BASE_URL}/auth/refresh`,
              {},
              { withCredentials: true }
            );
            const newToken = refreshResponse.data?.token;

            if (newToken) {
              // Store new token
              const currentUser = JSON.parse(
                localStorage.getItem("user") || "{}"
              );
              currentUser.token = newToken;
              localStorage.setItem("user", JSON.stringify(currentUser));
              // Update header and retry original request
              axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
              originalRequest.headers!.Authorization = `Bearer ${newToken}`;
              return axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            message.error("Token refresh faild");
            navigator("/login");
          }
        }

        // Handle other errors
        switch (error.response?.status) {
          case 400:
            message.error("Bad request. Please check your input.");
            break;
          case 403:
            message.error("You don't have permission to perform this action.");
            break;
          case 500:
            message.error("Server error. Please try again later.");
            break;
          default:
            message.error("An error occurred. Please try again.");
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  return axiosInstance;
};
