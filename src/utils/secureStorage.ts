import CryptoJS from "crypto-js";

const SECRET_KEY = "&Mela#ADNY@";

export const secureStorage = {
  setItem: (key: string, value: any) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(value),
        SECRET_KEY
      ).toString();
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error("Error encrypting data:", error);
    }
  },

  getItem: (key: string) => {
    try {
      const encryptedData = localStorage.getItem(key);
      if (!encryptedData) return null;
      const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error("Error decrypting data:", error);
      return null;
    }
  },

  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing data:", error);
    }
  },
};
