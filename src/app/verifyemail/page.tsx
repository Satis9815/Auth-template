'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const VerifyUser = () => {
  const [token, setToken] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(false);
    const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token });
      setIsVerified(true);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div>
      <h2>{token ? `${token}` : 'No Token'}</h2>
      {isVerified ? 'Verified' : 'not Verified'}
    </div>
  );
};

export default VerifyUser;
