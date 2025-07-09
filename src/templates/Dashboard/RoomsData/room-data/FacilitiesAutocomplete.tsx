import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { axiosInstance } from "../../../../services/axiosInstance";
import { ADMIN_URLS } from "../../../../services/apiEndpoints";
import type { Facility } from "../../../../interfaces/interfaces";
import toast from "react-hot-toast";

export default function FacilitiesAutocomplete() {
    
  const [faciliteList, setFaciliteList] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);
  const { control, setValue } = useFormContext();

  const fetchFacilitiesList = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        ADMIN_URLS.ROOM.GET_ROOM_FACILITIES
      );
      const facilities = response?.data?.data?.facilities || [];
      setFaciliteList(facilities);
      
    } catch (error) {
      console.error("Error fetching facilities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFacilitiesList();
  }, []);

  return (
    <Controller
      name="facilities"
      control={control}
      rules={{ required: "facility is required" }}
      render={({ field, fieldState }) => (
        <Autocomplete
          multiple
          loading={loading}
          options={faciliteList}
          getOptionLabel={(option) => option.name}
          filterSelectedOptions
          isOptionEqualToValue={(option, value) => option._id === value._id}
          onChange={(event, selectedOptions) => {
            // Send only array of _id values to form
            const selectedIds = selectedOptions.map((item) => item._id);
            setValue("facilities", selectedIds);
            field.onChange(selectedIds);
          }}
          sx={{
            marginTop: "5px",
            backgroundColor: "#F5F6F8",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Facilities"
              placeholder="Facilities"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
}
