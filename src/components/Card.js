import React from 'react'
import Logo from '../assets/logo.png'


function Card({title,text}) {
  return (
    <div className="w-3/4 lg:w-96 h-auto border-2 m-16 border-white rounded-lg flex justify-center items-center flex-col hover:shadow-lg hover:shadow-white cursor-pointer hover:scale-105 transition">
        <div className="w-full">
            <img src={Logo} className="w-full"></img>
        </div>
        <div className=" text-textlight text-md p-2 text-center">
        <div className='text-2xl'>{title}</div>
         {text}
        </div>
    </div>
  )
}

export default Card