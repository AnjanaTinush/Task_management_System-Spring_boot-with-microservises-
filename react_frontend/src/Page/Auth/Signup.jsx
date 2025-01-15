import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react'

const Signup = () => {

    const [formData,setFormData]=useState({
        fullName:"",
        email:"",
        password:"",
        role:""
    })

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData({...formData,[name]:value})
    }

    const handleSubmit=(e)=>{
        e.preventdefauld();
        console.log("login form",formData)
    } 

  return (
    <div>
    <h2 className='mb-8 text-3xl font-bold text-center text-gray-800'>Register</h2>
    <form onSubmit={handleSubmit} className='space-y-6'>
      {/* Sign In Form Fields */}
      <div>
        <label className='block text-gray-600'>Full Name</label>
        <input
        name='fullName'
          type='text'
          placeholder='Enter your full name'
          value={formData.fullName}
          onChange={handleChange}
          className='w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      </div>
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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formData.role}
          label="Role"
          name="role"
          onChange={handleChange}
        >
          <MenuItem value={"ROLE_CUSTOMER"}>User</MenuItem>
          <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem>
        </Select>
      </FormControl>
      <button className='w-full px-4 py-2 mt-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700'>
        Register
      </button>
    </form>
  </div>

  )
}

export default Signup