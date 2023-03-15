
import { Route ,Routes } from 'react-router-dom';
import AuthDetails from './components/authDetails';
import GoogleSignIn from './components/googleSignIn';
import Homepage from './components/homepage';
import Login from './components/login';
import { AuthContextProvider } from './context/AuthContext';
import LandingPage from './pages/landingPage';
import ProtectedRoutes from './pages/protectedRoutes';


function App() {  
  return(
    <>
    <AuthContextProvider>
    <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/home' element={<ProtectedRoutes><Homepage/></ProtectedRoutes>}></Route>
      {/* <Route path='/login' element={<><Login/><GoogleSignIn/></>}></Route> */}
      {/* <Route path='/signup' element={<SignUp/>}></Route> */}
    </Routes>
    
     
    {/* <AuthDetails/>  */}
    </AuthContextProvider>
    </>
  )
}

export default App;
