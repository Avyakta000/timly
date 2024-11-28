import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { AppDispatch } from '../store';

const api = axios.create({
  baseURL: '/api', // Proxy is set to `/api`
  withCredentials: true, // Ensures cookies are sent with requests
});

api.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response?.status === 401) {
      const dispatch = useDispatch<AppDispatch>();
      dispatch(logout()); 
      localStorage.removeItem('user');
    }

    return Promise.reject(error);
  }
);

export default api;
