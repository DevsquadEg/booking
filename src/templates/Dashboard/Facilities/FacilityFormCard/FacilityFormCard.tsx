import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Facility } from "@/interfaces/interfaces";

interface Props {
  open: boolean;
  title: string;
  selectedFacility: Facility | null;
  handleCreateNew: (data: { name: string }) => void;
  handleUpdate: (id: string, data: { name: string }) => void;
  error?: string | null;
  onClose: () => void;
}

export default function FacilityFormCard({
  open,
  title,
  selectedFacility,
  handleCreateNew,
  handleUpdate,
  error,
  onClose,
}: Props) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (selectedFacility) {
      setName(selectedFacility.name);
    } else {
      setName("");
    }
  }, [selectedFacility]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (selectedFacility) {
      handleUpdate(selectedFacility._id, { name });
    } else {
      handleCreateNew({ name });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Facility Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && (
          <Box mt={1}>
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          {selectedFacility ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
