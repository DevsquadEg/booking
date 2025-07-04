
import { useCallback, useEffect, useState } from "react";
import { useForm} from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import resetBg from "../../../assets/imgs/reset-password.png"

// mui imports 
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import type { ResetPasswordProps } from "../../../interfaces/Auth.interface";
import { USER_RESET_PASSWORD } from "../../../services/apiEndpoints";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../services/Validation";






export default function ResetPass() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [helperText, setHelperText] =useState("");
const navigate = useNavigate()

const location = useLocation()


  const {register , handleSubmit , watch , formState: { errors,isSubmitting} ,trigger} = useForm<ResetPasswordProps>({mode:"onChange",defaultValues:{
    email:location.state?location.state.userEmail : "",
  }});




  // handle confirmed password when password change
  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === "password") trigger("confirmPassword");
    });
    return () => subscription.unsubscribe();
  }, [watch, trigger]);







// reset password

const handleResetPassword  = useCallback( async function(userInfo:ResetPasswordProps){
const toastId = toast.loading("Waiting....")

try {
  const options = {
    method: "POST",
    url:USER_RESET_PASSWORD,
    data:userInfo
  }
  
const {data} = await axios.request(options)


if(data.success){
  toast.success("Password Reset Successfully")
  setHelperText("")
setTimeout(()=>{
  navigate("/login")
},1500)
}



} catch (error) {
  if(isAxiosError(error)){
  toast.error(error.response?.data.message || " Some thing go Wrong !")
  setHelperText(error.response?.data.message || " Some thing go Wrong !")
  }
   
}finally{
  toast.dismiss(toastId)
}




} ,[navigate])



// handle functions for password input

const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  // handle function for confirmed password
const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };



 
  return (
   <>


  <Box overflow={"hidden"} component={"main"}>
{/*  text and form */}
<Grid container spacing={1}  direction="row"
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}>

 <Grid sx={{px:1}} size={{md:5, xs: 12 }}>
    {/*  header */}
<Box component={"header"}>
  <Typography component={"p"}>If you already have an account register</Typography>
  <Typography component={"span"}>You can   <Link style={{color:"red",textDecoration:"none"}} to="/login"> Login here !</Link></Typography>

</Box>

{/* form */}


<Box onSubmit={handleSubmit(handleResetPassword)} style={{width:"100%"}} mt={5} component={"form"}>



 




{/*  input for Email */}

<Box mb={2}>
    <InputLabel htmlFor="email">Email</InputLabel>
   <FormControl fullWidth variant="filled">
        <FilledInput
        {...register("email" , {required:"Email is Required",pattern:EMAIL_VALIDATION}) }
        type="email"
      />
     </FormControl>

{errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}

</Box>



    {/*  input for otp */}

<Box mb={2}>
    <InputLabel htmlFor="component-filled">OTP</InputLabel>
   <FormControl fullWidth variant="filled">
    
        <FilledInput
        
        {...register("seed",{required:"OTP is Required",pattern:{
          value:/^[a-zA-Z0-9]{4}$/,
          message:"Pattern must be 4 character"
        }})}
        id="component-filled" />
     </FormControl>

{errors.seed && <FormHelperText>{errors.seed.message}</FormHelperText>}

</Box>



      
      {/*  password input */}
         <Box mb={2}>
                 <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
        <FormControl fullWidth sx={{ mt: 1}} variant="filled">
          <FilledInput
          {...register("password",{required:"Password is Required",pattern:PASSWORD_VALIDATION})}
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}

         </Box>

    
    {/*  confirmed password input */}
  <Box mb={2}>
   <InputLabel htmlFor="filled-adornment-confirmedpassword">Confirm Password</InputLabel>

    <FormControl fullWidth sx={{ mt: 1}} variant="filled">
          <FilledInput
{...register("confirmPassword" , {required:"Confirmed Password Is Required" , validate:(value)=> value === watch("password") || "Passwords do not match"}) }

            id="filled-adornment-confirmedpassword"
            type={showConfirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showConfirmPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  onMouseUp={handleMouseUpConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        {errors.confirmPassword && <FormHelperText>{errors.confirmPassword.message}</FormHelperText>}

  </Box>




{helperText && <FormHelperText sx={{textAlign:"center"}}>{helperText}</FormHelperText>
}
  <Button fullWidth sx={{display:"block",mx:"auto"}} variant="contained" type="submit" loading ={isSubmitting}>Reset Password</Button>

</Box>





   </Grid>

{/*  imge */}
<Grid size={{md:5}}>
<Avatar variant="square" sx={{width:"100%" , height:"auto",objectFit:"contain"}} alt="bg-img-for-register" src={resetBg}/>
</Grid>
</Grid>



  </Box>

   </>
  )
}
