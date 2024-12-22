import React from 'react'
import {BsFire} from "react-icons/bs"
import {Link} from "react-router-dom"

export default function Hero() {
  return (
    <section className='max-padd-container max-xl:mt-8 mb-16'>
      <div className='max-padd-container bg-hero bg-cover bg-center bg-no-repeat h-[736px] w-full rounded-tl-3xl mt-6'>
        < div className='relative max-w-[777px] top-48'>
        <h5 className='flex items-baseline pl-20 gap-x-4 uppercase medium-18'>
        MODERN COLLECTION<BsFire /></h5>
          <h1 className='h1 pl-20 capitalize max-w-[611px]'>Enjoy The Shopping</h1>
          <p className='pl-20 max-w-lg mb-10 border-1-4 text-tertiary font-bold'>Discover unique and high-quality products for yourself!</p>
        </div>
      </div>
    </section>
  )
}