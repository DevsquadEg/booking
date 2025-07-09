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
import type { UserType } from "@/services/types";
import { Avatar, Skeleton, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { isAxiosError } from "axios";
import SectionTitle from "@/components/dashboard/sectionTitle/SectionTitle";
import ViewBtn from "@/components/dashboard/actionsBtn/viewBtn/ViewBtn";
import { USER_DATA_PATH } from "@/services/paths";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [allUsersCount, setAllUsersCount] = useState<number>(0);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const featchAllUsers = useCallback(async () => {
    setloading(true);
    try {
      const response = await axiosInstance.get(
        ADMIN_URLS.USER.GET_ALL_USERS + `?page=${page + 1}&size=${rowsPerPage}`
      );
      setAllUsers(response.data.data.users);
      setAllUsersCount(response.data.data.totalCount);
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

  const handleOnView = (user: UserType) => {
    console.log("user", user);
    navigate(`${USER_DATA_PATH}/${user._id}`, { state: { user } });
  };

  useEffect(() => {
    featchAllUsers();
  }, [featchAllUsers]);

  return (
    <>
      <SectionTitle title="Users Table Details" />
      <Paper sx={{ width: "100%", overflow: "hidden", mt: "1rem" }}>
        {(loading &&
          // make 6 skeleton rows
          [...Array(6)].map(() => (
            <Skeleton
              sx={{ padding: "1rem", mx: "0.5rem" }}
              height={40}
            ></Skeleton>
          ))) ||
          (allUsers.length === 0 && (
            <Typography
              sx={{
                padding: "1rem",
                fontSize: "50px",
                color: "text.primary",
                textAlign: "center",
              }}
            >
              No Users Found
            </Typography>
          )) || (
            <>
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {[
                        { id: "name", label: "Name", minWidth: 170 },
                        {
                          id: "profileImage",
                          label: "Profile Image",
                          minWidth: 70,
                        },
                        { id: "email", label: "Email", minWidth: 170 },
                        { id: "acitons", label: "Actions", minWidth: 100 },
                      ].map((column) => (
                        <TableCell key={column.id} align={"center"}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {allUsers?.map((user) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={user._id}
                        >
                          {["userName", "profileImage", "email", "action"].map(
                            (info, index) => {
                              const value =
                                user[info as keyof UserType]?.toString();
                              return (
                                <TableCell key={info + index} align={"center"}>
                                  {info === "profileImage" ? (
                                    <Avatar
                                      sx={{
                                        width: "5rem",
                                        height: "5rem",
                                        mx: "auto",
                                      }}
                                      src={value}
                                    />
                                  ) : info === "action" ? (
                                    <>
                                      <ViewBtn
                                        handleOnClick={() => {
                                          handleOnView(user);
                                        }}
                                      />
                                    </>
                                  ) : (
                                    value
                                  )}
                                </TableCell>
                              );
                            }
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={allUsersCount}
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
