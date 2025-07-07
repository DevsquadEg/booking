import { Box, Button, FormControl,  IconButton,  Input, InputLabel, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { ADMIN_URLS } from "../../../../services/apiEndpoints";
import { axiosInstance } from "../../../../services/axiosInstance";
import * as React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import type { IroomList } from "@/interfaces/interfaces";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


export default function RoomsList() {

 
    const [roomsList, setRoomsList] = useState<IroomList[]>([]);
      const [showView, setShowView] = useState(false);


         {/* =============== DIALOG  ========================== */}
   const [openDialog, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpenDialog = (id:number) => {
    setOpen(true);
    
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
    

    // =============== fetch rooms list ==========================
    const fetchRoomsList = async () => {
      try {
        const response = await axiosInstance.get(ADMIN_URLS.ROOM.GET_ALL_ROOMS);
        console.log(response.data.data.rooms);
        
          setRoomsList(response.data.data.rooms);
        
        
      } catch (error) {
        console.error("Error fetching rooms list:", error);
      }

    }



    // =============== Show dialog Details ==========================
    const showRoomDetails = async(_id:number) => {
          console.log(_id);
          
      try {
           const response  = await axiosInstance.get(ADMIN_URLS.ROOM.GET_ROOM(_id));
          console.log(response.data.data);
          setShowView(response.data.data);
          
      } catch (error) {
        console.log(error);
        
        
      }
       
         



    }


    useEffect(() => {
      fetchRoomsList();
    
      
    }, [])


          {/* =============== drop menu actions ========================== */}

     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

   
        



  return (
    <>

    <Box sx={{ display: "flex", justifyContent: "space-between" , alignItems: "center" , bgcolor:"#F8F9FB",marginTop:"10px", paddingY:"10px" }}>
      <Box>
    <Typography variant="h5">  Rooms Table Details  </Typography>
    <Typography variant="subtitle1" >  You can check all details </Typography>
    </Box>
     <Button sx={{padding: "10px 40px", marginRight:"30px", bgcolor:"#203FC7", textTransform: 'none'}} variant="contained">Add New Room</Button>
    </Box>


      {/* =============== Search ========================== */}

    <FormControl   sx={{ minWidth: 200, marginBottom: "70px" }} variant="standard">
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" />
</FormControl>

      {/* =============== table ========================== */}

 <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>A basic table example with a caption</caption>
        <TableHead sx={{ backgroundColor: '#E2E5EB' }}>
          <TableRow>
            <TableCell>Room Number</TableCell>
            <TableCell  >Image</TableCell>
            <TableCell  >Price</TableCell>
            <TableCell  >Discount</TableCell>
            <TableCell  >Capacity</TableCell>
            <TableCell  >createdAt</TableCell>
            <TableCell  >Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {roomsList.map((room:IroomList) => (
            <TableRow key={room?.roomNumber}>
              <TableCell component="th" scope="row">
                {room?.roomNumber}
              </TableCell>
              <TableCell  >{room?.length ===null ?(<img
                          className="  imgTable "
                          src={`/profile.jpeg`}
                          alt="imageRoom"
              
                        />) : (
                <img className="imgTable" src={`${room?.images[0]}`} alt="imageRoom" />
                        )}</TableCell>
              <TableCell  >{room?.price}</TableCell>
              <TableCell  >{room?.discount}</TableCell>
              <TableCell  >{room?.capacity}</TableCell>
              <TableCell  ><button onClick={()=>showRoomDetails(room?._id)}></button></TableCell>
              <TableCell  >{new Date(room?.createdAt).toLocaleDateString()}</TableCell>
              <TableCell  >  <Box>
      <IconButton
        aria-label="more"
        aria-controls={open ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3,
            minWidth: 160,
            maxHeight: 'none', // removes scroll bar
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem >
          <ListItemIcon>
            <VisibilityOutlinedIcon fontSize="small" color="primary"  />
          </ListItemIcon>
          <ListItemText primary="View" onClick={()=>showRoomDetails(room?._id)}/>
        </MenuItem>
        <MenuItem onClick={()=>showRoomDetails(room?._id)}>
          <ListItemIcon>
            <EditOutlinedIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={()=>showRoomDetails(room?._id)}>
          <ListItemIcon>
            <DeleteOutlineOutlinedIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
    </Box>

       
                
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <React.Fragment>
      
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Room Table Details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Close
          </Button>
          
        </DialogActions>
      </Dialog>
    </React.Fragment>





    
    
</>
  );
}
