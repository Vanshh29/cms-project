import axios from 'axios';

const API_BASE = 'http://localhost:3001/api';

export const getWords = async (page, limit, search) => {
  const response = await axios.get(`${API_BASE}/words`, {
    params: { page, limit, search }
  });
  return response.data;
};

export const updateWord = async (id, updatedFields) => {
  const response = await axios.put(`${API_BASE}/words/${id}`, updatedFields);
  return response.data;
};