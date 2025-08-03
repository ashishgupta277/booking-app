import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
import type { HotelType } from "../types/hotel";

const Detail = () => {
  const { id } = useParams();

  const { data: hotel } = useQuery<HotelType>({
    queryKey: ["fetchHotelById", id],
    queryFn: () => apiClient.fetchHotelById(id || ""),
    enabled: !!id,
  });

  if (!hotel) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400 text-xl" />
              ))}
            </span>
            <span className="text-blue-600 font-semibold ml-2">
              {hotel.starRating}-star Hotel
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-blue-900">
            {hotel.name}
          </h1>
          <p className="text-gray-500 mt-1">
            {hotel.city}, {hotel.country}
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold shadow">
            ₹{hotel.pricePerNight} / night
          </span>
        </div>
      </div>

      {/* Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {hotel.imageUrls.map((image, index) => (
          <div
            key={index}
            className="h-64 rounded-xl overflow-hidden shadow hover:scale-105 transition-transform duration-200"
          >
            <img
              src={image}
              alt={hotel.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Facilities */}
      <div>
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Facilities</h2>
        <div className="flex flex-wrap gap-3">
          {hotel.facilities.map((facility, index) => (
            <div
              key={index}
              className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-blue-700 font-medium shadow-sm"
            >
              {facility}
            </div>
          ))}
        </div>
      </div>

      {/* Description & Booking */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div>
          <h2 className="text-xl font-semibold text-emerald-800 mb-2">
            About this hotel
          </h2>
          <div className="whitespace-pre-line text-gray-700 leading-relaxed bg-yellow-50 border border-yellow-100 rounded-xl shadow p-6">
            {hotel.description}
          </div>
        </div>
        <div className="h-fit">
          <div className="sticky top-24">
            <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-emerald-50 rounded-2xl shadow-xl p-6 border border-blue-100">
              <h3 className="text-lg font-bold text-blue-700 mb-4">
                Book your stay
              </h3>
              <GuestInfoForm
                pricePerNight={hotel.pricePerNight}
                hotelId={hotel._id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;