import { useForm } from "react-hook-form";
import type {
  PaymentIntentResponse,
  UserType,
} from "../../types/hotel";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const { hotelId } = useParams();

  const { showToast } = useAppContext();

  const { mutate: bookRoom, isPending } = useMutation({
    mutationFn: apiClient.createRoomBooking,
    onSuccess: () => {
      showToast({ message: "Booking Saved!", type: "success" });
    },
    onError: () => {
      showToast({ message: "Error saving booking", type: "error" });
    },
  });

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 rounded-2xl border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-8 shadow-lg"
    >
      <span className="text-3xl font-extrabold text-black-900 mb-2">Confirm Your Details</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-cyan-50 border border-cyan-100 rounded-xl p-4">
        <label className="text-cyan-800 text-sm font-semibold flex-1">
          First Name
          <input
            className="mt-1 border border-cyan-200 rounded-lg w-full py-2 px-3 text-cyan-900 bg-cyan-100 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-cyan-800 text-sm font-semibold flex-1">
          Last Name
          <input
            className="mt-1 border border-cyan-200 rounded-lg w-full py-2 px-3 text-cyan-900 bg-cyan-100 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-cyan-800 text-sm font-semibold flex-1 md:col-span-2">
          Email
          <input
            className="mt-1 border border-cyan-200 rounded-lg w-full py-2 px-3 text-cyan-900 bg-cyan-100 font-normal"
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-2 bg-yellow-50 border border-yellow-100 rounded-xl p-4">
        <h2 className="text-xl font-bold text-yellow-800">Your Price Summary</h2>
        <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-200">
          <div className="font-bold text-lg text-yellow-900">
            Total Cost: ₹{paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs text-yellow-700">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
        <h3 className="text-xl font-semibold text-emerald-800">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border border-emerald-200 rounded-lg p-3 text-sm bg-white focus:ring-2 focus:ring-emerald-400 transition"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={isPending}
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-6 py-3 rounded-lg font-bold text-lg shadow hover:from-blue-700 hover:to-emerald-600 transition disabled:bg-gray-400"
        >
          {isPending ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;