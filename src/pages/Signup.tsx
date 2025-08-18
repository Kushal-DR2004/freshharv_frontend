import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../components/UserProvider';

const Signup = () => {

    const userContext = useContext(UserContext);
    const navigate = useNavigate();

    interface FormDataState {
        username: string;
        email: string;
        password: string;
        location: string;
    }

    interface ErrorState {
        username?: string;
        general?: string;
    }

     
    const [formData, setFormData] = useState<FormDataState>({
    username: '',
    email: '',
    password: '',
    location: '',
  });
    
     const {setUsername} = userContext;
    const [errors , setErrors] = useState<ErrorState>({})
    const [success , setSuccess ] = useState<string>("")

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
       const { name, value} = e.target;
       setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('hiii')

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/users/register/', formData, {
        
      });
      console.log(response)
      setSuccess('Registered successful!');
      setErrors({});
      setFormData({ username: '', email: '' ,password: '',location: ''});
      setUsername(response.data.username);
      const token = response.data.access;
      localStorage.setItem('token', token);
      navigate('/registered')

    }
     catch (error: any) {
        if (error.response && error.response.data) {
          const errorData = error.response.data;
        setErrors(errorData);
      } else {
        setErrors({ general: 'Something went wrong!' });
      }
      setSuccess('');
      setFormData({ username: '', email: '' ,password: '',location: ''});
    }
  };
  return (
    <div className='w-[1280px] px-[160px] py-5'>
        <div className='w-[960px]  pb-5'>
            <div className='w-[960px]  pt-5 pb-3 px-'>4
                <h1 className='w-[928px] h-[35px]  font-bold text-[28px] text-[#121712] text-center'>Sign up for FreshHarvest</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className=' py-3 px-4 mx-[240px]'>
                    <input className='w-full  rounded-[8px] p-4 bg-[#F2F5F6] font-medium text-[16px] text-[#708763]'
                        placeholder='User Name'
                        name = 'username'
                        type='text'
                        value = {formData.username}
                        onChange={handleChange}>
                    </input>
                </div>
                <div className=' py-[12px] px-4 mx-[240px]'>
                    <input className='w-full rounded-[8px] p-4 bg-[#F2F5F6] font-medium text-[16px] text-[#708763]'
                        placeholder='Email or phone number'
                        name = 'email'
                        type='email'
                        value = {formData.email}
                        onChange={handleChange}>
                    </input>
                </div>
                <div className=' h-[80px] py-3 px-4 mx-[240px]'>
                    <input className='w-full  rounded-[8px] p-4 bg-[#F2F5F6] font-medium text-[16px] text-[#708763]'
                        placeholder='Password'
                        name = 'password'
                        type='password'
                        value = {formData.password}
                        onChange={handleChange}>
                    </input>
                </div>
                <div className='py-3 px-4 mx-[240px]'>
                    <input className='w-full rounded-[8px] p-4 bg-[#F2F5F6] font-medium text-[16px] text-[#708763]'
                        placeholder='Location(Optional)'
                        name = 'location'
                        type='text'
                        value = {formData.location}
                        onChange={handleChange}>
                    </input>
                </div>
                <div className=" py-3 px-4 mx-[225.5px] ">
                    <button className="w-full px-5 py-3 rounded-[8px] bg-[#4AB814] text-[16px] font-bold text-[#121712] hover:bg-green-600 focus:border">Sign Up</button>
                </div>
                <div className="w-[960px] px-4 pt-1 pb-3">
                    <p className=" text-[14px] font-medium text-[#708763] text-center">By signing up, you agree to our Terms of Service and Privacy Policy.</p>
                </div>

                {success && <p className='text-center text-green-700 font-medium'>{success}</p>}
                {errors && <p className='text-center text-red-400 font-medium'>{errors.username}</p>}
            </form>
        </div>
    </div>
    
  )
}

export default Signup