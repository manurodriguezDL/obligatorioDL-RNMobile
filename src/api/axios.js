import axios from 'axios';
import store from '../store';

const instance = axios.create({
  baseURL: 'https://mobile-api.inhouse.decemberlabs.com',
});

instance.interceptors.request.use(
  async config => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

export default instance;
