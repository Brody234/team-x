import axios from 'axios';

// THIS SHOULD BE FALSE IN PRODUCTION
const isLocal = true;
//request backend container
const url = isLocal
  ? 'http://localhost:3002'
  : '';

const newRequest = axios.create({
  baseURL: url,
  withCredentials: true
});

newRequest.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = token; // Set token in headers as expected by the backend
  }
  return config;
}, error => {
  return Promise.reject(error);
});



export default newRequest;