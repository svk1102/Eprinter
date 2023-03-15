import React from 'react'
import {UserAuth} from '../context/AuthContext'
import {GoogleButton} from 'react-google-button'


function GoogleSignIn() { 

    const {googleSignIn } = UserAuth()
    
    const handleSignIn = async() => {
        try {
            await googleSignIn()
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <div id='googleSignIn'><GoogleButton type="dark" onClick={handleSignIn}>GoogleSignIn</GoogleButton></div>
  )
}

export default GoogleSignIn