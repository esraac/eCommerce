import React, { useContext, useEffect, useState } from 'react';
import loginImg from "../assets/Login.png";
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login() {
  const [currState, setCurrState] = useState("Login");
  const { token, setToken, backendUrl, navigate } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = formData;

  // Input değişikliklerini tek bir fonksiyonla işleyelim
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    if (token || localStorage.getItem('token')) {
      navigate('/');  // Eğer token varsa anasayfaya yönlendir
    }
  }, [token, navigate]);
  
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let response;
  
  
      if (currState === "Sign Up") {
        // Sign Up için API çağrısı
        response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        // Login için API çağrısı
        response = await axios.post(`${backendUrl}/api/user/login`, { email, password }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
  
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  // Token'ı localStorage'a kaydediyoruz
        setToken(response.data.token);  // Token'ı state'e kaydediyoruz
        navigate('/');  // Anasayfaya yönlendiriyoruz
      } else {
        toast.error(response.data.message || "Token not received.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        toast.error(error.response.data.message || "An error occurred");
      } else if (error.request) {
        console.error("Error request:", error.request);
        toast.error("No response received from the server");
      } else {
        console.error("Error message:", error.message);
        toast.error(error.message || "An unknown error occurred");
      }
    }
  };
  
  return (
    <section className='absolute top-0 left-0 h-full w-full z-50 bg-white'>
      <div className='flex h-full w-full'>
        {/* Form */}
        <div className='flex w-full sm:w-1/2 items-center justify-center'>
          <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-md m-auto gap-y-5 text-gray-800'>
            <div className='w-full mb-4'>
              <h3 className='bold-36'>{currState}</h3>
            </div>

            {/* Name input for Sign Up only */}
            {currState === "Sign Up" && (
              <div className='w-full'>
                <label htmlFor='name' className='medium-15'>Name</label>
                <input
                  onChange={handleInputChange}
                  value={name}
                  type="text"
                  placeholder='Name'
                  name="name"
                  required
                  className='w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1'
                />
              </div>
            )}

            {/* Email input */}
            <div className='w-full'>
              <label htmlFor='email' className='medium-15'>Email</label>
              <input
                onChange={handleInputChange}
                value={email}
                type="email"
                placeholder='Email'
                name="email"
                required
                className='w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1'
              />
            </div>

            {/* Password input */}
            <div className='w-full'>
              <label htmlFor='password' className='medium-15'>Password</label>
              <input
                onChange={handleInputChange}
                value={password}
                type="password"
                placeholder='Password'
                name="password"
                required
                className='w-full px-3 py-1.5 ring-slate-900/10 rounded bg-primary mt-1'
              />
            </div>

            <button className='btn-dark w-full mt-5 !py-[9px]'>
              {currState === 'Sign Up' ? 'Sign Up' : 'Login'}
            </button>

            {/* Toggle between Sign Up and Login */}
            <div className='w-full flex flex-col gap-y-3'>
              <div className='underline medium-15'>Forgot your password?</div>
              {currState === "Login" ? (
                <div className='underline medium-15'>
                  Don't have an account?
                  <span onClick={() => setCurrState('Sign Up')} className='cursor-pointer'>
                    Create account
                  </span>
                </div>
              ) : (
                <div className='underline medium-15'>
                  Already have an account?
                  <span onClick={() => setCurrState('Login')} className='cursor-pointer'>
                    Login
                  </span>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Image section */}
        <div className='w-1/2 hidden sm:block'>
          <img src={loginImg} alt="Login Illustration" className='object-cover h-full w-full' />
        </div>
      </div>
    </section>
  );
}
