// axios.js or ApiService.js
import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:7000',
});

apiService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    localStorage.clear();
    window.location.href = '/login';
    return Promise.reject(error);
  }
);

export default apiService;
