/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  
  const [user, setUser] = useState<any>({
    username: '',
    email: '',
    password: '',
  });


  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitForm = async (e:any) => {
    e.preventDefault();
    try {
      setDisable(true);
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      toast.success('Logged In');
      setDisable(false);
      setLoading(false);
      router.push("/profile");
    } catch (error: any) {
      toast.error(error?.message);
      console.log(error);
    }
  };
  useEffect(() => {
    if (
      user.email.length < 0 ||
      user.password.length < 0
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [user]);
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <Toaster/>
        <form
          onSubmit={submitForm}
          className="lg:w-1/3 md:w-1/2 bg-white flex flex-col  w-full md:py-8 mt-8 md:mt-0 px-4 "
        >
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Login Now
          </h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Post-ironic portland shabby chic echo park, banjo fashion axe
          </p>
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
            className={`text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg ${disable && "bg-indigo-300 cursor-not-allowed"}`}
          >
            Login
          </button>
          <p className="text-sm text-gray-500 mt-3">
            You don't  have an accout?<Link href={'/signup'} className='hover:text-indigo-500'>Signup</Link>
          </p>
        </form>
      </div>
    </>
  );
};
export default LoginPage
