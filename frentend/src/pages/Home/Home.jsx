import React from 'react'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import HeroSection from '../../Components/HeroSection'
import ProductListingPage from '../../Components/ProductListingPage'
import Discount from '../../Components/Discount'

function Home() {
  return (
    <>
       <Header />
       <HeroSection />
       {/* <ProductListingPage /> */}
       <Discount />
       <Footer />
    </>
  )
}

export default Home