'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SignupPage = () => {
  
  const [user, setUser] = useState<any>({
    username: '',
    email: '',
    password: '',
  });


  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitForm = async (e:any) => {
    e.preventDefault();
    try {
      setDisable(true);
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      toast.success('Signup Successfully,Please check your email');
      setDisable(false);
      setLoading(false);
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user]);
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <form
          onSubmit={submitForm}
          className="lg:w-1/3 md:w-1/2 bg-white flex flex-col  w-full md:py-8 mt-8 md:mt-0 px-4 "
        >
          <h2 className="text-gray-900 text-lg  font-medium title-font">
            Resgister Now
          </h2>
          <p className="leading-relaxed mb-1 text-gray-600 text-sm">
            This is the simple authentication system made by <span className='text-indigo-500' >Er. Satis Kumar Chaudhary</span>
          </p>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e)=>setUser({...user,username:e.target.value})}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e)=>setUser({...user,email:e.target.value})}
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e)=>setUser({...user,password:e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={disable}
            className={`text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg ${disable && "bg-indigo-300 cursor-not-allowed hover:bg-indigo-300"}`}
          >
            Submit
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Already have an accout?<Link href={'/login'} className='hover:text-indigo-500'>Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
