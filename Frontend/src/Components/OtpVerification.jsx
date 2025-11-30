import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import OTPSchema from '../TypeSchemas/OTPSchema'
import authStore from '../store/AuthStore'
import { useParams } from 'react-router-dom'
import { Loader2, ShieldCheck } from 'lucide-react'
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
    verify(data, token).then(() => {
      navigate("/")
    });;

  };

  const handleResendOtp = async () => {
    resendOtp(token)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">

        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Verify OTP
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter the verification code sent to your email
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">

            {/* OTP Field */}
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
                Verification Code
              </label>
              <input
                id="otp"
                type="text"
                maxLength={6}
                {...register("otp")}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all text-center tracking-[0.5em] font-mono text-lg"
                placeholder="000000"
              />
              {errors.otp && (
                <p className="mt-1 text-xs text-red-600">{errors.otp.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg`}
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : "Verify Account"}
            </button>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Didn't receive code?{' '}
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="font-medium text-blue-600 hover:text-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Resend OTP
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OtpVerification;
