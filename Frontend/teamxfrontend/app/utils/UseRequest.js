import axios from 'axios';

// THIS SHOULD BE FALSE IN PRODUCTION
const isLocal = true;

const url = isLocal
  ? 'http://localhost:3002'
  : 'fill in later';

const newRequest = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default newRequest;