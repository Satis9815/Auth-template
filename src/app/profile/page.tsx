'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  // const [username,setUsername] = useState('');
  // const [email,setEmail] = useState("");
  const router = useRouter();

  const getUserDetails = async () => {
    const response = await axios.get('/api/users/me');

    setUserDetails(response?.data);
  };
  const logout = async () => {
    await axios.get('/api/users/logout');
    toast.success('Logout Successfully');
    router.push('/login');
  };
  useEffect(() => {
    getUserDetails();
  }, []);


  const update = async()=>{
    await axios.post('/api/users/update',{username:userDetails?.user?.username,email:userDetails?.user?.email});
    toast.success('User Updated Successfully');

  }

  const handleChange =(e:any)=>{
    setUserDetails({...userDetails,user: {
      ...userDetails?.user,
      [e.target.name]: e.target.value,

    }})
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <form className="lg:w-1/3 md:w-1/2 bg-white flex flex-col  w-full md:py-8 mt-8 md:mt-0 px-4 md:px-0 lg:px-0 xl:px-0">
        <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
          Your Details
        </h2>
        <p className="leading-relaxed mb-1 text-gray-600">
          Your Id is{' '}
          <span className="bg-green-500 rounded-lg text-sm text-gray-800 p-2">
            {userDetails?.user?._id}
          </span>
        </p>
        <div className="relative mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userDetails?.user?.username}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label htmlFor="name" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={userDetails?.user?.email}
            onChange={handleChange}
            className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
          <button
            type="button"
            onClick={() => logout()}
            className={`text-white bg-indigo-500 mt-5 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg`}
          >
            Logout
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className={`text-white ml-2 bg-pink-500 mt-5 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg`}
          >
            Go to Home 
          </button>
                   <button
            type="button"
            onClick={update}
            className={`text-white ml-2 bg-green-500 mt-5 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg`}
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
