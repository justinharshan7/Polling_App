import axios from 'axios';

const API_URL = 'http://localhost:5000/polls';

export const createPoll = async (question, options) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(
    'http://localhost:5000/polls',
    { question, options },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

export const getPoll = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const votePoll = async (id, optionIndex) => {
  const response = await axios.post(`${API_URL}/${id}/vote`, { optionIndex });
  return response.data;
};

export const registerUser = async (username, password) => {
  const response = await axios.post('http://localhost:5000/auth/register', { username, password });
  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await axios.post('http://localhost:5000/auth/login', { username, password });
  return response.data;
};