export const API_URL = 'https://localhost:7206';
const apiEndpoints = {
  REGISTER: API_URL + '/auth/register',
  LOGIN: API_URL + '/auth/login',
  FORGOT: API_URL + '/auth/forgot-password',
  RESET: API_URL + '/auth/reset-password',
  VERIFY: API_URL + '/auth/verify'
};

export default apiEndpoints;
