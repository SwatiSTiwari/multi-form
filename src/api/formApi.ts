import axios from "axios";
import { FormDataType } from "../context/FormContext";

// API base URL
const API_URL = "http://localhost:5000/api";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// API functions
export const formApi = {
  // Get all form data
  getFormData: async () => {
    try {
      const response = await api.get("/form");
      return response.data;
    } catch (error) {
      console.error("Error fetching form data:", error);
      throw error;
    }
  },

  // Save personal information
  savePersonalInfo: async (data: FormDataType["personalInfo"]) => {
    try {
      const response = await api.post("/form/personalInfo", data);
      return response.data;
    } catch (error) {
      console.error("Error saving personal info:", error);
      throw error;
    }
  },

  // Save educational status
  saveEducationalStatus: async (data: FormDataType["educationalStatus"]) => {
    try {
      const response = await api.post("/form/educationalStatus", data);
      return response.data;
    } catch (error) {
      console.error("Error saving educational status:", error);
      throw error;
    }
  },

  // Save projects
  saveProjects: async (data: FormDataType["projects"]) => {
    try {
      const response = await api.post("/form/projects", data);
      return response.data;
    } catch (error) {
      console.error("Error saving projects:", error);
      throw error;
    }
  },

  // Complete form submission
  completeForm: async (data: FormDataType) => {
    try {
      const response = await api.post("/form/complete", data);
      return response.data;
    } catch (error) {
      console.error("Error completing form:", error);
      throw error;
    }
  },
};

export default formApi;