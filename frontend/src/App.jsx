import React from 'react'
import Home from './Home/Home'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { Routes, Route , Navigate} from 'react-router-dom'
import {useAuth} from './context/AuthProvider';
import { Toaster } from 'react-hot-toast';
import Loading from './Components/Loading'
const App = () => {
  const [authUser,setAuthUser] = useAuth();
  return (
    <div>
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to={'/login'}/>}/>
        <Route path='/login' element={authUser ? <Navigate to={'/'}/>: <Login/>} />
        <Route path='/signup' element={authUser ? <Navigate to={'/'}/> : <Signup/>} />
        
      </Routes>
      <Toaster/>
  
     
    </div>
  )
}

export default App
