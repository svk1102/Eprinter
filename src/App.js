import { getDownloadURL, ref, uploadBytesResumable , listAll , deleteObject } from 'firebase/storage';
import { collection , addDoc } from 'firebase/firestore';
import './App.css';
import {storage , db , rtdb} from "./firebase";
import {useState , useEffect} from 'react';
import { set, ref as dbref } from 'firebase/database';
import {uid} from "uid"


function App() {

  const [progress,setProgress] = useState(0);
  const [fileArr,setFileArr] = useState([]);
  const [url,getUrl] = useState("");

  const colRef = collection(db,'files');


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

    if (!file) return;
    const storageRef = ref(storage,`/files/${file.name}`);
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
        // addDoc(colRef,{
        //   name: file.name,
        //   rfid: "12345678",
        //   url: url
        // })

          var uuid = uid()
          set(dbref(rtdb ,`84433605000/${uuid}`), {
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
    const listRef = ref(storage, '/files');
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
    const desertRef = ref(storage, `/files/${item}`);
    

// Delete the file
deleteObject(desertRef).then(() => {
  showFiles();
  console.log("Object Deleted Successfully")
  alert("File Deleted Successfully")
  
}).catch((error) => {
  console.log(error)
});
  }


  return (
    <div className="App bg-bgDark h-screen font-sans font-bold text-yellow-200 flex justify-center items-center flex-col">
      <div className=" text-5xl mb-4">E-Printer File Upload</div>
      <div className="bg-bgnav px-40 py-32 rounded-3xl flex justify-center items-center flex-col">
      <form onSubmit={formHandler}>
        <input type="file" className="input"></input>
        <button type="submit" className="bg-bgDark text-yellow-200 p-3 rounded-lg w-32">Upload</button>
      </form>
      

      <h3 className="text-lg mb-10">Uploaded {progress}%</h3>
      <h3 className="text-xl mb-4">Uploaded files</h3>

      <div className="w-full">{fileArr.map((item) => {
        return( 
          <div className="flex justify-between items-center">
          <div>{item}</div>
          <button onClick={() => deleteHandler(item)} className="bg-red-800 text-yellow-200 p-3 rounded-lg w-32">Delete item</button>
          </div>
        )
      })}</div>
    </div>
    </div>
  );
}

export default App;
