import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'TOKEN_KEY';

const apiClient = axios.create({
  baseURL: '/api',  
  headers: {
    'Cache-Control': 'no-cache'
  },
});

apiClient.interceptors.request.use(
    async (config) => {
        const token = await EncryptedStorage.getItem(TOKEN_KEY);
        if (token && config.url !== '/signin/' && config.url !== '/signup/') {
            // TODO: check headers
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
  );

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response && error.response.status === 401) {
      // clear token and set isAuth to false
      await EncryptedStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.setItem('isauth', false);
    }
    return Promise.reject(error);
  }
);

export default apiClient;