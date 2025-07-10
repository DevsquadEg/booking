
import {
  Box,
  Dialog,
  IconButton,
  Typography,
  DialogContent,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import DiscountIcon from "@mui/icons-material/Discount";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { RoomDetailsProps } from "../../../../Interfaces/Adds.interface";
import { useMemo } from "react";

export default function AddsDetails({ open, onClose, room }: RoomDetailsProps) {



  // check type of created By Property
const displayCreator = useMemo(function(){
  return typeof room?.createdBy === "string" ? room.createdBy : room?.createdBy?.userName
},[room?.createdBy])





 




 if (!room) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: "background.paper",
        },
      }}
    >
      {/* Top image */}
      <Box sx={{ position: "relative" }}>
        <img
  src={room.images}
  alt={room.roomNumber}
  style={{
    width: "100%",
    height: "auto",
    maxHeight: "200px",
    objectFit: "cover",
  }}
/>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "background.paper",
            boxShadow: 1,
            "&:hover": { bgcolor: "error.main", color: "#fff" }
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: 2 }}>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <MeetingRoomIcon color="primary" />
          <Typography variant="h6">Room: {room.roomNumber}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <MonetizationOnIcon color="success" />
          <Typography>Price: ${room.price}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <GroupIcon color="info" />
          <Typography>Capacity: {room.capacity}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          <DiscountIcon color="warning" />
          <Typography>Discount: {room.discount}%</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1} mb={1}>
          {room.isActive ? (
            <>
              <CheckCircleIcon color="success" />
              <Typography>Status: Active</Typography>
            </>
          ) : (
            <>
              <CancelIcon color="error" />
              <Typography>Status: Inactive</Typography>
            </>
          )}
        </Box>

       

        <Divider sx={{ my: 2 }} />

        <Typography variant="caption" color="text.secondary">
          Created by: {displayCreator}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Created at: {new Date(room.createdAt).toLocaleString()}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}











