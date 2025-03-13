import axios from "axios";

// GET request function
export const getData = async (endpoint, token = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(`${process.env.API_URL}${endpoint}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// POST request function
export const postData = async (endpoint, data, token = null) => {
  try {
    const headers = token
      ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
      : { "Content-Type": "application/json" }; // If no token, only set the content type

    const response = await axios.post(
      `${process.env.API_URL}${endpoint}`,
      data,
      { headers }
    );
    return response.data || response.status;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

//file send
export const postDataWithFile = async (endpoint, token = null, data = null) => {
  try {
    const headers = token
      ? {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      : {};

    const response = await axios.post(
      `${process.env.API_URL}${endpoint}`,
      data,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

//PUT Data
export const putData = async (endpoint,token = null, data = null) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await axios.put(`${process.env.API_URL}${endpoint}`, data ?? {}, { headers });

    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};


export const deleteData = async (endpoint, token = null) => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.delete(`${process.env.API_URL}${endpoint}`, {
      headers,
    });

    return response.data || { message: "Deleted successfully" };
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
