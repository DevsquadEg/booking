import { Avatar, Box, Grid, IconButton, Paper } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import styles from "./RoomCard.module.css"
import photo1 from "../../../assets/imgs/rooms/room1.jpeg"
import photo2 from "../../../assets/imgs/rooms/room2.jpeg"
import photo3 from "../../../assets/imgs/rooms/room3.jpeg"
import photo4 from "../../../assets/imgs/rooms/room4.jpeg"
import photo5 from "../../../assets/imgs/rooms/room5.jpeg"
import photo6 from "../../../assets/imgs/rooms/room6.jpeg"
import photo7 from "../../../assets/imgs/rooms/room7.jpeg"
import photo8 from "../../../assets/imgs/rooms/room8.jpeg"
import photo9 from "../../../assets/imgs/rooms/room9.png"
import photo10 from "../../../assets/imgs/rooms/room10.png"
import photo11 from "../../../assets/imgs/rooms/room11.png"
import type { RoomExplore } from "@/interfaces/RoomContext.interface";
import { ROOM_DETAILS_PATH } from "@/services/paths";


const imageGallery = [photo11 ,photo10,photo9,photo8,photo7,photo6,photo5,photo4,photo3,photo2,photo1,
photo11 ,photo10,photo9,photo8,photo7,photo6,photo5,photo4,photo3,photo2,photo1,photo11 ,photo10,photo9,photo8,photo7,photo6,photo5,photo4,photo3,photo2,photo1


]


export default function RoomCard({room , index}:{room:RoomExplore , index:number}) {

  return (
    <Grid   className={styles.cardWrapper} size={{xs:12 , sm:4 , md:3 ,}} position={"relative"} sx={{borderRadius:4,overflow:"hidden"}}>
<Box className={styles.cardOverlay} component={"div"} sx={{position:"absolute",top:0,left:0,right:0,bgcolor:"black",zIndex:10,opacity:.3 ,display:"flex" ,justifyContent:"center",alignItems:"center",gap:4}}>
  <IconButton>
  <FavoriteIcon sx={{color:"white" , fontSize:40}}/>
  </IconButton>

<Link to={`${ROOM_DETAILS_PATH}/${room._id}`}>
 <VisibilityIcon sx={{color:"white" , fontSize:40}}/>
  </Link>
</Box>


<Box className="discountBadge" sx={{zIndex:1000 , width:"50%",height:60 ,borderRadius:"0px 0px 0px 20px"}} component={"div"} position={"absolute"} top={0} right={0} bgcolor={"#ff498b"} color={"white"} py={2} display={"flex"} justifyContent={"center"} alignItems={"center"}>
  {`${index + 130}$ Per Night`}
</Box>



    <Paper elevation={1}>
    <Avatar src={room.images[0] || imageGallery[index]} sx={{width:"100%",objectFit:"cover" , height:300}} variant="square"  />
    
    </Paper>
    </Grid>
  );
}
