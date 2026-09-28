import axios from 'axios';

const API_URL = 'http://localhost:5000/polls';

export const createPoll = async (question, options) => {
  const response = await axios.post(API_URL, { question, options });
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