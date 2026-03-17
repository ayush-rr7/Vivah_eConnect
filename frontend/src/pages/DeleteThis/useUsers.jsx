import { useState, useEffect } from "react";

import axios from 'axios'

function Hooks(){
 const api ="http://localhost:3002/api/user1";
 
  const [users, setUsers]= useState([]);
  const fetchUser = async ()=>{
  try{
    const res = await axios.get(api,{
  withCredentials: true
}) ;
    setUsers(res.data);

  }catch(err){
    console.log(res.data);
  }
 }

 useEffect(()=>{
  fetchUser();
 },[]);

 return {users};
}

export default Hooks;