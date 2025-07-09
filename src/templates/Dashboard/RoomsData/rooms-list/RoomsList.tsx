import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { ADMIN_URLS } from "../../../../services/apiEndpoints";
import { axiosInstance } from "../../../../services/axiosInstance";
import * as React from "react";
import Swal from "sweetalert2";
import type { IroomList } from "@/interfaces/interfaces";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ActionBtn from "./ActionBtn";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import toast from "react-hot-toast";


export default function RoomsList() {

  const [roomsList, setRoomsList] = useState<IroomList[]>([]);
  const [viewList, setViewList] = useState<IroomList | null>(null);
    const navigate = useNavigate();


  // =============== sweetalert2 ==========================

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "mui-confirm-btn",
      cancelButton: "mui-cancel-btn",
    },
    buttonsStyling: false,
  });

  {
    /* =============== DIALOG  ========================== */
  }
  const [openDialog, setOpen] = React.useState(false);

  const handleClickOpenDialog = async (id: number) => {
    await showRoomDetails(id);
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
  };

  // =============== Show dialog Details ==========================
  const showRoomDetails = async (_id: number) => {
    try {
      const response = await axiosInstance.get(ADMIN_URLS.ROOM.GET_ROOM(_id));
      console.log(response.data.data.room);
      setViewList(response.data.data.room);
    } catch (error) {
      console.log(error);
    }
  };

  // =============== Delete room id ==========================
  const deleteRoomId = async (id: number) => {
    try {
      const response = await axiosInstance.delete(
        ADMIN_URLS.ROOM.DELETE_ROOM(id)
      );
      console.log(response.data);
      toast.success(" Room Deleted successfully")
      // Optionally, you can refetch the rooms list after deletion
      fetchRoomsList();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error("Error deleting room:", error);

    }
  };

  useEffect(() => {
    fetchRoomsList();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#F8F9FB",
          marginTop: "10px",
          paddingY: "10px",
        }}
      >
        <Box>
          <Typography variant="h5"> Rooms Table Details </Typography>
          <Typography variant="subtitle1">
            {" "}
            You can check all details{" "}
          </Typography>
        </Box>
         <Button
  component={RouterLink}
  to="/dashboard/room/add"
  sx={{
    padding: '10px 40px',
    marginRight: '30px',
    bgcolor: '#203FC7',
    textTransform: 'none',
    '&:hover': {
      bgcolor: '#1a34a1', // Optional: hover color
    },
  }}
  variant="contained"
>
  Add New Room
</Button>
      </Box>

      {/* =============== Search ========================== */}

      <FormControl
        sx={{ minWidth: 200, marginBottom: "70px" }}
        variant="standard"
      >
        <InputLabel htmlFor="my-input">Email address</InputLabel>
        <Input id="my-input" aria-describedby="my-helper-text" />
      </FormControl>

      {/* =============== table ========================== */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>A basic table example with a caption</caption>
          <TableHead sx={{ backgroundColor: "#E2E5EB" }}>
            <TableRow>
              <TableCell>Room Number</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>createdAt</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roomsList.map((room: IroomList) => (
              <TableRow key={room?.roomNumber}>
                <TableCell component="th" scope="row">
                  {room?.roomNumber}
                </TableCell>
                <TableCell>
                  {room?.images === null ? (
                    <img
                      className="imgTable"
                      src={`/profile.jpeg`}
                      alt="errorImageRoom"
                    />
                  ) : (
                    <img
                      className="imgTable"
                      src={`${room?.images[0]}`}
                      alt="currImageRoom"
                    />
                  )}
                </TableCell>
                <TableCell>{room?.price}</TableCell>
                <TableCell>{room?.discount}</TableCell>
                <TableCell>{room?.capacity}</TableCell>
                <TableCell>
                  {new Date(room?.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <ActionBtn
                    onView={() => handleClickOpenDialog(room._id)}
                    onEdit={() => navigate(`/dashboard/room/edit/${room._id}`)}
                    onDelete={() =>
                      swalWithBootstrapButtons
                        .fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes, delete it!",
                          cancelButtonText: "No, cancel!",
                          reverseButtons: true,
                        })
                        .then((result) => {
                          if (result.isConfirmed) {
                            if (result.isConfirmed) {
                              deleteRoomId(room._id);
                            }
                            swalWithBootstrapButtons.fire({
                              title: "Deleted!",
                              text: "Your Room has been deleted.",
                              icon: "success",
                            });
                          } else if (
                            result.dismiss === Swal.DismissReason.cancel
                          ) {
                            swalWithBootstrapButtons.fire({
                              title: "Cancelled",
                              text: "Your Room data is safe :)",
                              icon: "error",
                            });
                          }
                        })
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <React.Fragment>
        <Dialog
  open={openDialog}
  onClose={handleCloseDialog}
  fullWidth
  maxWidth="xs"
  PaperProps={{
    sx: {
      borderRadius: 3,
      p: 3,
      boxShadow: 8,
    },
  }}
>
  <DialogTitle sx={{ fontWeight: 'bold', fontSize: 20, pb: 1 }}>
    Room Table Details
  </DialogTitle>

  <DialogContent dividers>
    <Stack spacing={2} alignItems="center">
      <Typography variant="h6" color="text.secondary">
        {viewList?.roomNumber}
      </Typography>

      <Box
        component="img"
        src={
          viewList?.images === null
            ? "/profile.jpeg"
            : viewList?.images[0]
        }
        alt="Room"
        sx={{
          width: 100,
          height: 100,
          objectFit: 'cover',
          borderRadius: 2,
          border: '1px solid #ccc',
        }}
      />

      <Divider sx={{ width: '100%' }} />

      <Typography variant="body1">💰 Price: {viewList?.price}</Typography>
      <Typography variant="body1">🎁 Discount: {viewList?.discount}</Typography>
      <Typography variant="body1">👥 Capacity: {viewList?.capacity}</Typography>
      <Typography variant="body2" color="text.secondary">
        Created At: {viewList?.createdAt}
      </Typography>
    </Stack>
  </DialogContent>

  <DialogActions sx={{ justifyContent: 'center' }}>
    <Button onClick={handleCloseDialog} variant="text">
      Close
    </Button>
  </DialogActions>
</Dialog>

      </React.Fragment>
    </>
  );
}
