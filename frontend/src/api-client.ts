import type { RegisterFormData } from "./pages/Register";
import type { SignInFormData } from "./pages/SignIn";
import type { HotelType } from "./types/hotel";
import type { HotelSearchResponse } from "./types/hotel";
import type {UserType} from "./types/hotel";
import type { PaymentIntentResponse } from "./types/hotel";
import type { BookingFormData } from "./forms/BookingForm/BookingForm";
// Set a direct fallback URL if environment variable is not available

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};
export const register = async (formData: RegisterFormData) => {
    console.log("API_BASE_URL:", API_BASE_URL); // Debug log
    console.log("Full URL:", `${API_BASE_URL}/api/users/register`); // Debug log
    
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
};

 export const signIn = async (formData: SignInFormData)=>{
    const response =await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(formData),
    });
    if(!response.ok){
        throw new Error("Failed to sign in");
    }
    return response.json();
 }
export const validateToken =async()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include",
    });
    if(!response.ok){
        throw new Error("Failed to validate token");
    }
    return response.json();
};
  export const signOut = async()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials : "include",
        method: "POST",
    });
    if(!response.ok){
        throw new Error("Error during sign out");
    }
  }
  export const addMyHotel = async (hotelFormData: FormData) => {
    console.log("API_BASE_URL:", API_BASE_URL); // Debug log
    console.log("Full URL:", `${API_BASE_URL}/api/my-hotels`); // Debug log
    console.log("FormData contents:"); // Debug log
    for (let [key, value] of hotelFormData.entries()) {
      console.log(`${key}:`, value);
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
      });
    
      console.log("Response status:", response.status); // Debug log
      console.log("Response headers:", response.headers); // Debug log
    
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText); // Debug log
        
        let errorMessage = "Failed to add hotel";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        
        throw new Error(errorMessage);
      }
    
      const result = await response.json();
      console.log("Success response:", result); // Debug log
      return result;
    } catch (error) {
      console.error("Fetch error:", error); // Debug log
      throw error;
    }
  };

  export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching Hotels");
    }
  
    return response.json();
  };

  export const fetchMyHotelByIdnew= async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching Hotel");
    }
  
    return response.json();
  };




  export const updateMyHotelById = async (hotelFormData: FormData): Promise<HotelType> => {
    const hotelId = hotelFormData.get('hotelId') as string;
    if (!hotelId) {
      throw new Error("Hotel ID is required");
    }

    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
      method: "PUT",
      credentials: "include",
      body: hotelFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = "Failed to update hotel";
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return response.json();
  };
  export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
  };

  export const searchHotels = async (
    searchParams: SearchParams
  ): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");
  
    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");
  
    searchParams.facilities?.forEach((facility) =>
      queryParams.append("facilities", facility)
    );
  
    searchParams.types?.forEach((type) => queryParams.append("types", type));
    searchParams.stars?.forEach((star) => queryParams.append("stars", star));
  
    const url = `${API_BASE_URL}/api/hotels/search?${queryParams}`;
    console.log("API_BASE_URL:", API_BASE_URL);
    console.log("Search URL:", url);
  
    const response = await fetch(url);
  
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error("Error fetching hotels");
    }
  
    return response.json();
  };

  export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
    if (!response.ok) {
      throw new Error("Error fetching Hotels");
    }
  
    return response.json();
  };
  
  export const createPaymentIntent = async (
    hotelId: string,
    numberOfNights: string
  ): Promise<PaymentIntentResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
      {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ numberOfNights }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Error fetching payment intent");
    }
  
    return response.json();
  };
  export const createRoomBooking = async (formData: BookingFormData) => {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      }
    );
  
    if (!response.ok) {
      throw new Error("Error booking room");
    }
  };
  export const fetchMyBookings = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Unable to fetch bookings");
    }
  
    return response.json();
  };