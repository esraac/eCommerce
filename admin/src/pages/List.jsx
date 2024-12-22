import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backend_url, currency } from '../App'
import { toast } from 'react-toastify'
import {TbTrash} from "react-icons/tb"

export default function List({token}) {

  const [list, setList] = useState([])

  const fetchList = async ()=>{
    try {
      const response = await axios.get(backend_url + '/api/product/list')
      if(response.data.success){
        setList(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async(id)=>{
    try {
      const response = await axios.post(backend_url+ '/api/product/remove', {id}, {headers:{token}})

      if(response.data.success){
        toast.success(response.data.message)
        await fetchList()
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchList()
  },[])

  return (
    <div className='pl-8'>
      <h3 className='h3'>All Products List</h3>
      <div className='flex flex-col gap-2 pt-4'>
        <div className='hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 border text-secondary bg-white bold-14 sm:bold-16 rounded'>
          <h5>Image</h5>
          <h5>Name</h5>
          <h5>Category</h5>
          <h5>Price</h5>
          <h5>Remove</h5>
        </div>
        {list.map((item)=>(
          <div key={item.image[0]} alt="" className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 p-1 bg-white rounded-xl'>
              <img src={item.image[0]} alt="" className='w-12 rounded-lg' />
              <h5 className='text-sm font-semibold'>{item.name}</h5>
              <p className='text-sm font-semibold'>{item.category}</p>
              <p className='text-sm font-semibold'>{currency}{item.price}</p>
              <div><TbTrash onClick={()=> removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg' /></div>
          </div>
        ))}
      </div>
    </div>
  )
}
