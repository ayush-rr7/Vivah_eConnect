import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar(){
const {user,logout} =useAuth();
 const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  
  const style=" hover:text-blue-500 hover:text-lg";

  return (
     
    <div >
      <div className="   text-white bg-pink-700 flex justify-start gap-6 p-2"  
      >
       
      
        {!user  ?  ( 
        <>   
        <a href="/"className={style}> 
          Home
        </a>
          <a href="/signup" className={style}> 
          Signup
        </a>
        <a href="/login" className={style}> 
          Login
        </a>
         
       </> 

       ) :
       
        (
          <>
            <a href="/dashboard"className={style}> 
          Dashboard
        </a>
        <a href="/profiles"className={style}> 
          Profiles
        </a>
        <a href="/register" className={style}> 
          Register
        </a>
        <a href="/connections" className={style}> 
          Connections
        </a>
        <a href="/chat" className={style}> 
        Chat
        </a>
            
          <button
          
            onClick={handleLogout}
           className={style}
          >
            Logout
          </button>
        <a href="/Account" className="hover:text-blue-500 hover:text-lg " > 
          MyAccount
        </a>

      
        
          
       </>
        )}


      </div>
    </div>
  )

}
// export default  Navbar