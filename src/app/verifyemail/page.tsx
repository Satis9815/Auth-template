'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const VerifyUser = () => {
  const [token, setToken] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      if (token.length > 0) {
        await axios.post('/api/users/verifyemail', { token });
        setIsVerified(true);
        router.push('/login');
        toast.success('Email Verified Successfylly');
      } else {
        toast.error('Token Not Found');
      }
    } catch (error:any) {
      toast.error(error?.response?.data?.error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  // useEffect(() => {
  //   if (token.length > 0) {
  //     verifyUserEmail();
  //   }
  // }, [token]);

  return (
    <div className="px-4 md:px-0 lg:px-0 xl:px-0 h-screen justify-center flex items-center flex-col">
      <h2>
        {token ? (
          <>
            <span>Your Token is:</span>{' '}
            <span className="bg-green-500 rounded-lg text-sm text-gray-800 p-2">
              {' '}
              ${token}
            </span>
          </>
        ) : (
          'No Token'
        )}
      </h2>
      <p className='my-4 text-black bg-gray-400 text-sm  p-2 rounded'>{isVerified ? 'Verified' : 'not Verified'}</p>
      <button
        type="button"
        onClick={() => verifyUserEmail()}
        className={`text-white bg-indigo-500 mt-2 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg`}
      >
        Verify Your Email
      </button>
    </div>
  );
};

export default VerifyUser;
