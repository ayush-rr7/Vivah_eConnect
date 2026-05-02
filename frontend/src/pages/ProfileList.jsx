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
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-6 px-4">
    
    <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
      Discover Profiles
    </h1>

    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6 max-w-6xl mx-auto">

      {loading
        ? Array(6).fill().map((_, i) => <SkeletonCard key={i} />)
        : users.map((u) => (
            <div
              key={u._id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
            >
              <a href={`/profile/${u._id}`}>

                {/* Image Section */}
                <div className="relative">
                  <img
                    src={u.Images[0]}
                    alt="profile"
                    className="h-56 w-full object-cover object-top"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Name + Age on image */}
                  <div className="absolute bottom-2 left-3 text-white">
                    <h2 className="text-lg font-semibold">{u.Name}</h2>
                    <p className="text-sm opacity-90">Age {u.Age}</p>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-4 space-y-2">

                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                      {u.Gender}
                    </span>

                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      {u.Caste}
                    </span>

                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full">
                      ₹ {u.Income}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm">
                    {u.Martial_Status}
                  </p>

                  {/* CTA */}
                  <div className="pt-2">
                    <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">
                      View Profile
                    </button>
                  </div>

                </div>

              </a>
            </div>
          ))}
    </div>
  </div>
);

 }
 export default ProfileList;