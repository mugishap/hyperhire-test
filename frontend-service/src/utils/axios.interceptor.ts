import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'https://hyperhire-be.onrender.com/api/v1',
});

export {};
