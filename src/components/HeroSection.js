import React from 'react'
import Printer from '../assets/printer.gif'
import GoogleSignIn from './googleSignIn'
import DownArrow from '../assets/downArrow.png'
import ImageCarousel from './Carousel'

function HeroSection() {
  return (
    <>
    <div className="flex-col justify-between items-center bg-bgnav mb-8 mt-40 lg:flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center">
            <img src={Printer} className="w-full"></img>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center flex-col text-textlight">
            <h2 className="text-4xl lg:text-8xl">Innovents</h2>
            <div id='login' className="text-xl">Smart Printing Solutions</div>
            <div className="text-4xl my-8 text-center">IoT based Wireless cloud printer</div>
            <div className="my-4" ><GoogleSignIn/></div>
        </div>
        
    </div>
    <div className="flex justify-center items-center mb-16">
        <img src={DownArrow} className="border-2 p-1 rounded-lg shadow-2xl shadow-white drop-shadow-2xl cursor-pointer"></img>
    </div>
    <div className="flex justify-center items-center flex-col text-textlight">
        <h2 className="text-4xl lg:text-8xl">Features</h2>
    </div>
    <div id='info'>
        <ImageCarousel/>
    </div>
    </>
  )
}

export default HeroSection