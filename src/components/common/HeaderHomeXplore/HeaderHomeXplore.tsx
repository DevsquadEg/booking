import { Box, Button, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Add from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import photo from "../../../assets/imgs/explor.jpg"
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { DateRange } from "@mui/x-date-pickers-pro/models";
import useExploreRooms from "@/hooks/useExploreRoom.hook";
import { ROOMS_GRID_PATH } from "@/services/paths";
export default function HeaderHomeXplore() {
  const [value, setValue] = useState<DateRange<Dayjs>>([null , null]);
   const [capacityValue , setCapacityValue] = useState(1)
   const[isLoading , setIsLoading] = useState(false)
   const navigate = useNavigate()
const{setCapacity ,setStartDate,setEndDate ,exploreErrorMessage} = useExploreRooms()




// set no of persone
const handleSetCapacity = useCallback(function(){
  setCapacity(capacityValue)
},[setCapacity,capacityValue])




// set start and end date
const handleStartAndEndDate = useCallback(function(){
if(!!value[0] === false || !!value[1] === false) return;

const sDate = value[0].format("YYYY-MM-DD")
setStartDate(sDate)
const eDate = value[1].format("YYYY-MM-DD")
setEndDate(eDate)

},[value ,setEndDate,setStartDate])



const handleExploreBtnAction = useCallback(function(){
  const toastId = toast.loading("Waiting....")
  setIsLoading(true)
  handleSetCapacity()
  handleStartAndEndDate()

 setTimeout(()=>{
    toast.dismiss(toastId)
    setIsLoading(false)
    navigate(ROOMS_GRID_PATH)
  },1500)

},[handleSetCapacity,navigate ,handleStartAndEndDate])


  return (
    <Grid container spacing={2} justifyContent={"space-between"} alignItems={"center"}>
        {/* left box */}
<Grid size={{xs:12 , md:5}}>
    {/* text */}
<Box component={"header"}>
    <Typography component={"p"} color="#152C5B" fontWeight={800} variant="h3">Forget Busy Work,</Typography>
    <Typography component={"p"} color="#152C5B" fontWeight={800} variant="h3">Start Next Vacation</Typography>
    <Typography component={"p"} color="#B0B0B0">We provide what you need to enjoy your holiday with family. Time to make another memorable moments.</Typography>
</Box>

{/* get explore data  capacity and date */}
<Typography component={"h2"} variant="h5" fontWeight={500} mt={5}> Start Booking</Typography>
  
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateRangePicker']}>
       
          <DateRangePicker
        
          format="YYYY-MM-DD"
            value={value}
            minDate={dayjs()}
            onChange={(newValue) => setValue(newValue)}
          />
      </DemoContainer>
    </LocalizationProvider>

  {exploreErrorMessage && <FormHelperText sx={{textAlign:"center" , fontWeight:600}}>{exploreErrorMessage}</FormHelperText>}








{/* capacity input */}

<Typography component={"p"} variant="h5" mt={4}> No Of Persone</Typography>
<Box component={"footer"} display={"flex"} gap={1} mt={1}>
<Button variant="contained"  onClick={()=>{setCapacityValue((current)=>current -1)}} disabled={capacityValue === 1} color="warning" startIcon={<RemoveIcon/>}></Button>
    <TextField
      sx={{
    '& .MuiInputBase-input': {
      textAlign: 'center', // Center the input text
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc', // default border
      },
      '&:hover fieldset': {
        borderColor: '#1976d2', // your custom hover color
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1976d2', // focused state border color
      },
    },
  }}
    
    
     fullWidth value={capacityValue}></TextField>
<Button variant="contained" onClick={()=> setCapacityValue((current)=> current + 1)} startIcon={<Add />}></Button>

</Box>
<Button variant="contained" loading={isLoading} onClick={handleExploreBtnAction} fullWidth sx={{mt:4}}>Explore</Button>
</Grid>

{/* right box */}
<Grid size={{xs:12 , md:5}}>
<Box component={"img"} src={photo} width={"100%"}></Box>


</Grid>
    </Grid>
  )
}
