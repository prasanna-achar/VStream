import React from 'react'
import { useForm } from 'react-hook-form'
import LoginSchema from '../TypeSchemas/LoginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import authStore from '../store/AuthStore'
import { Link } from 'react-router-dom'

import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'



function Login() {

  const navigate = useNavigate()


  const login = authStore((state) => state.login);
const isLoading = authStore((state) => state.isLoading);
const verificationCode = authStore((state) => state.verificationCode);



  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  

  const onSubmit = async (data) => {
    console.log("Submitted values: ", data);
    
    try {
      const token = await login(data);
      // verificationCode will be updated in the store and component will re-render
      // Access it from the store after the state updates
      console.log("Verification code: ", verificationCode);
      console.log("Token :- >", token);
      navigate(`/verify/${token}`)

      
    } catch (error) {
      console.error("Login error:", error);
      // You can add user-friendly error messages here
      setError("password" , "Invalid credentials")
      setError("email" , "Invalid credentials")

    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 bg-[#97A589] rounded-2xl shadow-2xl 
                 text-gray-900 w-[380px] 
                 flex flex-col gap-6"
    >
      {/* Heading */}
      <div className="text-center">
        <h3 className="text-2xl font-bold tracking-wide">Heading and Logo</h3>
      </div>

      <fieldset className="border border-[#BED3BC] p-4 rounded-xl">
        <legend className="px-2 text-lg font-semibold text-gray-800">
          Login
        </legend>

        <table className="w-full text-left">
          <tbody className="space-y-4">
            <tr className="h-12">
              <td className="w-1/3 font-medium">Email:</td>
              <td>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full bg-[#BED3BC] p-2 rounded-md outline-none 
                             border border-transparent focus:border-[#7D8C7A]"
                />
                {errors.email && (
                  <p className="text-red-700 text-xs mt-1">{errors.email.message}</p>
                )}
              </td>
            </tr>

            <tr className="h-12">
              <td className="font-medium">Password:</td>
              <td>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="w-full bg-[#DBECD2] p-2 rounded-md outline-none 
                             border border-transparent focus:border-[#7D8C7A]"
                />
                {errors.password && (
                  <p className="text-red-700 text-xs mt-1">{errors.password.message}</p>
                )}
              </td>
            </tr>

            <tr>
              <td colSpan={2} className="pt-4">
                <button
                  type="submit"
                  
                  className={`w-full bg-[#F4F4F4] p-3 rounded-lg font-semibold 
                             cursor-pointer hover:bg-white transition active:scale-[.98] flex justify-center items-center ${isLoading ? "opacity-45" : ""}`} 
                             

                  disabled = {isLoading ? true : false}
                >Login {isLoading? <Loader2 className="size-6 animate-spin"/>: ""}</button>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="pt-4">
                  <p>Don't have an accout? <Link to="/register" className="cursor-pointer text-blue-600 hover:text-blue-900 transition-all ease-in-out">Sign up</Link> </p>
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>

      <p><Link to="/forgot-password"
      className='text-md text-blue-300 hover:text-blue-600 transition-all ease-in-out duration-1000'
      >Forgot Password</Link></p>
    </form>
  );
}

export default Login;
