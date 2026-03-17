import { useState } from 'react'
import Register from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProfileList from './pages/ProfileList.jsx'
import ProfileDetail from './pages/ProfileDetail.jsx'
import Navbar from './component/Nav.jsx'
import CreateProfile from './pages/CreateProfile.jsx'
import Login from './pages/Login.jsx'
import MyAccount from './pages/MyAccount.jsx'
import Chat from './pages/Chat.jsx'
import Connection from './pages/Connections.jsx'
import Footer from './component/Footer.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from './context/AuthContext.jsx'
import ChatConnection from './pages/ChatConnection.jsx'

// const {profiles} = useAuth();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <Navbar/> {/* Common across all pages */}
      <Routes>  
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element ={<Dashboard/>}/>
        <Route path="/profiles" element={<ProfileList/>}/>
        <Route path="/profile/:id" element={<ProfileDetail/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<CreateProfile />} />
        <Route path="/connections" element={<Connection />} />
        <Route path="/Chat" element={<ChatConnection />} />
        <Route path="/Chat/:id" element={<Chat />} />
        <Route path="/Account" element={<MyAccount/>}/>
        </Routes> 
        <Footer/>   
    </>
  )
}

export default App
