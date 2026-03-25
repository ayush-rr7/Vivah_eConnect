import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import  {NavLink}  from "react-router-dom";
export default function Navbar(){
const {user,logout} =useAuth();
 const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
  
  // const style = ({ isActive }) =>
  // `hover:text-blue-500 ${
  //   isActive ? "text-blue-600 font-semibold" : ""
  // }`;
  const style = ({ isActive }) =>
  `transition-all duration-100 hover:text-teal-300 ${
    isActive ? "text-teal-300 font-semibold border-b-2 border-teal-400" : ""
  }`;
  return (
     
    <div className="sticky top-0 z-50 " >
      <div className="  text-white bg-pink-700 flex justify-start gap-6 p-2 " > 
    
       
      
        {!user  ?  ( 
        <>   
        <NavLink to="/"className={style}> 
          Home
        </NavLink>
          <NavLink to="/signup" className={style}> 
          Signup
        </NavLink>
        <NavLink to="/login" className={style}> 
          Login
        </NavLink>
         
       </> 

       ) :
       
        (
          <>
            <NavLink to="/dashboard"className={style}> 
          Dashboard
        </NavLink>
        <NavLink to="/profiles"className={style}> 
          Profiles
        </NavLink>
        <NavLink to="/register" className={style}> 
          Register
        </NavLink>
        <NavLink to="/connections" className={style}> 
          Connections
        </NavLink>
        <NavLink to="/chat" className={style}> 
        Chat
        </NavLink>
            
          <button
          
            onClick={handleLogout}
           className="hover:text-teal-300"    >
            Logout
          </button>
        <NavLink to="/Account" className={style} > 
          MyAccount
        </NavLink>

      
        
          
       </>
        )}


      </div>
    </div>
  )

}
// export default  Navbar