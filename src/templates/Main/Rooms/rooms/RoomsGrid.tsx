import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import useExploreRooms from "@/hooks/useExploreRoom.hook";
import Loading from "@/components/common/Loading/Loading";
import type { RoomExplore } from "@/interfaces/RoomContext.interface";
import RoomCard from "@/components/common/RoomCard/RoomCard";







export default function RoomsGrid() {
const {getAllExploreRooms ,  exploreRoomsList} = useExploreRooms()



  const breadcrumbs = [
    <Link key={"1"}  color="inherit" to="/" style={{textDecoration:"none"}}>
      HOME
    </Link>,
   
    <Typography key="3" sx={{ color: 'text.primary' }}>
      EXPLORE
    </Typography>,
  ];







useEffect(()=>{
getAllExploreRooms()

},[getAllExploreRooms])


if(!exploreRoomsList) return <Loading/>


  return (
    <Box component={"section"}>
    <Typography component={"h2"} textAlign={"center"} variant="h4" mb={2}>Explore ALL Rooms </Typography>

{/* bread crumb */}
   <Stack spacing={2} mb={3}>
      <Breadcrumbs separator="/" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>



 <Grid container spacing={3} justifyContent={"center"} px={4}>
  {exploreRoomsList.length === 0 ?<Typography component={"p"} textAlign={"center"}> No Rooms Available</Typography>:exploreRoomsList.map((room:RoomExplore , index:number)=><RoomCard key={room._id} room={room} index={index}/>
)}
   </Grid>

    </Box>

    
  
  
  )
}
