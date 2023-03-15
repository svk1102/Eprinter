import { useContext , createContext, useEffect, useState } from "react";
import {GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged , getAdditionalUserInfo} from "firebase/auth"
import { auth } from "../firebase"; 
import { collection , addDoc , doc , setDoc} from 'firebase/firestore';
import { db } from "../firebase";

const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {

    const [user,setUser] = useState(null)
    
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth,provider)
        .then(async(res) => {
            await console.log(res.user.displayName)
            const isFirstLogin = getAdditionalUserInfo(res).isNewUser
            if(isFirstLogin){
                    setDoc(doc(db, "userList", `${res.user.uid}`),{
                          name: res.user.displayName,
                          email:res.user.email,  
                          rfid: null,
                           } );
            }
        })
    }

    const logOut = () => {
        signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(currentUser) => {
            setUser(currentUser)
            console.log(currentUser)
        })
        return () => {
            unsubscribe();
        } 
    },[])

    return(
        <AuthContext.Provider value={{googleSignIn , logOut , user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}