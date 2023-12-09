 export const API_URL = 'https://localhost:7206';
export default {
    REGISTER: API_URL + '/auth/register',
    LOGIN: API_URL + '/auth/login',
    FORGOT: API_URL + '/auth/forgot-password',
    RESET: API_URL + '/auth/reset-password',
    VERIFY: API_URL + '/auth/verify',
    CATE: API_URL + '/collections',
    DETAIL: API_URL + '/collections/product',
    ADD_TO_CART: API_URL +'/order/customer',
    PLACE_ORDER: API_URL + '/order/payment/momo',
    CREATE_PRODUCT: API_URL + '/admin/product'
  }