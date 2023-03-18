import React  from 'react'
import { getDownloadURL, ref, uploadBytesResumable , listAll , deleteObject } from 'firebase/storage';
import {storage , rtdb, db} from "../firebase";
import {useState , useEffect} from 'react';
import { set, ref as dbref, remove, onValue } from 'firebase/database';
import {uid} from "uid"
import AuthDetails from './authDetails';
import { UserAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { MdDelete } from 'react-icons/md';
import Maps from './Maps';


function Homepage() {
    const [progress,setProgress] = useState(0);
    const [fileArr,setFileArr] = useState([]);
    const [url,getUrl] = useState("");
    const [rfid,getRfid] = useState(0)
  
    const {user} = UserAuth(); 
   
    // Getting signed in user's rfid-----
   const userRef = doc(db,"userList",`${user.uid}`)
   getDoc(userRef)
   .then((res) => getRfid(res.data().rfid))
  
    useEffect(() => { 
      showFiles();
    },[])
  
    const formHandler = (e) => {
     e.preventDefault();
     const file = e.target[0].files[0];
     console.log(file);
     UploadFiles(file);
    
    }
  
    const UploadFiles = (file) => {
      if (rfid == null || rfid == 0) {alert("GET A RFID TAG !"); return;}
      if (!file) return;
      const storageRef = ref(storage,`/${user.uid}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef,file);
  
      uploadTask.on("state_changed",(snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
  
        setProgress(progress);
      },(error) => {
        console.log(error)
      },
      () => {
        
        getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          console.log(url)
  
            var uuid = uid()
            set(dbref(rtdb ,`${rfid}/${uuid}`), {
              url:url,
              title:file.name,
              uuid:uuid
            })
          
  
          alert("File Uploaded Successfully")
          getUrl(url);
        })
        showFiles();
        // console.log("URL : " , url)
        
      }
     
    )}
  
    
    const showFiles = () => {
      setFileArr([]);
      const listRef = ref(storage, `/${user.uid}`);
      listAll(listRef)
    .then((res) => {
      res.prefixes.forEach((folderRef) => {
        console.log(folderRef)
      });
      res.items.forEach((itemRef) => {
        setFileArr((oldArr) => 
          [...oldArr , itemRef.name]
        )
      
      });
    }).catch((error) => {
      console.log(error)
    });
      
       
    }
    
    const deleteHandler= (item) => {
      const desertRef = ref(storage, `/${user.uid}/${item}`);
      
  
  // Delete the file
  deleteObject(desertRef).then(() => {
    showFiles();
    console.log("Object Deleted Successfully")
    alert("File Deleted Successfully")
    
  }).catch((error) => {
    console.log(error)
  });

   onValue(dbref(rtdb,`${rfid}`),(snapshot) => {
    const data = snapshot.val()
    if(data !== null){
      Object.values(data).map((res) => {
        if(res.title == item){
          const rtdbref = dbref(rtdb,`/${rfid}/${res.uuid}`)
          remove(rtdbref)
        }
      })
    }
  })
    }
  
  
    return (
      <>
      <AuthDetails/>
      <div className="App bg-bgDark h-screen font-sans font-bold text-yellow-200 flex justify-center items-center flex-col">
        <div className="text-xl lg:text-5xl mb-1 lg:mb-4">E-Printer File Upload</div>
        <div className="bg-bgnav p-2 lg:px-40 lg:py-32 rounded-3xl flex justify-center items-center flex-col">
        <form onSubmit={formHandler} className="flex flex-col lg:flex-row justify-center items-center">
          <input type="file" className="input"></input>
          <button type="submit" className="bg-bgDark text-yellow-200 p-3 rounded-lg w-32">Upload</button>
        </form>
        
  
        <h3 className="text-lg mb-10">Uploaded {progress}%</h3>
        <h3 className="text-xl mb-4">Uploaded files</h3>
  
        <div className="w-full">{fileArr.map((item) => {
          return( 
            <div className="flex justify-between items-center h-16">
            <div className="w-3/4 overflow-hidden">{item}</div>
            <button onClick={() => deleteHandler(item)} className="bg-red-800 text-yellow-200 p-3 rounded-lg w-1/4 hidden lg:block">Delete</button>
            <button onClick={() => deleteHandler(item)} className="bg-red-800 text-yellow-200 p-3 rounded-lg block lg:hidden"><MdDelete/></button>
            </div>
          )
        })}</div>
      </div>
      </div>
      <div className="bg-bgDark flex justify-center items-center text-yellow-400 text-3xl font-bold p-2">Find your nearest Cloud Printer here 👇</div>
      <div className="bg-bgDark flex justify-center items-center border-4 rounded-md border-yellow-200"><Maps/></div>
      
      </>
    );
}

export default Homepage