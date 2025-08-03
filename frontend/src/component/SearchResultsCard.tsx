import { Link } from "react-router-dom";
import type { HotelType } from "../types/hotel";
import { AiFillStar } from "react-icons/ai";
type Props = {
  hotel: HotelType;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-blue-100 rounded-2xl p-6 gap-8 shadow hover:shadow-2xl transition-shadow bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50">
      <div className="w-full h-[260px] rounded-xl overflow-hidden shadow-md bg-white">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
          alt={hotel.name}
        />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400 text-lg" />
              ))}
            </span>
            <span className="ml-1 text-sm text-blue-700 font-semibold">
              {hotel.type}
            </span>
          </div>
          <Link
            to={`/details/${hotel._id}`}
            className="text-2xl font-extrabold text-blue-900 hover:underline"
          >
            {hotel.name}
          </Link>
          <div className="text-blue-600 text-sm mt-1">
            {hotel.city}, {hotel.country}
          </div>
        </div>

        <div>
          <div className="line-clamp-4 text-gray-700 bg-yellow-50 border border-yellow-100 rounded-xl p-3">
            {hotel.description}
          </div>
        </div>

        <div className="grid grid-cols-2 items-end whitespace-nowrap mt-2">
          <div className="flex gap-2 items-center flex-wrap">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span
                key={index}
                className="bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-semibold text-xs text-emerald-700"
              >
                {facility}
              </span>
            ))}
            {hotel.facilities.length > 3 && (
              <span className="text-xs text-blue-500 font-semibold">
                +{hotel.facilities.length - 3} more
              </span>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold text-emerald-900 text-lg">
              ₹{hotel.pricePerNight}{" "}
              <span className="text-sm font-normal text-emerald-700">/ night</span>
            </span>
            <Link
              to={`/details/${hotel._id}`}
              className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-5 py-2 rounded-lg font-bold text-base shadow hover:from-blue-700 hover:to-emerald-600 transition"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;