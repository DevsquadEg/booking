import { isAxiosError } from "axios";
import { ADMIN_URLS } from "../../../../services/apiEndpoints";
import { axiosInstance } from "../../../../services/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  // Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import type { Facility } from "@/interfaces/interfaces";

export default function FacilitiesList() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [facilitiesCount, setFacilitiesCount] = useState(0);

  //============  get all projects ==============
  const getAllFacilities = useCallback(
    async (pageSizeValue = pageSize, page = pageNumber) => {
      // setLoading(true);
      try {
        const response = await axiosInstance.get(
          ADMIN_URLS.ROOM.GET_ROOM_FACILITIES,
          {
            params: {
              size: pageSizeValue,
              page: page,
            },
          }
        );
        console.log(response);
        setFacilities(response.data.data.facilities);
        setFacilitiesCount(response.data.data.totalCount);
        // setTotalNumberOfRecords(response.data.totalNumberOfRecords);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error);
          toast.error(error?.response?.data.message || "Something went wrong!");
        }
      } finally {
        setLoading(false);
      }
    },
    [pageNumber, pageSize]
  );

  useEffect(() => {
    setLoading(true);
    getAllFacilities();
  }, [pageNumber, pageSize]);

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden", mt: "1rem" }}>
        {(loading &&
          [...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              sx={{ padding: "1rem", mx: "0.5rem" }}
              height={40}
            />
          ))) ||
          (facilities.length === 0 && (
            <Typography
              sx={{
                padding: "1rem",
                fontSize: "30px",
                color: "text.primary",
                textAlign: "center",
              }}
            >
              No Facilities Found
            </Typography>
          )) || (
            <>
              <TableContainer sx={{ maxHeight: 800 }}>
                <Table stickyHeader aria-label="facilities table">
                  <TableHead>
                    <TableRow>
                      {[
                        { id: "name", label: "Facility Name", minWidth: 100 },
                        { id: "createdBy", label: "Created By", minWidth: 100 },
                        { id: "createdAt", label: "Created At", minWidth: 100 },
                        { id: "updatedAt", label: "Updated At", minWidth: 100 },
                      ].map((column) => (
                        <TableCell key={column.id} align="center">
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {facilities.map((facility, index) => (
                      <TableRow
                        key={facility._id}
                        hover
                        sx={{
                          backgroundColor:
                            index % 2 === 0 ? "#F8F9FB" : "#ffffff",
                        }}
                      >
                        <TableCell align="center">{facility.name}</TableCell>
                        <TableCell align="center">
                          {facility.createdBy?.userName || "N/A"}
                        </TableCell>
                        <TableCell align="center">
                          {new Date(facility.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="center">
                          {new Date(facility.updatedAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={facilitiesCount}
                rowsPerPage={pageSize}
                page={pageNumber}
                onPageChange={(e, newPage) => setPageNumber(newPage + 1)}
                onRowsPerPageChange={(e) => {
                  setPageSize(parseInt(e.target.value, 10));
                  setPageNumber(1);
                }}
              />
            </>
          )}
      </Paper>
    </>
  );
}
