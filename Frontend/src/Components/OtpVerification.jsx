import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import OTPSchema from '../TypeSchemas/OTPSchema'
import authStore from '../store/AuthStore'
import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'


function OtpVerification() {

  const navigate = useNavigate();

  const verify = authStore(state => state.verify);
  const resendOtp = authStore(state => state.resendOtp);
  const isLoading = authStore(state => state.isLoading);
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(OTPSchema),
    defaultValues: { otp: "" }
  });

  const onSubmit = async (data) => {
     verify(data, token).then(()=>{
        navigate("/")
     });;

  };

  const handleResendOtp = async () => {
     resendOtp(token)
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

          <h3 className="font-semibold text-lg mb-4 border-b pb-1">OTP</h3>

          <label htmlFor="otp" className="font-medium text-sm text-gray-800">
            Enter OTP:
          </label>
          <input
            type="text"
            id="otp"
            maxLength={6}
            {...register("otp")}
            className="w-full mt-1 mb-2 px-3 py-2 bg-blue-50 border rounded-md focus:outline-none"
          />
          {errors.otp && (
            <p className="text-red-600 text-sm -mt-1">{errors.otp.message}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-white text-black py-2 rounded-md border hover:bg-gray-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin size-4"/> : "Verify"}
          </button>

          <div className="text-center mt-3">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isLoading}
              className="text-blue-700 text-sm hover:underline disabled:opacity-50"
            >
              Resend OTP
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
