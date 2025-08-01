import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import type { HotelFormData } from "./ManageHotelForm";

// Optionally, you can define icons for each hotel type if you have them
// Example: const typeIcons = { Resort: <ResortIcon />, ... };

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-rose-50 via-indigo-50 to-sky-100 shadow-2xl rounded-2xl p-10 mt-10 border border-blue-100">
      <h2 className="text-4xl font-extrabold mb-2 text-blue-700 text-center drop-shadow">Hotel Type</h2>
      <p className="text-center text-gray-500 mb-8 text-lg">Select the type of hotel you are listing</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-6">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={`cursor-pointer flex flex-col items-center justify-center transition-all duration-200
              text-base rounded-full px-4 py-3 font-semibold border-2 shadow-sm relative
              group
              ${typeWatch === type
                ? "bg-blue-500 text-white border-blue-600 shadow-lg scale-105 z-10"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-400 hover:scale-105"}
            `}
            style={{ minHeight: 70 }}
          >
            {/* Optionally add an icon here if you have one for each type */}
            {/* <span className="mb-1">{typeIcons[type]}</span> */}
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span className="transition-colors duration-200 text-lg font-bold tracking-wide">
              {type}
            </span>
            {typeWatch === type && (
              <span className="absolute top-2 right-2 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></span>
            )}
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-base font-bold block text-center mt-2 animate-shake">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;