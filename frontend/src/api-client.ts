import type { RegisterFormData } from "./pages/Register";
import type { SignInFormData } from "./pages/SignIn";

// Set a direct fallback URL if environment variable is not available
// const API_BASE_URL = "http://localhost:8000";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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