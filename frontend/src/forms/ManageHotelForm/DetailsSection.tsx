import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-rose-50 via-indigo-50 to-sky-100 shadow-2xl rounded-2xl p-10 mt-10 border border-blue-100">
      <h1 className="text-4xl font-extrabold mb-2 text-center text-blue-700 drop-shadow">Add Hotel</h1>
      <p className="text-center text-gray-500 mb-8 text-lg">Fill in the details below to list your hotel</p>
      <div className="flex flex-col gap-8">
        <label className="text-gray-700 text-base font-semibold flex-1">
          Name
          <input
            type="text"
            className="border border-gray-300 rounded-lg w-full py-3 px-4 font-normal mt-1 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm"
            {...register("name", { required: "This field is required" })}
          />
          {errors.name && (
            <span className="text-red-600 text-sm mt-2 block font-bold animate-shake bg-red-50 rounded px-2 py-1 border border-red-200 shadow-sm">{errors.name.message}</span>
          )}
        </label>

        <div className="flex gap-8">
          <label className="text-gray-700 text-base font-semibold flex-1">
            City
            <input
              type="text"
              className="border border-gray-300 rounded-lg w-full py-3 px-4 font-normal mt-1 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm"
              {...register("city", { required: "This field is required" })}
            />
            {errors.city && (
              <span className="text-red-600 text-sm mt-2 block font-bold animate-shake bg-red-50 rounded px-2 py-1 border border-red-200 shadow-sm">{errors.city.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-base font-semibold flex-1">
            Country
            <input
              type="text"
              className="border border-gray-300 rounded-lg w-full py-3 px-4 font-normal mt-1 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm"
              {...register("country", { required: "This field is required" })}
            />
            {errors.country && (
              <span className="text-red-600 text-sm mt-2 block font-bold animate-shake bg-red-50 rounded px-2 py-1 border border-red-200 shadow-sm">{errors.country.message}</span>
            )}
          </label>
        </div>

        <label className="text-gray-700 text-base font-semibold flex-1">
          Description
          <textarea
            rows={6}
            className="border border-gray-300 rounded-lg w-full py-3 px-4 font-normal mt-1 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm resize-none"
            {...register("description", { required: "This field is required" })}
          />
          {errors.description && (
            <span className="text-red-600 text-sm mt-2 block font-bold animate-shake bg-red-50 rounded px-2 py-1 border border-red-200 shadow-sm">{errors.description.message}</span>
          )}
        </label>

        <div className="flex gap-8">
          <label className="text-gray-700 text-base font-semibold flex-1">
            Price Per Night
            <input
              type="number"
              min={1}
              className="border border-gray-300 rounded-lg w-full py-3 px-4 font-normal mt-1 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm"
              {...register("pricePerNight", { required: "This field is required" })}
            />
            {errors.pricePerNight && (
              <span className="text-red-600 text-sm mt-2 block font-bold animate-shake bg-red-50 rounded px-2 py-1 border border-red-200 shadow-sm">{errors.pricePerNight.message}</span>
            )}
          </label>
          <label className="text-gray-700 text-base font-semibold flex-1">
            Star Rating
            <select
              {...register("starRating", {
                required: "This field is required",
              })}
              className="border border-gray-300 rounded-lg w-full py-3 px-4 font-normal mt-1 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 bg-white shadow-sm"
            >
              <option value="" className="text-sm font-bold">
                Select a Rating
              </option>
              {[1, 2, 3, 4, 5].map((num) => (
                <option value={num} key={num}>{num}</option>
              ))}
            </select>
            {errors.starRating && (
              <span className="text-red-600 text-sm mt-2 block font-bold animate-shake bg-red-50 rounded px-2 py-1 border border-red-200 shadow-sm">{errors.starRating.message}</span>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default DetailsSection;