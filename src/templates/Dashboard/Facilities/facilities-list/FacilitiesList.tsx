import { isAxiosError } from "axios";
import { ADMIN_URLS } from "../../../../services/apiEndpoints";
import { axiosInstance } from "../../../../services/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function FacilitiesList() {
  const [facilities, setFacilities] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  //============  get all projects ==============
  const getAllFacilities = useCallback(
    async (
      // title = "",
      pageSizeValue = pageSize,
      page = pageNumber
    ) => {
      // setLoading(true);
      try {
        const response = await axiosInstance.get(
          ADMIN_URLS.ROOM.GET_ROOM_FACILITIES,
          {
            params: {
              // ...(title && { title }),
              pageSize: pageSizeValue,
              pageNumber: page,
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
      FacilitiesList
      {console.log(facilities)}
    </>
  );
}
