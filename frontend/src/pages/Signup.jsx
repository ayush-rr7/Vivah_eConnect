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
  const [formData, setFormData] = useState({
    Name:"",
    City:"",
    Email:"",
    Contact:"",
    Password:"",
    Gender: ""
  });

  
  const handleChange=(e)=>{
   const{name, value}= e.target
    setFormData(prev=>({...prev,[name]:value}));
  }

   const addUser = async (e) => {
    e.preventDefault();

    await signup(formData);

    navigate("/login"); // already logged in
  };
  
  // const  addUser = async (e)=>{
  //   e.preventDefault();

//     try{
//       const res= await axios.post(api,formData);
//       alert(`User ${res.data.name} registered successfully`);
//       if (res.status === 201) {
//   setFormData({
//     Name: "",
//     City:"",
//     Email: "",
//     Contact:"",
//     Password: "",
//     Gender: ""
//   });
// }

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
        <form onSubmit={addUser}>
         
          <input type="text" name ="Name"  placeholder=" full Name" value={formData.Name} onChange= {handleChange} required   className={style}/> <br/>

          <input type="text" name ="City"  placeholder=" City" value={formData.City} onChange= {handleChange} required   className={style}/> <br/>

          <input type="email" name ="Email"  placeholder=" Email" value={formData.Email} onChange= {handleChange} required   className={style}/> <br/>

          <input type="number" name ="Contact"  placeholder=" Contact No" value={formData.Contact} onChange= {handleChange} required   className={style}/> <br/>
          <input type="password" name ="Password"  placeholder=" Password" value={formData.Password} onChange= {handleChange} required   className={style}/> <br/>
         
         <div>
          <p>Gender </p>
          <label>
            <input type="radio"  name="Gender" value="Male" checked={formData.Gender==="Male"} onChange={handleChange}  />
           Male </label>

           <label>
            <input type="radio"  name="Gender" value="Female" checked={formData.Gender==='Female'} onChange={handleChange}/>
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
