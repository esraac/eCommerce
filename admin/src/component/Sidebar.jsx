import React from 'react'
import { NavLink } from 'react-router-dom'
import {FaSquarePlus} from "react-icons/fa6"
import {FaListAlt} from "react-icons/fa"
import {MdFactCheck} from "react-icons/md"
import {BiLogOut} from "react-icons/bi"

export default function Sidebar({token, setToken}) {
  return (
    <div className='max-sm:flexCenter max-xs:pb-3 rounded-xl bg-white pb-3 mb-3 sm:w-1/5 sm:min-h-screen pl-6 lg:pl-22 sm:pr-3'>
      <div className='flex max-sm:items-center sm:flex-col pt-5'>
        <div className='flex sm:flex-col gap-x-5 gap-y-8 sm:pt-10'>
          <NavLink to={'/add'} className={({isActive})=> isActive ? "-active-link" : "flexStart gap-x-2 p-5 bold-15 text-secondary cursor-pointer max-w-60 h-10 rounded-xl"}>
              <FaSquarePlus />
              <div className='hidden lg:flex'></div>
          </NavLink>
          <NavLink to={'/list'} className={({isActive})=> isActive ? "-active-link" : "flexStart gap-x-2 p-5 bold-15 text-secondary cursor-pointer max-w-60 h-10 rounded-xl"}>
              <FaListAlt />
              <div className='hidden lg:flex'></div>
          </NavLink>
          <NavLink to={'/orders'} className={({isActive})=> isActive ? "-active-link" : "flexStart gap-x-2 p-5 bold-15 text-secondary cursor-pointer max-w-60 h-10 rounded-xl"}>
              <MdFactCheck />
              <div className='hidden lg:flex'></div>
          </NavLink>
        </div>
        <div className='max-sm:ml-5 sm:mt-80'>
          {token && (
            <button onClick={()=>setToken('')} className='flexStart gap-x-2 p-5 bold-15 text-red-500 cursor-pointer max-w-60 h-10 rounded-xl'>
              <BiLogOut />
              <div className='hidden lg:flex'></div>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
