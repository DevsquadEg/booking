// ------------------ Auth Routes ------------------
export const MAIN_PATH = "/";
export const LOGIN_PATH = `${MAIN_PATH}login`;
export const REGISTER_PATH = `${MAIN_PATH}register`;
export const FORGET_PASS_PATH = `${MAIN_PATH}forget_pass`;
export const RESET_PASS_PATH = `${MAIN_PATH}reset_pass`;
export const VERIFY_ACCOUNT_PATH = `${MAIN_PATH}verify_account`;

// ------------------ Main Layout Routes ------------------
export const HOME_PATH = MAIN_PATH;
export const ROOMS_GRID_PATH = `${MAIN_PATH}rooms`;
export const ROOM_DETAILS_PATH = `${MAIN_PATH}room_details/:id`;
export const FAV_LIST_PATH = `${MAIN_PATH}fav_list`;
export const PAYMENT_PATH = `${MAIN_PATH}payment`;
export const CONFIRMATION_PATH = `${MAIN_PATH}confirmation`;
export const CHANGE_PASS_PATH = `${MAIN_PATH}change_pass`;

// ------------------ Dashboard Layout Routes ------------------
export const DASHBOARD_PATH = `${MAIN_PATH}dashboard`;

// Dashboard > Facilities
export const FACILITIES_LIST_PATH = `${DASHBOARD_PATH}/facilities_list`;
export const FACILITY_DATA_PATH = `${DASHBOARD_PATH}/facility_data`;

// Dashboard > Ads
export const ADS_LIST_PATH = `${DASHBOARD_PATH}/ads_list`;
export const AD_ADD_PATH = `${DASHBOARD_PATH}/ad_data/add/`;
export const AD_EDIT_PATH = `${DASHBOARD_PATH}/ad_data/edit/:id`;

// Dashboard > Rooms
export const ROOMS_LIST_PATH = `${DASHBOARD_PATH}/rooms_list`;
export const ROOM_ADD_PATH = `${DASHBOARD_PATH}/room/add/`;
export const ROOM_EDIT_PATH = `${DASHBOARD_PATH}/room/edit/:id`;

// Dashboard > Bookings
export const BOOKINGS_LIST_PATH = `${DASHBOARD_PATH}/bookings_list`;
export const BOOKING_DATA_PATH = `${DASHBOARD_PATH}/booking_data`;

// Dashboard > Users
export const USERS_LIST_PATH = `${DASHBOARD_PATH}/users_list`;
export const USER_DATA_PATH = `${DASHBOARD_PATH}/user_data/:id`;
