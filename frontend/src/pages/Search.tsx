import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultsCard from "../component/SearchResultsCard";
import Pagination from "../component/Pagination";
import StarRatingFilter from "../component/StarRatingFilter";
import HotelTypesFilter from "../component/HotelTypesFilter";
import FacilitiesFilter from "../component/FacilitiesFilter";
import PriceFilter from "../component/PriceFilter";
import type { HotelSearchResponse } from "../types/hotel";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };

  const { data: hotelData, error, isLoading } = useQuery<HotelSearchResponse>({
    queryKey: ["searchHotels", searchParams],
    queryFn: () => apiClient.searchHotels(searchParams),
    enabled: Boolean(search.destination || searchParams.destination), // Only search if destination is provided
  });

  // Debug logging
  console.log("Search params:", searchParams);
  console.log("Hotel data:", hotelData);
  console.log("Error:", error);
  console.log("Loading:", isLoading);
  console.log("Search context:", search);

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Searching for hotels...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-blue-50">
        <div className="text-center bg-white/80 border border-red-200 rounded-2xl shadow-lg px-8 py-10">
          <div className="flex justify-center mb-4">
            <svg
              className="w-12 h-12 text-red-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 9l-6 6m0-6l6 6"
              />
            </svg>
          </div>
          <p className="text-red-600 text-2xl font-bold mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-gray-700 mb-4">
            We couldn't search for hotels right now.
            <br />Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-blue-700 hover:to-emerald-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-8 px-2 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
        {/* Filters */}
        <aside className="rounded-2xl shadow-lg border border-slate-200 bg-white p-6 h-fit sticky top-10">
          <div className="space-y-7">
            <h3 className="text-2xl font-bold border-b border-slate-200 pb-4 text-blue-700">
              Filter by
            </h3>
            <StarRatingFilter
              selectedStars={selectedStars}
              onChange={handleStarsChange}
            />
            <HotelTypesFilter
              selectedHotelTypes={selectedHotelTypes}
              onChange={handleHotelTypeChange}
            />
            <FacilitiesFilter
              selectedFacilities={selectedFacilities}
              onChange={handleFacilityChange}
            />
            <PriceFilter
              selectedPrice={selectedPrice}
              onChange={(value?: number) => setSelectedPrice(value)}
            />
          </div>
        </aside>
        {/* Results */}
        <main className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-4">
            <span className="text-2xl font-bold text-blue-900">
              {hotelData?.pagination.total || 0} Hotels found
              {search.destination ? (
                <span className="text-blue-600"> in {search.destination}</span>
              ) : null}
            </span>
            <select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              className="p-2 border border-blue-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Sort By</option>
              <option value="starRating">Star Rating</option>
              <option value="pricePerNightAsc">
                Price Per Night (low to high)
              </option>
              <option value="pricePerNightDesc">
                Price Per Night (high to low)
              </option>
            </select>
          </div>
          {hotelData?.data && hotelData.data.length > 0 ? (
            <>
              <div className="grid gap-6">
                {hotelData.data.map((hotel) => (
                  <div
                    key={hotel._id}
                    className="rounded-xl shadow-md bg-white hover:shadow-xl transition-shadow duration-200"
                  >
                    <SearchResultsCard hotel={hotel} />
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <Pagination
                  page={hotelData?.pagination.page || 1}
                  pages={hotelData?.pagination.pages || 1}
                  onPageChange={(page) => setPage(page)}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-semibold text-blue-700 mb-2">
                No Hotels Found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or check back later for new
                listings.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Search;