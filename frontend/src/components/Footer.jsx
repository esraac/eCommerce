import React from 'react'
import {Link} from "react-router-dom"
import {BsEnvelopeFill, BsGeoAltFill, BsInstagram, BsTelephoneFill, BsTwitter } from "react-icons/bs"

export default function Footer() {
  return (
    <footer className='max-padd-container mt-10'>
      <div className='max-padd-container bg-black text-white py-10 rounded-tr-3xl rounded-tl-3xl'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8'>
          <div>
            <Link to="/">
                <h4 className='bold-24 text-secondary'>Shoplio</h4>
            </Link>
            <p className='text-white mt-5'>
                Crafted with care and dedication.
            </p>
            <p className='text-white mt-5'>
              Copyright 2024 Shoplio. All rights reserved.
            </p>
          </div>
          <div>
            <h4 className='h4 mb-4'>Quick Links</h4>
            <ul className='space-y-2 regular-15'>
              <li className='text-gray-10'>
                <a href="/about">About Us</a>
              </li>
              <li className='text-gray-10'>
                <a href="/collection">Products</a>
              </li>
              <li className='text-gray-10'>
                <a href="/services">Services</a>
              </li>
              <li className='text-gray-10'>
                <a href="/contact">Contact</a>
              </li>
              <li className='text-gray-10'>
                <a href="/privacy-policy">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='h4 mb-4'>Contact Us</h4>
            <p className='text-gray-10 mb-2'>
              <BsTelephoneFill className='inline-block mr-2'/> +90 (312) 359-9612
            </p>
            <p className='text-gray-10 mb-2'>
              <BsEnvelopeFill className='inline-block mr-2' />{"."}
              support@shoplio.com
            </p>
            <p className='text-gray-10 mb-2'>
              <BsGeoAltFill className='inline-block mr-2' /> 123 Shoplio, KTÜ , Trabzon, Türkiye
            </p>
          </div>
          <div>
            <h4 className='h4 mb-4'>Follow Us</h4>
            <div className='flex space-x-4 text-secondary'>
              <a href="#">
                <BsInstagram />
              </a>
              <a href="#">
                <BsTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className='mt-10 text-center text-gray-100'>
          <p>
            Powered by <a href="#"> Shoplio Team</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
