import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../ReducToolKit/AuthSlice';

const Signin = () => {

    const dispatch=useDispatch();
    const [formData,setFormData]=useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }

    const handleSubmit = (e) => {
      e.preventDefault(); // Correct the typo
      dispatch(login(formData)); // Trigger the login action
      console.log("login form", formData);
  };
  

  return (
    <div>
    <h2 className='mb-8 text-3xl font-bold text-center text-gray-800'>Sign In</h2>
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Sign In Form Fields */}
      <div>
        <label className='block text-gray-600'>Email</label>
        <input
        name='email'
          type='email'
          placeholder='Enter your email'
          value={formData.email}
          onChange={handleChange}
          className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <div>
        <label className='block text-gray-600'>Password</label>
        <input
        name='password'
          type='password'
          placeholder='Enter your password'
          value={formData.password}
          onChange={handleChange}
          className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
      <button className='w-full px-4 py-2 mt-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700'>
        Sign In
      </button>
    </form>
  </div>

  )
}

export default Signin