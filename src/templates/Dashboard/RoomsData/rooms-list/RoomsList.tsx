import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { ADMIN_URLS } from "../../../../services/apiEndpoints";
import { axiosInstance } from "../../../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import ActionBtn from "@/components/common/ActionBtn/ActionBtn";
import type { IroomList } from "@/interfaces/interfaces";
import type { MouseEvent } from "react";
import { isAxiosError } from "axios";

export default function RoomsList() {
  const [roomsList, setRoomsList] = useState<IroomList[]>([]);
  const [viewList, setViewList] = useState<IroomList | null>(null);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpen] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRooms, setFilteredRooms] = useState<IroomList[]>([]);

  const navigate = useNavigate();

  {
    /* =================== sweetaler2  ===================== */
  }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "mui-confirm-btn",
      cancelButton: "mui-cancel-btn",
    },
    buttonsStyling: false,
  });

  {
    /* =================== show room data list   ===================== */
  }

  const fetchRoomsList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${ADMIN_URLS.ROOM.GET_ALL_ROOMS}?page=${page + 1}&size=${rowsPerPage}`
      );
      console.log(response.data.data.rooms);

      setRoomsList(response.data.data.rooms);
      setTotalCount(response.data.data.totalCount);
    } catch (error) {
      console.error("Error fetching rooms list:", error);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage]);

  // =================== delete room action  =====================
  const deleteRoomId = async (id: string) => {
    try {
      await axiosInstance.delete(ADMIN_URLS.ROOM.DELETE_ROOM(id));
      toast.success("Room Deleted successfully");
      fetchRoomsList(); // Refresh list after deletion
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong!");
        // console.error("Error deleting room:", error);
      }
    }
  };
  {
    /* =================== show room action  ===================== */
  }

  const showRoomDetails = async (_id: string) => {
    try {
      const response = await axiosInstance.get(ADMIN_URLS.ROOM.GET_ROOM(_id));
      setViewList(response.data.data.room);
    } catch (error) {
      console.log(error);
    }
  };

  {
    /* =================== dialog logic ( view function)  ===================== */
  }

  const handleClickOpenDialog = async (id: string) => {
    await showRoomDetails(id);
    setOpen(true);
  };

  const handleCloseDialog = () => setOpen(false);

  const handleChangePage = (_event: MouseEvent | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  {
    /* =================== use effrect   ===================== */
  }

  useEffect(() => {
    fetchRoomsList();
  }, [fetchRoomsList]);

  useEffect(() => {
    // Filter whenever roomsList or searchQuery changes
    if (searchQuery.trim() === "") {
      setFilteredRooms(roomsList);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = roomsList.filter((room) =>
        room.roomNumber.toString().toLowerCase().includes(lowerQuery)
      );
      setFilteredRooms(filtered);
    }
  }, [roomsList, searchQuery]);

  return (
    <>
      {/* =================== rooms Header  ===================== */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Box>
          <Typography variant="h5">Rooms Table Details</Typography>
          <Typography variant="subtitle1">You can check all details</Typography>
        </Box>

        <Button
          component={RouterLink}
          to="/dashboard/room/add"
          sx={{
            marginRight: "40px",
            padding: "10px 40px",
            bgcolor: "#203FC7",
            textTransform: "none",
            "&:hover": {
              bgcolor: "#1a34a1",
            },
          }}
          variant="contained"
        >
          Add New Room
        </Button>
      </Box>

      <Paper sx={{ width: "100%", overflow: "hidden", mt: "1rem" }}>
        {loading ? (
          [...Array(10)].map((_, idx) => (
            <Skeleton
              key={idx}
              sx={{ padding: "1rem", mx: "0.5rem" }}
              height={40}
            />
          ))
        ) : roomsList.length === 0 ? (
          <Typography
            sx={{
              padding: "1rem",
              fontSize: "32px",
              color: "text.primary",
              textAlign: "center",
            }}
          >
            No Rooms Found
          </Typography>
        ) : (
          <>
            {/* =================== search  ===================== */}
            <Autocomplete
              freeSolo
              options={roomsList.map((room) => room.roomNumber.toString())}
              onInputChange={(_event, value) => setSearchQuery(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Room Number"
                  variant="outlined"
                  size="small"
                  sx={{
                    marginBlock: "10px",
                    borderRadius: "10px",
                    width: 300,
                    mb: 2,
                    ml: "auto",
                    mr: "30px",
                  }}
                />
              )}
            />
            {/* =================== table container  ===================== */}

            <TableContainer sx={{ maxHeight: 700 }}>
              <Table stickyHeader aria-label="rooms table">
                <TableHead>
                  <TableRow>
                    {[
                      "Room Number",
                      "User Name",
                      "Image",
                      "Price",
                      "Discount",
                      "Capacity",
                      "Created At",
                      "Actions",
                    ].map((label) => (
                      <TableCell key={label} align="center">
                        {label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRooms.length > 0 ? (
                    filteredRooms.map((room) => (
                      <TableRow hover key={room._id}>
                        {/* =================== Room number  ===================== */}
                        <TableCell align="center">{room.roomNumber}</TableCell>

                        {/* =================== user name   ===================== */}
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                          {room?.createdBy?.userName}
                        </TableCell>

                        {/* =================== image  ===================== */}
                        <TableCell align="center">
                          <Box
                            component="img"
                            src={room?.images?.[0] ?? "/noRoom.jpeg"}
                            alt="Room"
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: 1,
                              objectFit: "cover",
                              border: "1px solid #ccc",
                            }}
                          />
                        </TableCell>

                        {/* =================== price  ===================== */}
                        <TableCell align="center">${room.price}</TableCell>

                        {/* =================== discount  ===================== */}
                        <TableCell align="center">
                          <Chip
                            label={`${room.discount}%`}
                            color={room.discount > 0 ? "success" : "default"}
                          />
                        </TableCell>

                        {/* =================== capacity  ===================== */}
                        <TableCell align="center">
                          <Chip label={room.capacity} color="info" />
                        </TableCell>

                        {/* =================== creation date  ===================== */}
                        <TableCell align="center">
                          {new Date(room.createdAt).toLocaleDateString()}
                        </TableCell>

                        {/* =================== actions  ===================== */}
                        <TableCell align="center">
                          <ActionBtn
                            onView={() => handleClickOpenDialog(room._id)}
                            onEdit={() =>
                              navigate(`/dashboard/room/edit/${room._id}`, {
                                state: { room },
                              })
                            }
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
                                    deleteRoomId(room._id);
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} align="center">
                        <Typography variant="body1" color="text.secondary">
                          🔍 No rooms found matching your search.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>

      {/* View Dialog */}
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
        <DialogTitle sx={{ fontWeight: "bold", fontSize: 20, pb: 1 }}>
          Room Details
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h6" color="text.secondary">
              ( {viewList?.roomNumber} )
            </Typography>
            <Typography
              sx={{ fontWeight: "bold" }}
              variant="h6"
              color="primary"
            >
              {viewList?.createdBy?.userName}
            </Typography>

            <Box
              component="img"
              src={viewList?.images?.[0] ?? "/noRoom.jpeg"}
              alt="Room"
              sx={{
                width: 100,
                height: 100,
                objectFit: "cover",
                borderRadius: 2,
                border: "1px solid #ccc",
              }}
            />

            <Typography variant="body1">💰 Price: {viewList?.price}</Typography>
            <Typography variant="body1">
              🎁 Discount: {viewList?.discount}
            </Typography>
            <Typography variant="body1">
              👥 Capacity: {viewList?.capacity}
            </Typography>
            {Array.isArray(viewList?.facilities) &&
              viewList.facilities.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    justifyContent: "center",
                  }}
                >
                  {viewList.facilities.map((facility) => (
                    <Chip
                      key={facility._id}
                      label={facility.name}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              )}
            <Typography variant="body2" color="text.secondary">
              Created At:{" "}
              {viewList?.createdAt &&
                new Date(viewList.createdAt).toLocaleDateString()}
            </Typography>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            className="mui-cancel-btn"
            onClick={handleCloseDialog}
            variant="outlined"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
