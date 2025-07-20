import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import {AddressElement, CardElement} from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from "react-router-dom";
import { useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useCallback } from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { PAYMENT } from "@/services/apiEndpoints";
import { axiosInstance } from "@/services/axiosInstance";













export default function CheckOut() {
const {state:{bookingId}} = useLocation()
  const stripe = useStripe();
  const elements = useElements();
const navigate = useNavigate()

const handleCheckOut = useCallback( async function(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault()
   const toastId = toast.loading("Waitng ....")
 if(! stripe || !elements) return;
try {
    
 const cardElement =   elements.getElement("card")
    if(! cardElement) return 
 const {token} =  await stripe.createToken(cardElement)

   
const options = {
    url:PAYMENT(bookingId),
    method:"POST",
    data:{
        token:token?.id,
    }
}

  const {data} = await axiosInstance.request( options)
  if(data.success){
  toast.success(data.message || "Payment Done Successfully")
 setTimeout(()=>{
    navigate("/success-payment")
 },2000)
  }
} catch (error) {
    if(isAxiosError(error))
        toast.error(error.response?.data.message || "Some thing go wrong")
}finally{
    toast.dismiss(toastId)

}







},[elements , stripe,bookingId,navigate])



 



  return (
<Grid container justifyContent={"center"} p={5}>
    <Grid size={{xs:12 , md:6}}>
   <Paper sx={{p:5}}>
            <Box component={"form"} onSubmit={handleCheckOut}>
      <Typography color="#ebebec" variant="h4" textAlign={"center"} mb={3} component={"h2"}>Payment Details</Typography>

    <Box mb={4}>
<CardElement/>
    </Box>

     <Box>
         <AddressElement
        options={{mode:"billing"}}
      />
     </Box>

      <Button type="submit" fullWidth variant="contained" sx={{mt:"15px"}}> Pay Now</Button>
   </Box>
   </Paper>
    </Grid>
  
</Grid>
  )
}
