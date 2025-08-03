import { useForm, FormProvider } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestSection";
import ImagesSection from "./ImagesSection";
import type { HotelType } from "../../types/hotel";
import { useEffect } from "react";

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
  };
  type Props = {
    hotel?: HotelType
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
  };

const ManageHotelForm =({onSave, isLoading, hotel} : Props)=>{
    const formMethods = useForm<HotelFormData>({
      defaultValues: {
        name: "",
        city: "",
        country: "",
        description: "",
        type: "",
        pricePerNight: 0,
        starRating: 0,
        facilities: [],
        adultCount: 1,
        childCount: 0,
      }
    });
    const {handleSubmit,reset}= formMethods;
    useEffect(()=>{ 
      if (hotel) {
        reset(hotel);
      }
    },[hotel,reset]);
    
    const onSubmit = handleSubmit((formDataJson: HotelFormData)=>{
      console.log(formDataJson);
      console.log("Form data before submission:", formDataJson);
      console.log("Facilities selected:", formDataJson.facilities);
      
      // Validate facilities
      if (!formDataJson.facilities || formDataJson.facilities.length === 0) {
        alert("Please select at least one facility");
        return;
      }
      
      const formData = new FormData();
      if(hotel && hotel._id){
        formData.append("hotelId", hotel._id);
      }
      formData.append("name", formDataJson.name || "");
      formData.append("city", formDataJson.city || "");
      formData.append("country", formDataJson.country || "");
      formData.append("description", formDataJson.description || "");
      formData.append("type", formDataJson.type || "");
      formData.append("pricePerNight", (formDataJson.pricePerNight || 0).toString());
      formData.append("starRating", (formDataJson.starRating || 0).toString());
      formData.append("adultCount", (formDataJson.adultCount || 1).toString());
      formData.append("childCount", (formDataJson.childCount || 0).toString());

      // Handle facilities
      if (formDataJson.facilities && formDataJson.facilities.length > 0) {
        console.log("Appending facilities:", formDataJson.facilities);
        formDataJson.facilities.forEach((facility, index) => {
          formData.append(`facilities[${index}]`, facility);
        });
      } else {
        console.log("No facilities selected!");
      }

      // Handle existing image URLs
      if (formDataJson.imageUrls && formDataJson.imageUrls.length > 0) {
        formDataJson.imageUrls.forEach((imageUrl, index) => {
          formData.append(`imageUrls[${index}]`, imageUrl);
        });
      }

      // Handle new image files
      if (formDataJson.imageFiles && formDataJson.imageFiles.length > 0) {
        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
          formData.append(`imageFiles`, imageFile);
        });
      }

      // Debug: Log all FormData entries
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      onSave(formData);
    });
    return(<FormProvider {...formMethods}><form className="flex flex-col gap-4"  onSubmit={onSubmit}>
      <DetailsSection/>
    <TypeSection/>
    <FacilitiesSection/>
    <GuestsSection/>
    <ImagesSection/>
    <span className="flex justify-end">
   <button
  disabled={isLoading}
    type="submit"
    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none"
  >
    {isLoading? "Saving..." : "Save"}
  </button>
</span>
    </form></FormProvider>);
};
export default ManageHotelForm;