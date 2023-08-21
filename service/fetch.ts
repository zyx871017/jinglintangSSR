import axios from 'axios';

const request = axios.create({
  withCredentials: true
  // baseURL: `http://${process.env.SERVICE_HOST}:${process.env.SERVICE_PORT}`
});

request.interceptors.request.use((config) => config, error => Promise.reject(error));

request.interceptors.response.use(response => {
  if (response?.status === 200) {
    return response?.data;
  } else {
    return {
      code: -1,
      msg: '未知错误',
      data: null
    };
  }
}, error => Promise.reject(error));

export default request;
