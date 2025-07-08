import { isAxiosError } from "axios";
import { ADMIN_URLS } from "../../../../services/apiEndpoints";
import { axiosInstance } from "../../../../services/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Facility } from "@/interfaces/interfaces";

export default function FacilitiesList() {
  const [facilities, setFacilities] = useState<Facility>([]);
  const [pageSize, setPageSize] = useState(200);
  const [pageNumber, setPageNumber] = useState(1);

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
        // setTotalPages(response.data.totalNumberOfPages);
        // setTotalNumberOfRecords(response.data.totalNumberOfRecords);
      } catch (error) {
        if (isAxiosError(error)) {
          console.log(error);
          toast.error(error?.response?.data.message || "Something went wrong!");
        }
      } finally {
        // setLoading(false);
      }
    },
    [pageNumber, pageSize]
  );

  useEffect(() => {
    getAllFacilities();
  }, []);

  return (
    <>
      <Box pt={3}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: "#E2E5EB" }}>
              <TableRow>
                {/* <TableCell>#</TableCell> */}
                <TableCell>Facility Name</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facilities.map((facility, index) => (
                <TableRow
                  key={facility._id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#F8F9FB" : "#ffffff",
                  }}
                >
                  {/* <TableCell>{index + 1}</TableCell> */}
                  <TableCell>{facility.name}</TableCell>
                  <TableCell>{facility.createdBy?.userName}</TableCell>
                  <TableCell>
                    {new Date(facility.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(facility.updatedAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
