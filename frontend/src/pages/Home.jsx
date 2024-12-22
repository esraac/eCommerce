import React from 'react'
import Hero from "../components/Hero"
import Footer from "../components/Footer"
import NewArrivals from '../components/NewArrivals'
import PopularProducts from '../components/PopularProducts'
import Features from '../components/Features'

export default function Home() {
  return (
    <>
    <Hero />
    <NewArrivals/>
    <PopularProducts/>
    <Features/>
    <Footer />
    </>
  )
}
