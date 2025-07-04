export type validationType = {
  USERNAME_VALIDATION: object;
  EMAIL_VALIDATION: object;
  PASSWORD_VALIDATION: (requred: string) => object;
  CONFIRM_PASSWORD_VALIDATION: (
    getValues: (value: string) => string,
    newPassword: string
  ) => object;
};
