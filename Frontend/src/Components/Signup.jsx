import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import SignupSchema from '../TypeSchemas/SignuUpSchema'
import { useForm } from 'react-hook-form'
import authStore from '../store/AuthStore'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'
function Signup() {

  const register = authStore((state) => state.register);
  const isLoading = authStore((state) => state.isLoading);
  const verificationCode = authStore((state) => state.verificationCode);
  const navigate = useNavigate();

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data) => {
    try {
      const token = await register(data);
      // Navigate to OTP verification page with token
      if (token) {
        navigate(`/verify/${token}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 bg-[#97A589] rounded-2xl shadow-2xl 
                 text-gray-900 w-[400px] 
                 flex flex-col gap-6"
    >
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold tracking-wide">Create Account</h3>
        <p className="text-sm opacity-80">Signup to get started</p>
      </div>

      <fieldset className="border border-[#BED3BC] p-4 rounded-xl">
        <legend className="px-2 text-lg font-semibold text-gray-800">
          Signup
        </legend>

        <table className="w-full text-left">
          <tbody>
            {/* EMAIL */}

            <tr className="h-14">
              <td className="font-medium">Email:</td>
              <td>
                <input
                  type="email"
                  id="email"
                  {...registerForm("email")}
                  className="w-full bg-[#BED3BC] p-2 rounded-md outline-none 
                             border border-transparent focus:border-[#7D8C7A]"
                />
                {errors.email && (
                  <p className="text-red-700 text-xs mt-1">{errors.email.message}</p>
                )}
              </td>
            </tr>


            {/* USERNAME */}
            <tr className="h-14">
              <td className="w-1/3 font-medium">Username:</td>
              <td>
                <input
                  type="text"
                  id="username"
                  {...registerForm("username")}
                  className="w-full bg-[#BED3BC] p-2 rounded-md outline-none 
                             border border-transparent focus:border-[#7D8C7A]"
                />
                {errors.username && (
                  <p className="text-red-700 text-xs mt-1">{errors.username.message}</p>
                )}
              </td>
            </tr>

            

            {/* PASSWORD */}
            <tr className="h-14">
              <td className="font-medium">Password:</td>
              <td>
                <input
                  type="password"
                  id="password"
                  {...registerForm("password")}
                  className="w-full bg-[#DBECD2] p-2 rounded-md outline-none 
                             border border-transparent focus:border-[#7D8C7A]"
                />
                {errors.password && (
                  <p className="text-red-700 text-xs mt-1">{errors.password.message}</p>
                )}
              </td>
            </tr>

            {/* SUBMIT BUTTON */}
            <tr>
              <td colSpan={2} className="pt-4">
                <button
                  type="submit"
                  
                  className="w-full bg-[#F4F4F4] p-3 rounded-lg font-semibold 
                             cursor-pointer hover:bg-white transition active:scale-[.98] flex justify-center"
                  disabled={isLoading}
                >Sign Up {isLoading ? <Loader2 className='size-6 animate-spin'/>:""}</button>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="pt-4">
                  <p>Already have an accout? <Link to="/login" className="cursor-pointer text-blue-600 hover:text-blue-900 transition-all ease-in-out">Login</Link> </p>
              </td>
            </tr>
          </tbody>
        </table>

      </fieldset>
    </form>
  );
}

export default Signup;
