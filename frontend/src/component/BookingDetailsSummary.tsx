import type { HotelType } from "../types/hotel";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-5 rounded-2xl border border-blue-100 shadow-lg bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 p-6 h-fit">
      <h2 className="text-2xl font-bold text-blue-800 mb-2">Your Booking Details</h2>
      <div className="border-b border-blue-100 pb-3 mb-2 bg-cyan-50 border border-cyan-100 rounded-xl p-3">
        <span className="text-cyan-700 font-medium">Location:</span>
        <div className="font-bold text-cyan-900">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 flex-1">
          <span className="text-yellow-700 font-medium">Check-in</span>
          <div className="font-bold text-yellow-900">{checkIn.toDateString()}</div>
        </div>
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 flex-1">
          <span className="text-yellow-700 font-medium">Check-out</span>
          <div className="font-bold text-yellow-900">{checkOut.toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b border-emerald-100 py-3 my-2 bg-emerald-50 border rounded-xl px-3">
        <span className="text-emerald-700 font-medium">Total length of stay:</span>
        <div className="font-bold text-emerald-900">{numberOfNights} night{numberOfNights > 1 ? "s" : ""}</div>
      </div>
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
        <span className="text-blue-700 font-medium">Guests</span>
        <div className="font-bold text-blue-900">
          {adultCount} adult{adultCount > 1 ? "s" : ""} & {childCount} child{childCount !== 1 ? "ren" : ""}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;