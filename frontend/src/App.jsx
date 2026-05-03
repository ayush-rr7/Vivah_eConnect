import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedLayout from "./routes/ProtectedLayout.jsx";
import PublicLayout from "./routes/PublicLayout.jsx";
//Component
import Navbar from './component/Nav.jsx'
import Footer from './component/Footer.jsx'
import FullScreenLoader from './component/fullScreenLoader.jsx'

import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'

//Auth
import Register from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import MyAccount from './pages/MyAccount.jsx'

//Profile
import CreateProfile from './pages/CreateProfile.jsx'
import ProfileList from './pages/ProfileList.jsx'
import ProfileDetail from './pages/ProfileDetail.jsx'
//match
import MatchesPage from './pages/MatchPage.jsx';
import PartnerPreferences from './pages/PartnerPreferences.jsx'
//chat
import Connection from './pages/Connections.jsx'
import ChatConnection from './pages/ChatConnection.jsx'
import Chat from './pages/Chat.jsx'

import { useAuth } from './context/AuthContext.jsx'


// const {profiles} = useAuth();

function App() {
  const [count, setCount] = useState(0)
const { loading } = useAuth();

if (loading) {
  return <FullScreenLoader />;
}
  return (
    <div className="min-h-screen flex flex-col">
    
      <Navbar/> {/* Common across all pages */}
       <main className="flex-1">
      <Routes>  
          <Route element={<PublicLayout />}>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        </Route>
        
         <Route element={<ProtectedLayout />}>
        <Route path="/dashboard" element ={<Dashboard/>}/>
        <Route path="/Account" element={<MyAccount/>}/>
        <Route path="/register" element={<CreateProfile />} />
        <Route path="/profiles" element={<ProfileList/>}/>
        <Route path="/profile/:id" element={<ProfileDetail/>}/>

        <Route path="/PartnerPreferences" element={<PartnerPreferences />} />
        <Route path="/matches" element={<MatchesPage/>}/>
        
        <Route path="/connections" element={<Connection />} />
        <Route path="/Chat" element={<ChatConnection />} />
        <Route path="/Chat/:id" element={<Chat />} />
   
         </Route>
        </Routes> 
       </main>
        <Footer/>   
    </div>
  )
}

export default App
