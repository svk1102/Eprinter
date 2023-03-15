import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'
import { UserAuth } from '../context/AuthContext'

function LandingPage() {

  const {user} = UserAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(user != null){
      navigate("/home")
      console.log(user)
    }
  },[user])

  return (
    <>
        <div className="bg-bgnav"><Navbar/>
        <HeroSection/>
        </div>
    </>
  )
}

export default LandingPage