import type { RegisterFormData } from "./pages/Register";
import type { SignInFormData } from "./pages/SignIn";
import type { HotelType } from "./types/hotel";
// Set a direct fallback URL if environment variable is not available

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
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

  export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Error fetching Hotel");
    }
  
    return response.json();
  };