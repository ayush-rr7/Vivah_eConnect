 import { useEffect,useState } from "react";
 import api from '../api/axios.js'
 import {getProfiles} from '../api/profileService.js'
//  import SkeletonCard from "../component/skeleton";
 import {SkeletonCard} from "../component/skeleton.jsx"

 function ProfileList(){

//  const api ="http://localhost:3002/api/user1";
  const [users, setUsers]= useState([]);
   const [loading, setLoading] = useState(true);


  const fetchUser = async ()=>{
  try{
    // const res = await axios.get(api/user1) ;
    const res =await getProfiles();
    setUsers(res.data);
    setLoading(false);
   
  }catch(err){
    console.log(err);
  }finally {
      setLoading(false);
    }
 }
 
 useEffect(()=>{

  fetchUser();
 },[]);


 const handleClick=()=>{
  console.log('btn pressed');

 

 };


return (
  <div>
    <h1 className="text-2xl flex justify-center">Profiles</h1>

    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 mx-2">

      {loading
        ? Array(6).fill().map((_, i) => <SkeletonCard key={i} />)
        : users.map((u) => (
            <div
              key={u._id}
              className="bg-teal-200 p-2 hover:shadow-lg hover:scale-102 rounded"
            >
              <a href={`/profile/${u._id}`}>
              <div>
                <img
                  src={u.Images[0]}
                  alt="profile"
                  className="h-40 w-45 object-cover object-top rounded"
                />

                {u.Name} <br />
                {u.Gender} <br />
                Age: {u.Age} <br />
                Caste: {u.Caste} <br />
                Income: {u.Income} <br />
                {u.Martial_Status}
                </div>
              </a>
            </div>
          ))}
    </div>
  </div>
);

 }
 export default ProfileList;