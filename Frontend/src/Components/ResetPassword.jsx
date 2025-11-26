import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import resetPasswordSchema from '../TypeSchemas/ResetPasswordSchema'
import authStore from '../store/AuthStore'
import { useParams } from 'react-router-dom'

function ResetPassword() {

  const resetPassword = authStore((state) => state.resetPassword);
  const isLoading = authStore((state) => state.isLoading);
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: ""
    }
  });

  const onSubmit = async (data) => {
     resetPassword(data, token).then().catch();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-[#8E9F7C] p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Heading and Logo
        </h2>

        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#f3f5ee] border border-gray-300 rounded-xl p-6 text-left"
        >
          <h3 className="font-semibold text-lg mb-4 border-b pb-1">Reset Password</h3>

          <label className="font-medium text-sm">New Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full mt-1 mb-2 px-3 py-2 bg-blue-50 border rounded-md focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-600 text-sm -mt-1">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-white text-black py-2 rounded-md border hover:bg-gray-200 disabled:opacity-50"
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default ResetPassword;
