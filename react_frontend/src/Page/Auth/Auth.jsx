import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import Signin from './Signin';
import Signup from './Signup';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  const togglePanel = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className='flex items-center justify-center h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50'>
      <div className='relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-xl overflow-hidden min-h-[550px] flex'>
        {/* Left Panel */}
        <div className='flex flex-col justify-center w-1/2 p-8 text-center text-white bg-gradient-to-br from-blue-600 to-indigo-600'>
          <h3 className='text-3xl font-bold'>
            {isRegister ? 'Already have an account?' : 'New here?'}
          </h3>
          <p className='mt-4 text-lg text-blue-100'>
            {isRegister
              ? 'Sign in to access your organized workspace'
              : 'Join us to organize your tasks effectively'}
          </p>
          <button
            onClick={togglePanel}
            className='px-6 py-3 mt-8 font-semibold text-blue-600 transition-colors bg-white rounded-full hover:bg-blue-50'
          >
            {isRegister ? 'Sign In' : 'Sign Up'}
          </button>
        </div>

        {/* Right Panel */}
        <div className='flex flex-col justify-center w-1/2 p-8 bg-white'>
          {isRegister ? (
            <>
                <Signup/>
            </>
          ) : (
            <>
                <Signin/>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
