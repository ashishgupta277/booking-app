import { useState } from "react";
import type { FormEvent } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import { FaUserFriends, FaChild, FaSearch, FaEraser } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const handleClear = () => {
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(0);

    // Clear session storage
    sessionStorage.removeItem("destination");
    sessionStorage.removeItem("checkIn");
    sessionStorage.removeItem("checkOut");
    sessionStorage.removeItem("adultCount");
    sessionStorage.removeItem("childCount");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur bg-white/80 border border-blue-100 shadow-2xl rounded-2xl px-4 py-6 mx-auto max-w-5xl -mt-12 flex flex-col md:flex-row items-center gap-4"
    >
      {/* Destination */}
      <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 w-full md:w-1/4 shadow-sm">
        <MdTravelExplore size={22} className="text-blue-600 mr-2" />
        <input
          placeholder="Where are you going?"
          className="bg-transparent text-md w-full focus:outline-none font-semibold text-blue-900 placeholder-blue-400"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      {/* Adults & Children */}
      <div className="flex gap-2 w-full md:w-[180px]">
        <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg px-2 py-2 flex-1 shadow-sm">
          <FaUserFriends className="text-blue-600 mr-1" />
          <input
            className="bg-transparent w-8 text-blue-900 font-bold focus:outline-none"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
            aria-label="Adults"
          />
        </div>
        <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg px-2 py-2 flex-1 shadow-sm">
          <FaChild className="text-blue-600 mr-1" />
          <input
            className="bg-transparent w-8 text-blue-900 font-bold focus:outline-none"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
            aria-label="Children"
          />
        </div>
      </div>

      {/* Check-in */}
      <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 w-full md:w-[180px] shadow-sm">
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="bg-transparent w-full text-blue-900 font-semibold focus:outline-none"
          wrapperClassName="w-full"
        />
      </div>

      {/* Check-out */}
      <div className="flex items-center bg-blue-50 border border-blue-200 rounded-lg px-3 py-2 w-full md:w-[180px] shadow-sm">
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="bg-transparent w-full text-blue-900 font-semibold focus:outline-none"
          wrapperClassName="w-full"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 w-full md:w-auto">
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg shadow hover:bg-blue-700 transition w-2/3 md:w-auto justify-center"
        >
          <FaSearch />
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-3 rounded-lg font-bold text-lg shadow hover:bg-red-600 transition w-1/3 md:w-auto justify-center"
        >
          <FaEraser />
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;