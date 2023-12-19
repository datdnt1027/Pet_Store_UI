 export const API_URL = 'https://localhost:7206';
export default {
    REGISTER: API_URL + '/auth/register',
    LOGIN: API_URL + '/auth/login',
    FORGOT: API_URL + '/auth/forgot-password',
    RESET: API_URL + '/auth/reset-password',
    VERIFY: API_URL + '/auth/verify',
    CATE: API_URL + '/collections',
    GET_BY_CATE: API_URL + '/collections/category',
    DETAIL: API_URL + '/collections/product',
    ADD_TO_CART: API_URL +'/order/customer',
    UPDATE_CART: API_URL + '/order/quantity/customer',
    DELETE_CART: API_URL + '/order/delete/',
    PLACE_ORDER: API_URL + '/order/payment/momo',
    CREATE_PRODUCT: API_URL + '/admin/product',
    LOCK_USER: API_URL + '/admin/customer/status',
    USER_PROFILE: API_URL + '/customer/profile',
    USER_PROFILE_UPDATE: API_URL + '/customer/update_profile',
    ADMIN_PROFILE_UPDATE: API_URL + '/admin/update_profile',
    GET_ADMIN: API_URL + '/admin/profile',
    LOGIN_ADMIN : API_URL + '/admin/login',
    SEARCH_USER : API_URL + '/admin/find_customer',
    USER_ORDER : API_URL + '/customer/orders'
  }