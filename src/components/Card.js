import React from 'react'
import Logo from '../assets/logo.png'

function Card() {
  return (
    <div className="w-3/4 lg:w-96 h-auto border-2 m-16 border-white rounded-lg flex justify-center items-center flex-col hover:shadow-lg hover:shadow-white cursor-pointer hover:scale-105 transition">
        <div className="w-full">
            <img src={Logo} className="w-full"></img>
        </div>
        <div className=" text-textlight text-md p-2 text-center">
            Sit pariatur et consequat ea quis qui irure elit consequat ipsum nisi occaecat minim irure. Ex minim dolor et qui. Est qui est nostrud proident sint nulla voluptate consectetur. Tempor exercitation dolore dolore nisi incididunt sit aute nulla ad incididunt veniam est excepteur dolore. Ea do officia irure ullamco eiusmod do exercitation enim nisi eu fugiat ullamco. Ad reprehenderit est adipisicing mollit ad veniam laborum ullamco non.
        </div>
    </div>
  )
}

export default Card