import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from '../api-client';
import { Link, useNavigate,useLocation } from "react-router-dom";
import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useQueryClient } from "@tanstack/react-query";


export type SignInFormData ={
    email:string;
    password:string;
}
const SignIn = () =>{
  const queryClient = useQueryClient();
  const {showToast}= useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
 
    const {register,
        formState:{errors},
        handleSubmit
     } = useForm<SignInFormData>();
     const [apiError, setApiError] = useState<string | null>(null);
     const  mutation = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: async () => {
      showToast({
        message: "Sign in sucessfull", type : "success"
      });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate (location.state?.from?.pathname ||"/");
      console.log("user have signed in");
      setApiError(null);
    },
    onError: (error: unknown) => {
      let message = "An unknown error occurred";
      if (error instanceof Error) {
        message = error.message;
      }
      showToast({
        message,
        type: "error"
      });
      setApiError(message);
    },
  });

     const onSubmit = handleSubmit((data) =>{
      mutation.mutate(data);
     });
    return (
      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center py-8">
        <form
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6"
          onSubmit={onSubmit}
        >
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-blue-700 mb-2">Sign In</h2>
            <p className="text-gray-500">Welcome back! Please enter your details.</p>
          </div>
          {apiError && (
            <div className="text-red-500 text-center mb-4">{apiError}</div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              placeholder="Enter your email address"
              {...register("email", { required: "This field is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
              placeholder="Enter your password"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.password.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log In
          </button>
          <div className="text-center pt-2">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
};

export default SignIn;