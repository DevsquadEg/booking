 export const EMAIL_VALIDATION = {
          value:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
            message:"Invalid Email"
        }

 export const PASSWORD_VALIDATION = {
  value:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
  message :`Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character`
 }   