
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

export interface submitBtnAuth{
    isSubmitting: boolean;
    title: string;
    className?: string;

} 
