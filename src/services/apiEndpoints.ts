export const imgBaseURL: string = "https://upskilling-egypt.com:3000/"; // Assuming this remains the same for images
export const baseURL: string = "https://upskilling-egypt.com:3000/api/v0"; // Updated base URL based on Postman

// -----------------------------------------------------------------------------
// ADMIN  ENDPOINTS
export const ADMIN_URLS = {
  USER: {
    // Path to get all users (admin view, with pagination/filtering)
    GET_ALL_USERS: "/admin/Users", // Example: /api/v0/admin/Users?page=1&size=10
    // Path to get a specific user profile (admin view)
    GET_USER_PROFILE: (id: string): string => `/admin/Users/${id}`,
    // Path to create a new user (e.g., manager, admin)
    CREATE_USER: "/admin/Users",
    // Path for admin to reset a user's password
    RESET_PASSWORD: "/admin/Users/reset-password", // Assuming a dedicated admin reset endpoint
    // Path for admin to change a user's password
    CHANGE_PASSWORD: "/admin/Users/change-password", // Assuming a dedicated admin change endpoint
    // Path for admin to login (if different from regular user login)
    LOGIN: "/admin/users/login", // As seen in Postman screenshot
    // Path for admin to forget password (if different from regular user)
    FORGET_PASSWORD: "/admin/users/forget-password", // As seen in Postman screenshot
  },

  // Room Management Endpoints within Admin
  ROOM: {
    // Path to create a new room
    CREATE_ROOM: "/admin/Room",
    // Path to get details of a specific room by its ID
    GET_ROOM: (id: number): string => `/admin/Room/${id}`,
    // Path to update details of a specific room by its ID
    UPDATE_ROOM: (id: number): string => `/admin/Room/${id}`,
    // Path to delete a specific room by its ID
    DELETE_ROOM: (id: number): string => `/admin/Room/${id}`,
    // Path to get all rooms (admin view, with filtering/pagination)
    GET_ALL_ROOMS: "/admin/Room",
    // Path to get room types/facilities
    GET_ROOM_FACILITIES: "/admin/RoomFacility", // As seen in Postman screenshot
    // Path to add a new room facility
    ADD_ROOM_FACILITY: "/admin/RoomFacility",
    // Path to delete a room facility
    DELETE_ROOM_FACILITY: (id: number): string => `/admin/RoomFacility/${id}`,
  },

  // Booking Management Endpoints within Admin
  BOOKING: {
    // Path to create a new booking (admin can create bookings)
    CREATE_BOOKING: "/admin/Booking",
    // Path to get details of a specific booking by its ID (admin view)
    GET_BOOKING: (id: number): string => `/admin/Booking/${id}`,
    // Path to update details of a specific booking by its ID (admin view)
    UPDATE_BOOKING: (id: number): string => `/admin/Booking/${id}`,
    // Path to cancel a specific booking by its ID (admin view)
    CANCEL_BOOKING: (id: number): string => `/admin/Booking/${id}/cancel`,
    // Path to delete a specific booking by its ID (admin view)
    DELETE_BOOKING: (id: number): string => `/admin/Booking/${id}`,
    // Path to get all bookings (admin view, with filtering/pagination)
    GET_ALL_BOOKINGS: "/admin/Booking",
    // Path to confirm a specific booking (admin action)
    CONFIRM_BOOKING: (id: number): string => `/admin/Booking/${id}/confirm`,
  },

  // Ads Management Endpoints within Admin
  ADS: {
    // Path to create a new ad
    CREATE_AD: "/admin/Ads",
    // Path to get details of a specific ad by its ID
    GET_AD: (id: number): string => `/admin/Ads/${id}`,
    // Path to update details of a specific ad by its ID
    UPDATE_AD: (id: number): string => `/admin/Ads/${id}`,
    // Path to delete a specific ad by its ID
    DELETE_AD: (id: number): string => `/admin/Ads/${id}`,
    // Path to get all ads (admin view, with filtering/pagination)
    GET_ALL_ADS: "/admin/Ads",
  },

  // Dashboard Endpoints within Admin
  DASHBOARD: {
    GET_SUMMARY: "/admin/dashboard", // Assuming a general dashboard endpoint
  },
};

