import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

export default function Verify() {

  const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext)
  const [searchParams, setSearchParams] = useSearchParams()

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const verifyPayment = async ()=>{
    try {
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl+ '/api/order/verifyStripe', {success, orderId}, {headers:{token}})
      if(response.data.success){
        setCartItems({})
        navigate('/orders')
      }else{
        navigate('/')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    verifyPayment()
  },[token])


  return (
    <div>
      
    </div>
  )
}