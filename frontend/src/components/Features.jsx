import React from 'react'
import Title from './Title'
import {TbArrowBackUp, TbTruckDelivery} from "react-icons/tb"
import {RiSecurePaymentLine} from "react-icons/ri"


export default function Features() {
  return (
    <section className='max-padd-container py-16'>
        <Title title={`Our Features`} titleStyles={"text-center"}/>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 bg-white rounded-xl'>
            <div className='p-4 rounded-3xl'>
                <TbArrowBackUp className='bold-32 mb-3 text-yellow-500'/>
                <h4>Easy Return</h4>
                <p>bla bla bla</p>
            </div>
            <div className='p-4 rounded-3xl'>
                <TbTruckDelivery className='bold-32 mb-3 text-secondary'/>
                <h4>Fast Delivery</h4>
                <p>bla bla bla</p>
            </div>
            <div className='p-4 rounded-3xl'>
                <RiSecurePaymentLine className='bold-32 mb-3 text-red-500'/>
                <h4>Secure Payment</h4>
                <p>bla bla bla</p>
            </div>
        </div>
    </section>
  )
}