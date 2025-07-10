export type validationType = {
  USERNAME_VALIDATION: object;
  EMAIL_VALIDATION: object;
  PASSWORD_VALIDATION: (requred: string) => object;
  CONFIRM_PASSWORD_VALIDATION: (
    getValues: (value: string) => string,
    newPassword: string
  ) => object;
};

export type DecodedTokenPayload = {
  exp: number;
  iat: number;
  role: string;
  verified: boolean;
  _id: string;
};

export type FullUserDataType = {
  country: string;
  createdAt: Date | string;
  email: string;
  phoneNumber: number;
  profileImage: string;
  role: "admin" | "portal";
  updatedAt: Date | string;
  userName: string;
  verified: boolean;
  _id: string;
};

export type AuthContextType = {
  isLoading: boolean;
  loginData: DecodedTokenPayload | null;
  fullUserData: FullUserDataType | null;
  logOutUser: () => void;
  saveLoginData: () => void;
  getCurrentUser: () => void;
};

export type RoomFormInputs = {
  roomNumber: string;
  price: string;
  discount: string;
  capacity: string;
  facilities: string[];
  imgs: File | null;

};

