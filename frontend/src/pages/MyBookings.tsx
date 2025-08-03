import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../api-client";
import type { HotelType, BookingType } from "../types/hotel";

type HotelWithBookings = HotelType & {
  bookings: BookingType[];
};

const MyBookings = () => {
  const { data: hotels } = useQuery<HotelType[]>({
    queryKey: ["fetchMyBookings"],
    queryFn: apiClient.fetchMyBookings,
  });

  if (!hotels || hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <span className="text-xl text-blue-700 font-semibold">No bookings found</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-8">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-4">My Bookings</h1>
      {hotels.map((hotel) => (
        <div
          key={hotel._id}
          className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] border border-blue-100 rounded-2xl p-6 gap-8 shadow bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 hover:shadow-xl transition-shadow"
        >
          <div className="w-full h-[220px] rounded-xl overflow-hidden shadow-sm bg-white">
            <img
              src={hotel.imageUrls[0]}
              className="w-full h-full object-cover object-center"
              alt={hotel.name}
            />
          </div>
          <div className="flex flex-col gap-4 justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-900 mb-1">{hotel.name}</div>
              <div className="text-blue-600 text-sm mb-2">
                {hotel.city}, {hotel.country}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {hotel.facilities?.slice(0, 3).map((facility, idx) => (
                  <span
                    key={idx}
                    className="bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold text-xs text-emerald-700"
                  >
                    {facility}
                  </span>
                ))}
                {hotel.facilities && hotel.facilities.length > 3 && (
                  <span className="text-xs text-blue-500 font-semibold">
                    +{hotel.facilities.length - 3} more
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-4">
              {(hotel as HotelWithBookings).bookings.map((booking: BookingType, index: number) => (
                <div
                  key={index}
                  className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 shadow-sm"
                >
                  <div>
                    <span className="font-bold text-yellow-800 mr-2">Dates:</span>
                    <span className="text-yellow-900 font-medium">
                      {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-yellow-800 mr-2">Guests:</span>
                    <span className="text-yellow-900 font-medium">
                      {booking.adultCount} adult{booking.adultCount > 1 ? "s" : ""}, {booking.childCount} child{booking.childCount !== 1 ? "ren" : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;