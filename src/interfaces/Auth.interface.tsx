export interface  ForgetProps {
  email:string;
  password:string;

}



export interface ResetPasswordProps {
    email:string;
    password: string;
    confirmPassword: string;
    seed: string;
}
