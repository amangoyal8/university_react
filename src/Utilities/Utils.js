import axios from "axios"

export const handleGetApi = async (url) => {
  try {
    const response = await axios.get(url);
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const handlePostApi = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export const handleDeleteApi = async (url) => {
  try {
    const response = await axios.delete(url);
    return response;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};