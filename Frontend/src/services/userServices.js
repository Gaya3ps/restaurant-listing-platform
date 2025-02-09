import axios from "axios";
import Cookies from "js-cookie";
import axiosInstance from "./axiosInstance";
const baseURL = "https://restaurant-listing-platform.onrender.com/api/users";

export const userRegister = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/register`, formData);
    return response;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};

export const userLogin = async (formData) => {
  try {
    const response = await axios.post(`${baseURL}/login`, formData);
    Cookies.set("token", response.data.token, { expires: 1 });
    return response;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
};

export const fetchRestaurants = async () => {
  try {
    const response = await axiosInstance.get(`${baseURL}/restaurants`);
    return response.data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
export const addRestaurant = async (formData) => {
  try {
    const response = await axiosInstance.post(
      `${baseURL}/restaurants`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding restaurant:", error);
    throw error;
  }
};

export const updateRestaurant = async (id, formData) => {
  try {
    const response = await axiosInstance.put(
      `${baseURL}/restaurants/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating restaurant:", error);
    throw error;
  }
};

export const deleteRestaurant = async (id) => {
  try {
    await axiosInstance.delete(`${baseURL}/restaurants/${id}`);
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    throw error;
  }
};
