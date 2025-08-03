import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col gap-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-emerald-50 rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-2 bg-cyan-50 border border-cyan-100 rounded-xl p-4">
        <h3 className="text-lg font-bold text-cyan-800">Price per night</h3>
        <span className="text-2xl font-extrabold text-cyan-700">
          ₹{pricePerNight}
        </span>
      </div>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
            <label className="block text-yellow-700 font-medium mb-1">
              Check-in
            </label>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-in Date"
              className="w-full bg-white p-2 rounded border border-yellow-200 focus:ring-2 focus:ring-yellow-400 outline-none"
              wrapperClassName="w-full"
            />
          </div>
          <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
            <label className="block text-yellow-700 font-medium mb-1">
              Check-out
            </label>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check-out Date"
              className="w-full bg-white p-2 rounded border border-yellow-200 focus:ring-2 focus:ring-yellow-400 outline-none"
              wrapperClassName="w-full"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <label className="block text-emerald-700 font-medium mb-1">
                Adults
              </label>
              <input
                className="w-full p-2 rounded border border-emerald-200 bg-white focus:ring-2 focus:ring-emerald-400 outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                  valueAsNumber: true,
                })}
              />
              {errors.adultCount && (
                <span className="text-red-500 font-semibold text-xs">
                  {errors.adultCount.message}
                </span>
              )}
            </div>
            <div className="flex-1 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <label className="block text-emerald-700 font-medium mb-1">
                Children
              </label>
              <input
                className="w-full p-2 rounded border border-emerald-200 bg-white focus:ring-2 focus:ring-emerald-400 outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount", {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>
        </div>
        <button
          className="w-full mt-2 bg-gradient-to-r from-blue-600 to-emerald-500 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-blue-700 hover:to-emerald-600 transition"
          type="submit"
        >
          {isLoggedIn ? "Book Now" : "Sign in to Book"}
        </button>
      </form>
    </div>
  );
};

export default GuestInfoForm;