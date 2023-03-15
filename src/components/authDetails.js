import { onAuthStateChanged, signOut } from 'firebase/auth'
import React,{useEffect , useState} from 'react'
import { auth } from '../firebase'
import {UserAuth} from '../context/AuthContext'
import {IoIosExit} from "react-icons/io"

function AuthDetails() {

const {user , logOut} = UserAuth()

const handleLogout = async() =>{
 try {
    await logOut()
 } catch (error) {
    console.log(error)
 }
}

  // console.log(user.photoURL)
  const image = user.photoURL

  return (
    <>  <div className="flex justify-between items-center bg-bgnav text-xl lg:text-4xl text-textlight p-3">
        <div className="w-16"><img src={image} className="rounded-full"></img></div>
        <div className="hidden lg:block">Welcome {user.displayName}</div>
         <button className="bg-navlight p-4 rounded-lg hidden lg:block" onClick={handleLogout}>Logout</button>
         <button className="bg-navlight p-4 rounded-lg block lg:hidden" onClick={handleLogout}><IoIosExit/></button>
        </div>
        <div className="w-full lg:hidden text-center flex justify-center items-center bg-bgnav text-xl lg:text-4xl text-textlight p-3">Welcome {user.displayName}</div>
    </>
  )
}

export default AuthDetails