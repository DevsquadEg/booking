export interface RegisterProps {
  userName: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  confirmPassword: string;
  profileImage: File | null;
  role: "user";
}

export interface LoginProps {
  email: string;
  password: string;
}
export interface ForgetProps {
  email: string;
  password: string;
}

export interface ResetPasswordProps {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}

export interface ChangePasswordProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// regitser interface
export interface IRegitserForm {
  userName: string;
  email: string;
  password: string;
  country: CountryType;
  phoneNumber: string;
  confirmPassword: string;
  profileImage: File | null;
}

export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

export interface submitBtnAuth {
  isSubmitting: boolean;
  title: string;
  className?: string;
}

export interface IroomList {
  roomNumber:number;
  images: string[];
  price: number;
  discount: number;
  capacity: number;
  length: number | null;
facilities: { _id: string; name: string }[]; 
  createdAt: string;
  _id: string;
  
}

 export interface Facility {
  _id: string;
  name: string;
  [key: string]: any; 
}