// -----------------------------------------------------------------------------
// PORTAL API ENDPOINTS
// Grouping all API paths related to the 'portal' (client/user-facing) section.
export const PORTAL_URLS = {
  // User Management Endpoints within Portal
  USER: {
    // User login path for portal users
    LOGIN: "/portal/users/login", // As seen in Postman screenshot
    // Path for portal users to register
    REGISTER: "/portal/users", // Assuming a separate registration for portal
    // Path for portal users to forget password
    FORGET_PASSWORD: "/portal/users/forget-password", // As seen in Postman screenshot
    // Path for portal users to reset password
    RESET_PASSWORD: "/portal/users/reset-password", // As seen in Postman screenshot
    // Path for Google OAuth login
    GOOGLE_AUTH: "/portal/google-auth", // As seen in Postman screenshot
    // Path for Facebook OAuth login
    FACEBOOK_AUTH: "/portal/facebook-auth", // As seen in Postman screenshot
    // Path to get current user profile for portal users
    GET_USER_PROFILE: "/portal/users/currentUser", // Assuming a dedicated endpoint for portal
    // Path to update current user profile for portal users
    UPDATE_PROFILE: "/portal/users",
    // Path to change password for portal users
    CHANGE_PASSWORD: "/portal/users/ChangePassword",
    // Path to verify account for portal users
    VERIFY_ACCOUNT: "/portal/users/verify",
  },

  // Rooms Endpoints within Portal
  ROOMS: {
    // Path to get all available rooms for booking (portal view)
    GET_ALL_ROOMS: "/portal/Rooms",
    // Path to get details of a specific room by its ID (portal view)
    GET_ROOM_DETAILS: (id: number): string => `/portal/Rooms/${id}`,
    // Path to get favorite rooms for the current user
    GET_FAVORITE_ROOMS: "/portal/Favorite-rooms", // As seen in Postman screenshot
    // Path to add a room to favorites
    ADD_TO_FAVORITES: "/portal/Favorite-rooms",
    // Path to remove a room from favorites
    REMOVE_FROM_FAVORITES: (roomId: number): string =>
      `/portal/Favorite-rooms/${roomId}`,
    // Path to get comments for a specific room
    GET_ROOM_COMMENTS: (roomId: number): string =>
      `/portal/Room-comments/${roomId}`, // As seen in Postman screenshot
    // Path to add a comment to a room
    ADD_ROOM_COMMENT: "/portal/Room-comments",
    // Path to get reviews for a specific room
    GET_ROOM_REVIEWS: (roomId: number): string =>
      `/portal/Room-reviews/${roomId}`, // As seen in Postman screenshot
    // Path to add a review to a room
    ADD_ROOM_REVIEW: "/portal/Room-reviews",
  },

  // Booking Endpoints within Portal
  BOOKING: {
    // Path to create a new booking by a portal user
    CREATE_BOOKING: "/portal/Booking",
    // Path to get details of a specific booking by its ID for a portal user
    GET_BOOKING: (id: number): string => `/portal/Booking/${id}`,
    // Path to update details of a specific booking by its ID for a portal user
    UPDATE_BOOKING: (id: number): string => `/portal/Booking/${id}`,
    // Path to cancel a specific booking by its ID for a portal user
    CANCEL_BOOKING: (id: number): string => `/portal/Booking/${id}/cancel`,
    // Path to get all bookings for the current portal user
    GET_MY_BOOKINGS: "/portal/Booking/my-bookings", // Assuming a dedicated endpoint for user's own bookings
  },

  // Ads Endpoints within Portal (if applicable for users to view)
  ADS: {
    // Path to get all active ads for portal users
    GET_ALL_ADS: "/portal/Ads",
    // Path to get a specific ad by its ID for portal users
    GET_AD: (id: number): string => `/portal/Ads/${id}`,
  },
};

// -----------------------------------------------------------------------------

export const PING_URL: string = "/Misc/Ping"; // Check if service is working
