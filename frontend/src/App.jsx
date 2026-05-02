import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedLayout from "./routes/ProtectedLayout.jsx";
import PublicLayout from "./routes/PublicLayout.jsx";
import Register from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import Dashboard from './pages/Dashboard.jsx'
import MatchesPage from './pages/MatchPage.jsx';
import ProfileList from './pages/ProfileList.jsx'
import ProfileDetail from './pages/ProfileDetail.jsx'
import Navbar from './component/Nav.jsx'
import CreateProfile from './pages/CreateProfile.jsx'
import PartnerPreferences from './pages/PartnerPreferences.jsx'
import Login from './pages/Login.jsx'
import MyAccount from './pages/MyAccount.jsx'
import Chat from './pages/Chat.jsx'
import Connection from './pages/Connections.jsx'
import Footer from './component/Footer.jsx'
import FullScreenLoader from './component/fullScreenLoader.jsx'
import { useAuth } from './context/AuthContext.jsx'
import ChatConnection from './pages/ChatConnection.jsx'

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
        <Route path="/profiles" element={<ProfileList/>}/>
        <Route path="/matches" element={<MatchesPage/>}/>
        <Route path="/profile/:id" element={<ProfileDetail/>}/>

        <Route path="/register" element={<CreateProfile />} />
        <Route path="/PartnerPreferences" element={<PartnerPreferences />} />
        <Route path="/connections" element={<Connection />} />
        <Route path="/Chat" element={<ChatConnection />} />
        <Route path="/Chat/:id" element={<Chat />} />
        <Route path="/Account" element={<MyAccount/>}/>
         </Route>
        </Routes> 
       </main>
        <Footer/>   
    </div>
  )
}

export default App
