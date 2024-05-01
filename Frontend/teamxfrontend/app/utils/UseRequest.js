import axios from 'axios';

// THIS SHOULD BE FALSE IN PRODUCTION
const isLocal = true;

//request backend container
const url = isLocal
  ? 'http://localhost:3002'
  : '';

const newRequest = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default newRequest;