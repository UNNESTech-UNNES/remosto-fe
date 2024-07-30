/**
 * axios setup to use mock service
 */

import axios from 'axios';

const axiosServices = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_BASE_URL || 'https://backend-remosto-ujrltkkgyq-et.a.run.app/',
  baseURL: 'https://backend-remosto-ujrltkkgyq-et.a.run.app',
});

// interceptor for http
axiosServices.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services'),
);

export default axiosServices;
