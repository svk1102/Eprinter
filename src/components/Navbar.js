import React, { useState } from 'react'
import logo from "../assets/logo.png"

function Navbar() {

    const [navbar,setNavbar] = useState(false)

    const changeNav = () => {
        if(window.scrollY >= 120){
            setNavbar(true)
        }else{
            setNavbar(false)
        }
    }
    window.addEventListener("scroll",changeNav);

  return (
    <>
        <nav className="flex justify-center items-center">
            <div className={navbar ? "flex justify-between items-center w-5/6 mx-auto h-28 rounded-lg backdrop-blur-xl fixed top-2 transition border-2 border-white z-50" : "flex justify-between items-center w-5/6 mx-auto h-28 rounded-lg absolute top-2"}>
                <div>
                    <img src={logo} className="h-32"></img>
                </div>
                <div className="hidden lg:block">
                    <ul className="flex justify-between text-white mr-6 text-xl">
                        <li className="mx-6 bg-navlight px-2 py-2 rounded cursor-pointer">Home</li>
                        <li className="mx-6 bg-navlight px-2 py-2 rounded cursor-pointer">Features</li>
                        <li className="mx-6 bg-navlight px-2 py-2 rounded cursor-pointer">About</li>
                        <li className="mx-6 bg-navlight px-2 py-2 rounded cursor-pointer">Login</li>
                    </ul>
                </div>
                <div className="block lg:hidden">
                    <ul className="flex justify-between text-white mr-6 text-xl scroll-smooth">
                        <a href='#scroll1'><li className="mx-6 bg-navlight px-2 py-2 rounded cursor-pointer">Login</li></a>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Navbar