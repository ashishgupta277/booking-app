import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import type { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
    const {
      watch,
      setValue,
      formState: { errors },
    } = useFormContext<HotelFormData>();

    const selectedFacilities = watch("facilities") || [];

    const handleFacilityChange = (facility: string, checked: boolean) => {
      const currentFacilities = selectedFacilities;
      console.log("Facility change:", facility, "checked:", checked);
      console.log("Current facilities before change:", currentFacilities);
      
      if (checked) {
        // Add facility if not already selected
        if (!currentFacilities.includes(facility)) {
          const newFacilities = [...currentFacilities, facility];
          console.log("Adding facility, new facilities:", newFacilities);
          setValue("facilities", newFacilities);
        }
      } else {
        // Remove facility
        const newFacilities = currentFacilities.filter(f => f !== facility);
        console.log("Removing facility, new facilities:", newFacilities);
        setValue("facilities", newFacilities);
      }
    };
  
    return (
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mt-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Hotel Facilities</h2>
            <p className="text-sm text-gray-600 mt-1">Select the amenities and services your hotel offers to guests</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {hotelFacilities.map((facility) => {
            const isSelected = selectedFacilities.includes(facility);
            return (
              <label 
                key={facility}
                className={`relative flex items-center p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer group ${
                  isSelected 
                    ? 'bg-blue-50 border-blue-300 hover:border-blue-400' 
                    : 'bg-gray-50 border-transparent hover:border-blue-200 hover:bg-blue-50'
                }`}
              >
                <input
                  type="checkbox"
                  value={facility}
                  className="sr-only"
                  checked={isSelected}
                  onChange={(e) => handleFacilityChange(facility, e.target.checked)}
                />
                <div className="flex items-center gap-3 w-full">
                  <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-colors duration-200 ${
                    isSelected 
                      ? 'bg-blue-600 border-blue-600' 
                      : 'border-gray-300 group-hover:border-blue-400'
                  }`}>
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm font-medium transition-colors duration-200 ${
                    isSelected ? 'text-blue-900' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {facility}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
        
        {errors.facilities && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 text-sm font-medium">
                {errors.facilities.message}
              </span>
            </div>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-blue-800 font-medium mb-1">Pro Tip</p>
              <p className="text-sm text-blue-700">
                Select facilities that accurately represent your hotel's offerings. This helps guests make informed decisions and improves your booking conversion rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default FacilitiesSection;
