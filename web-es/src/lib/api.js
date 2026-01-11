import axios from "axios";

// const API_BASE_URL = "http://127.0.0.1:8000/api";
// const API_BASE_URL = "http://168.100.11.23/api";
const API_BASE_URL = "https://api.greenbit.live/api";




const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 📌 פונקציה שמחזירה את ההדר Authorization רק אם קיימת בדפדפן
const getAuthHeaders = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authToken");
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
  }
  return {};
};

// 📌 שליחת בקשת GET
export const getRequest = async (endpoint, params = {}) => {
  try {
    const response = await api.get(endpoint, {
      params,
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`GET ${endpoint} failed:`, error);
    throw error;
  }
};

// 📌 שליחת בקשת POST
export const postRequest = async (endpoint, data = {}) => {
  try {
    const response = await api.post(endpoint, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`POST ${endpoint} failed:`, error);
    throw error;
  }
};

// 📌 שליחת בקשת PUT
export const putRequest = async (endpoint, data = {}) => {
  try {
    const response = await api.put(endpoint, data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`PUT ${endpoint} failed:`, error);
    throw error;
  }
};

// 📌 שליחת בקשת DELETE
export const deleteRequest = async (endpoint) => {
  try {
    const response = await api.delete(endpoint, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`DELETE ${endpoint} failed:`, error);
    throw error;
  }
};


export const postFileRequest = async (endpoint, formData = {}) => {
  try {
    const response = await api.post(endpoint, formData, {
      headers: {
        ...getAuthHeaders(),
        // חשוב: לא להגדיר כאן Content-Type, Axios יטפל בזה אוטומטית עם boundary
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`POST FILE ${endpoint} failed:`, error);
    throw error;
  }
};
