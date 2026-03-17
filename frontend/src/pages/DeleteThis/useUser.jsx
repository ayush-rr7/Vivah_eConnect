import { useState, useEffect } from "react";

import axios from 'axios'

function useUser(id){
  const api =`http://localhost:3002/api/user1/${id}`;
 
 

  const [users, setUsers]= useState([]);

  const fetchUser = async ()=>{
  try{
    const res = await axios.get(api,{
  withCredentials: true
});
    console.log(res);
    setUsers(res.data);

  }catch(err){
    console.log(res.data);
  }
 }

 useEffect(()=>{
  fetchUser();
 },[id]);

 return {users};
}

export default useUser;