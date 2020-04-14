import { setLoading } from 'src/util/helpers';
import { moviesResource } from 'src/util/resources';

// Request interceptor
moviesResource.interceptors.request.use((config) => {
  setLoading(true);
  return config;
}, (error) => {
  setLoading(false);
  console.log('RequestError: ', error);
  // Do something with request error
  return Promise.reject(error);
});

// Response interceptor
moviesResource.interceptors.response.use((response) => {
  setLoading(false);
  return response;
}, (error) => {
  setLoading(false);
  console.log('ResponseError: ', error);
  // Do something with response error
  return Promise.reject(error);
});
