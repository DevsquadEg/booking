import { Box, Button, Grid, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import Paper from "@mui/material/Paper";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DiscountIcon from "@mui/icons-material/Discount";
import PeopleIcon from "@mui/icons-material/People";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DateRangeIcon from "@mui/icons-material/DateRange";
import type {
  AddsProps,
  CreateAddProps,
  RoomRow,
} from "@/interfaces/Adds.interface";
import ActionBtn from "@/components/common/ActionBtn/ActionBtn";
import { axiosInstance } from "@/services/axiosInstance";
import { ADMIN_URLS } from "@/services/apiEndpoints";
import Loading from "@/components/common/Loading/Loading";
import AddsDetails from "@/components/common/AddsDetails/AddsDetails";
import AddsFormCard from "@/components/common/AddsFormCard/AddsFormCard";
import DeleteModal from "@/components/common/DeleteModal/DeleteModal";
import SectionTitle from "@/components/dashboard/sectionTitle/SectionTitle";
import { Add } from "@mui/icons-material";

const paginationModel = { page: 0, pageSize: 5 };
export default function AdsList() {
  const [addsList, setAddsList] = useState<AddsProps[] | null>(null);
  const [selectedAdd, setSelectedAdd] = useState<AddsProps | null>(null);
  const [showAddDetails, setShowAddDetails] = useState(false);
  const [addFormTitle, setAddFormTitle] = useState<string | null>(null);
  const [showAddCardForm, setShowCardForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showDeletModal, setShowDeletModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const rows = useMemo(
    function () {
      return addsList?.map((add: AddsProps) => {
        return {
          _id: add._id,
          roomNumber: add?.room?.roomNumber,
          price: add?.room?.price,
          discount: add?.room?.discount,
          capacity: add?.room?.capacity,
          isActive: add.isActive ? "Active" : "InActive",
          facilities: add?.room?.facilities?.[0],
          // hidden data
          images: add?.room?.images?.[0],
          createdBy:
            typeof add.createdBy === "string"
              ? add.createdBy
              : add.createdBy?.userName,
          createdAt: add.createdAt,
          updatedAt: add.updatedAt,
          roomId: add.room?._id,
        };
      });
    },
    [addsList]
  );

  const columns: GridColDef[] = useMemo(function () {
    return [
      {
        field: "roomNumber",
        headerName: "RoomNumber",
        headerAlign: "center",
        flex: 1,
        align: "center",
        renderHeader: () => (
          <Box display="flex" alignItems="center" gap={1}>
            <BedroomParentIcon color="primary" />
            <Typography fontWeight="bold">Room Number</Typography>
          </Box>
        ),
      },

      {
        field: "price",
        headerName: "Price",
        headerAlign: "center",
        flex: 1,
        align: "center",
        renderHeader: () => {
          return (
            <Box display="flex" alignItems="center" gap={1}>
              <MonetizationOnIcon color="primary" />
              <Typography fontWeight="bold">Cost</Typography>
            </Box>
          );
        },
        renderCell: (params) => params.row.price + " $",
      },

      {
        field: "discount",
        headerName: "Discount",
        headerAlign: "center",
        flex: 1,
        align: "center",
        renderHeader: () => {
          return (
            <Box display="flex" alignItems="center" gap={1}>
              <DiscountIcon color="primary" />
              <Typography fontWeight="bold">Discount</Typography>
            </Box>
          );
        },
        renderCell: (params) => params.row.discount + "%",
      },

      {
        field: "capacity",
        headerName: "Capacity",
        headerAlign: "center",
        flex: 1,
        align: "center",
        renderHeader: () => {
          return (
            <Box display="flex" alignItems="center" gap={1}>
              <PeopleIcon color="primary" />
              <Typography fontWeight="bold">Capacity</Typography>
            </Box>
          );
        },
      },

      {
        field: "isActive",
        headerName: "Status",
        headerAlign: "center",
        flex: 1,
        align: "center",
        renderHeader: () => {
          return (
            <Box display="flex" alignItems="center" gap={1}>
              <AutorenewIcon color="primary" />
              <Typography fontWeight="bold">Status</Typography>
            </Box>
          );
        },
      },

      {
        field: "createdAt",
        headerName: "Date",
        headerAlign: "center",
        flex: 1,
        align: "center",
        renderHeader: () => {
          return (
            <Box display="flex" alignItems="center" gap={1}>
              <DateRangeIcon color="primary" />
              <Typography fontWeight="bold">Date</Typography>
            </Box>
          );
        },
        renderCell: (params) =>
          new Date(params.row.createdAt).toLocaleDateString(),
      },

      {
        field: "Actions",
        headerName: "Actions",
        headerAlign: "center",
        flex: 1,
        align: "center",
        renderCell: () => (
          <ActionBtn
            onView={handleShowAddsDetails}
            onEdit={handleEditAdd}
            onDelete={handleClickOpenDeletModal}
          />
        ),
        sortable: false,
        filterable: false,
      },
    ];
  }, []);

  // fetch adds
  const fetchAdds = useCallback(async function fetchAdds() {
    try {
      const { data } = await axiosInstance.get(ADMIN_URLS.ADS.GET_ALL_ADS);
      if (data.success) {
        setAddsList(data.data.ads);
      }
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error.response?.data.message || "Some Thing Go Wrong");
    }
  }, []);

  // create new add

  const handleCreateNewAdd = useCallback(
    async function (data: CreateAddProps) {
      const dataSent = { ...data, discount: Number(data.discount) };
      const toastId = toast.loading("Waiting....");
      try {
        const options = {
          method: "POST",
          url: ADMIN_URLS.ADS.CREATE_AD,
          data: dataSent,
        };

        const { data } = await axiosInstance.request(options);
        if (data.success) {
          toast.success(data.message || "Add Created Successfully !");
          setErrorMessage(null);
          fetchAdds();
          setTimeout(() => {
            setShowCardForm(false);
          }, 1500);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message || " Some thing Go Wrong !");
          setErrorMessage(
            error.response?.data.message || " Some thing Go Wrong !"
          );
        }
      } finally {
        toast.dismiss(toastId);
      }
    },
    [fetchAdds]
  );

  // update current add

  const handleUpdateCurrentAdd = useCallback(
    async function (data: CreateAddProps, addId: string) {
      const dataSent = {
        discount: Number(data.discount),
        isActive: data.isActive,
      };

      const toastId = toast.loading("Waiting....");
      try {
        const options = {
          method: "PUT",
          url: ADMIN_URLS.ADS.UPDATE_AD(addId),
          data: dataSent,
        };

        const { data } = await axiosInstance.request(options);
        if (data.success) {
          toast.success(data.message || "Add Updated Successfully !");
          setErrorMessage(null);
          fetchAdds();
          setTimeout(() => {
            setShowCardForm(false);
          }, 1500);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message || " Some thing Go Wrong !");
          setErrorMessage(
            error.response?.data.message || " Some thing Go Wrong !"
          );
        }
      } finally {
        toast.dismiss(toastId);
      }
    },
    [fetchAdds]
  );

  // Delete Current Add
  const handleDeleteCurrentAdd = useCallback(
    async function (addId: string) {
      const toastId = toast.loading("Deleting Add UnderProcessing....");
      setIsLoading(true);
      try {
        const options = {
          method: "DELETE",
          url: ADMIN_URLS.ADS.DELETE_AD(addId),
        };

        const { data } = await axiosInstance.request(options);
        if (data.success) {
          toast.success(data.message || "Add Deleted Successfully !");
          fetchAdds();
          setTimeout(() => {
            setShowDeletModal(false);
          }, 1500);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message || " Some thing Go Wrong !");
          setErrorMessage(
            error.response?.data.message || " Some thing Go Wrong !"
          );
        }
      } finally {
        toast.dismiss(toastId);
        setIsLoading(false);
      }
    },
    [fetchAdds]
  );

  useEffect(() => {
    fetchAdds();
  }, [fetchAdds]);

  function handleShowAddsDetails() {
    setShowAddDetails(true);
  }

  function handleEditAdd() {
    setShowCardForm(true);
    setAddFormTitle("Update Add");
  }

  function handleShowAddsCardForm() {
    setShowCardForm(true);
    setAddFormTitle("Add New Add");
  }

  const handleClickOpenDeletModal = () => {
    setShowDeletModal(true);
  };

  if (!addsList) return <Loading />;

  return (
    <Box component={"section"} overflow={"hidden"}>
      {/* header */}
      <Grid
        container
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        spacing={3}
      >
        <SectionTitle title="Adds Table Details" />
        <Grid>
          <Button
            variant="contained"
            startIcon={<Add />}
            size="large"
            onClick={handleShowAddsCardForm}
            sx={{
              textTransform: "none",
              borderRadius: "7px",
              backgroundColor: "#3F5FFF",
              "&:hover": {
                backgroundColor: "#2d44d2",
              },
            }}
          >
            Add New Facility
          </Button>
        </Grid>
      </Grid>

      {/*  Booking table */}

      <Grid container justifyContent={"center"}>
        <Grid size={{ sm: 12, md: 10 }}>
          <Paper sx={{ width: "100%", mt: 8, textAlign: "center" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{ pagination: { paginationModel } }}
              pageSizeOptions={[5, 10]}
              getRowId={(rows) => rows._id}
              onRowClick={(params) => setSelectedAdd(params.row)}
              sx={{ border: 0, textAlign: "center", width: "100%" }}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Book Details Pop Up */}

      {showAddDetails && selectedAdd && (
        <AddsDetails
          open={!!selectedAdd}
          room={selectedAdd as RoomRow}
          onClose={() => {
            setShowAddDetails(false);
            setSelectedAdd(null);
          }}
        />
      )}

      {/*  Add Form Card for add and update */}

      {showAddCardForm && addFormTitle && (
        <AddsFormCard
          open={showAddCardForm}
          title={addFormTitle}
          handleCreateNewAdd={handleCreateNewAdd}
          handleUpdateCurrentAdd={handleUpdateCurrentAdd}
          selectedAdd={selectedAdd!}
          error={errorMessage}
          onClose={() => {
            setShowCardForm(false);
            setAddFormTitle(null);
            setSelectedAdd(null);
          }}
        />
      )}

      {/*  Delet Model */}
      {showDeletModal && selectedAdd && (
        <DeleteModal
          message="Are you sure you want to delete this Add"
          currentData={selectedAdd}
          onDelete={handleDeleteCurrentAdd}
          loading={isLoading}
          open={showDeletModal}
          onClose={() => {
            setShowDeletModal(false);
            setSelectedAdd(null);
          }}
        />
      )}
    </Box>
  );
}
