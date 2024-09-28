import axios from 'axios';

const API_URL = 'http://localhost:5000/api/data';

export const fetchData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const generateData = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/generate`, formData);
    return response.data;
  } catch (error) {
    throw error; 
  }
};
