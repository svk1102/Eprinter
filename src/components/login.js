import { signInWithEmailAndPassword } from 'firebase/auth';
import React,{useState} from 'react'
import {auth} from '../firebase'

function Login() {

    
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredentials) => {
        console.log(userCredentials)
    }).catch((error) => {console.log(error)})    
}

  return (
    <>
     <form onSubmit={signIn}>
        <h2 className="flex justify-center items-center">Login</h2>
        <div className="flex justify-center items-center">
            <input type="email" 
                placeholder="Enter email" 
                className="border-2 m-2" 
                value={email} 
                onChange={(e) => {setEmail(e.target.value)}}>
            </input>
            <input type="password" 
                placeholder="Enter Password" 
                className="border-2 m-2" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}>
            </input>
        </div>
        <div className="flex justify-center items-center ">
            <button type="submit" className="m-2 py-1 px-2 border-2">Submit</button>
        </div>
    </form>   
    </>
  )
}

export default Login