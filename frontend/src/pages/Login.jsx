import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// import './App.css'

function Login() {
   const { login } = useAuth();
    const navigate = useNavigate();
const [formData, setFormData] = useState({
    Email:"",
    Password:"",
  });
  
  const handleChange=(e)=>{
   const{name, value}= e.target
    setFormData(prev=>({...prev,[name]:value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();


    await login(formData);   // ✅ NOT axios
    navigate("/dashboard");
  };
//   const api ="http://localhost:3002/auth/login";  
//   const navigate = useNavigate();

//   const  loginUser = async (e)=>{
//     e.preventDefault();

//     try{
//       const res= await axios.post(api,formData,{
//   withCredentials: true
// });
     
//       if (res.data.success) {
//         alert("Login successful");
//           navigate("/");
//         }
//         console.log(res.data);

//     }
//     catch (err){
//       console.log(err.message);
//     }
//     console.log(formData);
//   }




  const  style="border p-2 w-full mb-3 rounded hover:scale-102 ";
  const styleBtn="bg-red-600 text-white rounded w-1/2  p-2 hover:scale-102"


 
  return (
    <>
      
{/* <div className=" min-h-screen"> */}
  <div className="   ">
       <h1 className="text-2xl flex justify-center">Matrimonial Site</h1>
      </div>
       <div className="flex justify-center">
      <div className="h-min w-lg my-10 p-4 flex justify-center shadow-xl">
        <form onSubmit={handleSubmit}>
         
        

          <input type="email" name ="Email"  placeholder=" Email" value={formData.Email} onChange= {handleChange} required   className={style}/> <br/>

          {/* <input type="number" name ="Contact"  placeholder=" Contact No" value={formData.Contact} onChange= {handleChange} required   className={style}/> <br/> */}
          <input type="password" name ="Password"  placeholder=" Password" value={formData.Password} onChange= {handleChange} required   className={style}/> <br/>
         
         
          
    <div className="flex justify-center">
      <button type="submit" className={styleBtn}> Submit</button>
      </div>
       
        </form>
      </div>
        </div>
      {/* </div> */}

      
  
     
    </>
  )
}

export default Login;
