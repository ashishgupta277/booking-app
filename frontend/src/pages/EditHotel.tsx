import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel, isLoading: isLoadingHotel } = useQuery({
    queryKey: ["fetchMyHotelByIdnew", hotelId],
    queryFn: () => apiClient.fetchMyHotelByIdnew(hotelId || ""),
    enabled: !!hotelId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: apiClient.updateMyHotelById,
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "success" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "error" });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  if (isLoadingHotel) {
    return <div>Loading...</div>;
  }

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isPending} />
  );
};

export default EditHotel;