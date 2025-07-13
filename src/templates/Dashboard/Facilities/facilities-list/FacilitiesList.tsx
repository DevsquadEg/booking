import { isAxiosError } from "axios";
import { ADMIN_URLS } from "../../../../services/apiEndpoints";
import { axiosInstance } from "../../../../services/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  IconButton,
  Menu,
  MenuItem,
  // Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import type { Facility } from "@/interfaces/interfaces";
import { Delete, MoreHoriz } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import ActionBtn from "@/components/common/ActionBtn/ActionBtn";
import Swal from "sweetalert2";

export default function FacilitiesList() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [pageSize, setPageSize] = useState(15);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [facilitiesCount, setFacilitiesCount] = useState(0);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedRowId(id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRowId(null);
  };

  //============  get all facilities ==============
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

  //==================  delete facility ====================
  const deleteFacility = async (id: string) => {
    if (!id) return;
    try {
      await axiosInstance.delete(ADMIN_URLS.ROOM.DELETE_ROOM_FACILITY(id));
      toast.success("Facility Deleted successfully");
      getAllFacilities(); // Refresh the list after deletion
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong!");
      console.error("Error deleting facility:", error);
    }
  };

  //  =================== sweetalert2  =====================

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "mui-confirm-btn",
      cancelButton: "mui-cancel-btn",
    },
    buttonsStyling: false,
  });

  //==================  useEffect facilities =================
  useEffect(() => {
    setLoading(true);
    getAllFacilities();
  }, [pageNumber, pageSize]);

  return (
    <>
      <Paper
        sx={{
          my: "1rem",
          width: "100%",
          overflow: "hidden",
          borderRadius: "12px",
          boxShadow: 2,
        }}
      >
        <TableContainer sx={{ maxHeight: "calc(100vh - 220px)" }}>
          <Table stickyHeader aria-label="facilities table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Facility Name</TableCell>
                <TableCell align="center">Created By</TableCell>
                <TableCell align="center">Created At</TableCell>
                <TableCell align="center">Updated At</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {facilities.map((facility, index) => (
                <TableRow
                  key={facility._id}
                  hover
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#F8F9FB" : "#ffffff",
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
                  <TableCell align="center">
                    <ActionBtn
                      onEdit={() =>
                        navigate(`/facilities/edit/${facility._id}`)
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
                              deleteFacility(facility._id);
                              swalWithBootstrapButtons.fire({
                                title: "Deleted!",
                                text: "The facility has been deleted.",
                                icon: "success",
                              });
                            } else if (
                              result.dismiss === Swal.DismissReason.cancel
                            ) {
                              swalWithBootstrapButtons.fire({
                                title: "Cancelled",
                                text: "Your facility data is safe :)",
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
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                // Call edit logic here, for example:
                navigate(`/facilities/edit/${selectedRowId}`);
              }}
            >
              ✏️ Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                // Call delete logic here:
                deleteFacility(selectedRowId);
              }}
            >
              <Delete color="error" /> Delete
            </MenuItem>
          </Menu>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 25, 50, 100]}
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
      </Paper>
    </>
  );
}
