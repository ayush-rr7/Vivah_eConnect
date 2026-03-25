import { useState,useEffect } from 'react'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
// import './App.css'

function Register() {
 const { signup } = useAuth();
 const navigate = useNavigate();
//  console.log(signup);
  // const api ="http://localhost:3002/auth/signup";
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name:"",
    city:"",
    email:"",
    contact:"",
    password:"",
    gender: ""
  });

  
  const handleChange=(e)=>{
   const{name, value}= e.target
    setFormData(prev=>({...prev,[name]:value}));
  }

   const addUser = async (e) => {
    e.preventDefault();
try{
   const res= await signup(formData);
// console.log(res);
    navigate("/login"); // already logged in
  } 
  catch (err){
     if (err.response && err.response.data.errors) {
    setErrors(err.response.data.errors);
  }
    // console.log("J");
    //   console.log(err.response.data.errors);
    }
   }
  
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
        
          {errors.map((err, index) => (
            <ul key={index} className="text-red-600 flex flex-col">
            <li> {err.msg}</li>
            </ul>
          ))}
        <form onSubmit={addUser}>
         
          <input type="text" name ="name"  placeholder=" full name" value={formData.name} onChange= {handleChange} required   className={style}/> <br/>

          <input type="text" name ="city"  placeholder=" city" value={formData.city} onChange= {handleChange} required   className={style}/> <br/>

          <input type="email" name ="email"  placeholder=" email" value={formData.email} onChange= {handleChange} required   className={style}/> <br/>

          <input type="number" name ="contact"  placeholder=" contact No" value={formData.contact} onChange= {handleChange} required   className={style}/> <br/>
          <input type="password" name ="password"  placeholder=" password" value={formData.password} onChange= {handleChange} required   className={style}/> <br/>
         
         <div>
          <p>gender </p>
          <label>
            <input type="radio"  name="gender" value="Male" checked={formData.gender==="Male"} onChange={handleChange}  />
           Male </label>

           <label>
            <input type="radio"  name="gender" value="Female" checked={formData.gender==='Female'} onChange={handleChange}/>
           Female </label>
           </div>
          
        <input 
          type="checkbox" 
          name="Terms" 
          // checked={formData.Terms} 
          // onChange={handleChange}
        />
      <label>I agree to the terms and condition </label><br/>
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

export default Register
