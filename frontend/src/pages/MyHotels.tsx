import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import type { HotelType } from "../types/hotel";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { data: hotelData } = useQuery({
    queryKey: ["fetchMyHotels"],
    queryFn: apiClient.fetchMyHotels,
  });

  if (!hotelData) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2 drop-shadow-sm">
              My Hotels
            </h1>
            <p className="text-lg text-gray-600 font-medium bg-gradient-to-r from-gray-600 to-gray-500 bg-clip-text text-transparent">
              ✨ Manage your hotel listings and bookings with ease
            </p>
          </div>
          <Link
            to="/add-hotel"
            className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Hotel
          </Link>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {hotelData.map((hotel: HotelType) => (
            <div
              key={hotel._id}
              data-testid="hotel-card"
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
                             {/* Hotel Image Placeholder */}
               <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                 <div className="absolute top-4 right-4">
                   <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                     <span className="text-yellow-200">★</span>
                     <span>{hotel.starRating}</span>
                     <span className="text-yellow-200">★</span>
                   </div>
                 </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-2xl font-bold drop-shadow-lg">{hotel.name}</h2>
                  <p className="text-white text-opacity-90 flex items-center">
                    <BsMap className="mr-1" />
                    {hotel.city}, {hotel.country}
                  </p>
                </div>
              </div>

              {/* Hotel Content */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-600 line-clamp-3">{hotel.description}</p>
                </div>

                {/* Hotel Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <BsBuilding className="text-blue-600 mr-2 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{hotel.type}</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <BiMoney className="text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">£{hotel.pricePerNight}/night</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <BiHotel className="text-purple-600 mr-2 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">
                      {hotel.adultCount} adults, {hotel.childCount} children
                    </span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <BiStar className="text-yellow-500 mr-2 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{hotel.starRating} Star</span>
                  </div>
                </div>

                {/* Facilities */}
                {hotel.facilities && hotel.facilities.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Facilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {hotel.facilities.slice(0, 4).map((facility, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
                        >
                          {facility}
                        </span>
                      ))}
                      {hotel.facilities.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                          +{hotel.facilities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className="flex justify-end">
                  <Link
                    to={`/edit-hotel/${hotel._id}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-md"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {hotelData.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <BsBuilding className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Hotels Found</h3>
            <p className="text-gray-500 mb-6">Start by adding your first hotel to get started</p>
            <Link
              to="/add-hotel"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Your First Hotel
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyHotels;