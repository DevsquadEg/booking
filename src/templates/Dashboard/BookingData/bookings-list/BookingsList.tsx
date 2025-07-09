import { useCallback, useEffect, useState, type MouseEvent } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ADMIN_URLS } from "@/services/apiEndpoints";
import { axiosInstance } from "@/services/axiosInstance";
import type { BookingsType } from "@/services/types";
import { Chip, Skeleton, Typography } from "@mui/material";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import SectionTitle from "@/components/dashboard/sectionTitle/SectionTitle";
import ViewBtn from "@/components/dashboard/actionsBtn/viewBtn/ViewBtn";
import { useNavigate } from "react-router-dom";
import { BOOKING_DATA_PATH } from "@/services/paths";

export default function BookingsList() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allBookings, setAllBookings] = useState<BookingsType[]>([]);
  const [allBookingsCount, setAllBookingsCount] = useState<number>(0);
  const [loading, setloading] = useState(false);

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  const navigate = useNavigate();
  const handleView = (booking: BookingsType) => {
    navigate(`${BOOKING_DATA_PATH}/${booking._id}`, { state: booking });
  };

  const featchAllBookings = useCallback(async () => {
    setloading(true);
    try {
      const response = await axiosInstance.get(
        ADMIN_URLS.BOOKING.GET_ALL_BOOKINGS +
          `?page=${page + 1}&size=${rowsPerPage}`
      );
      setAllBookings(response.data.data.booking);
      setAllBookingsCount(response.data.data.totalCount);
      // console.log(response);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
      // console.log(error);
    } finally {
      setloading(false);
    }
  }, [page, rowsPerPage]);

  const handleChangePage = (event: MouseEvent | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    featchAllBookings();
  }, [featchAllBookings]);

  return (
    <>
      <SectionTitle title="Bookings Table Details" />
      <Paper sx={{ width: "100%", overflow: "hidden", mt: "1rem" }}>
        {(loading &&
          // make 6 skeleton rows
          [...Array(6)].map(() => (
            <Skeleton
              sx={{ padding: "1rem", mx: "0.5rem" }}
              height={40}
            ></Skeleton>
          ))) ||
          (allBookings.length === 0 && (
            <Typography
              sx={{
                padding: "1rem",
                fontSize: "50px",
                color: "text.primary",
                textAlign: "center",
              }}
            >
              No Bookings Found
            </Typography>
          )) || (
            <>
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {[
                        { id: "startDate", label: "Start Date", minWidth: 70 },
                        {
                          id: "endDate",
                          label: "End Date",
                          minWidth: 70,
                        },
                        { id: "room", label: "Room Number", minWidth: 70 },
                        { id: "status", label: "Stauts", minWidth: 70 },
                        { id: "price", label: "Price ($.)", minWidth: 70 },
                        { id: "actions", label: "Actions", minWidth: 70 },
                      ].map((column) => (
                        <TableCell key={column.id} align={"center"}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allBookings?.map((booking) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={booking._id}
                        >
                          {[
                            "startDate",
                            "endDate",
                            "room",
                            "status",
                            "totalPrice",
                            "actions",
                          ].map((info, index) => {
                            const value =
                              booking[info as keyof BookingsType]?.toString();
                            return (
                              <TableCell
                                key={info + index}
                                align={"center"}
                                sx={{ position: "relative" }}
                              >
                                {["startDate", "endDate"].includes(info) ? (
                                  new Date(value as string).toLocaleString(
                                    "en-US",
                                    dateOptions
                                  )
                                ) : info === "actions" ? (
                                  <ViewBtn
                                    handleOnClick={() => {
                                      handleView(booking);
                                    }}
                                  />
                                ) : info === "status" ? (
                                  <Chip
                                    label={value}
                                    color={
                                      value === "pending"
                                        ? "warning"
                                        : "success"
                                    }
                                  />
                                ) : info === "room" ? (
                                  <Chip
                                    label={
                                      booking[info]?.roomNumber || "not set"
                                    }
                                    color="info"
                                  />
                                ) : (
                                  value
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={allBookingsCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          )}
      </Paper>
    </>
  );
}
