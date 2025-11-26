import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import forgotPasswordSchema from '../TypeSchemas/ForgotPasswordSchema'
import authStore from '../store/AuthStore'
import {Link} from "react-router-dom"
function ForgotPassword() {

  const forgotPassword = authStore((state) => state.forgotPassword);
  const isLoading = authStore((state) => state.isLoading);

  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues:{
      email: ""
    }
  });

  const onSubmit = async (data) => {
    await forgotPassword(data);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-[#8E9F7C] p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Heading and Logo
        </h2>

        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#f3f5ee] border border-gray-300 rounded-xl p-6 text-left"
        >
          <h3 className="font-semibold text-lg mb-4 border-b pb-1">
            Forgot Password
          </h3>

          <label htmlFor="email" className="font-medium text-sm">Email</label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="w-full mt-1 mb-2 px-3 py-2 bg-blue-50 border rounded-md focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-600 text-sm -mt-1">{errors.email.message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-white text-black py-2 rounded-md border hover:bg-gray-200 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

      <Link to="/login"
      className='text-md text-blue-300 hover:text-blue-600 transition-all ease-in-out duration-1000 self-start'
      >Back to Login</Link>
      </div>
    </div>
  );
}

export default ForgotPassword;
