import { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {getProfiles} from '../api/profileService.js'
function Dashboard() {
const {user,logout} =useAuth();
const navigate = useNavigate();



const [profiles, setProfiles] = useState([]);

useEffect(() => {
  const fetchProfiles = async () => {
    try {
      const res =await getProfiles();
      setProfiles(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchProfiles();
}, []);

const handleMatches = () => {
  navigate("/matches");
};

const handleConnections = () => {
  navigate("/connections");
};

const handleChat = () => {
  navigate("/chat");
};

const handleProfile = () => {
  navigate("/Account");
};


  
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };
 

return (
<div className="min-h-screen bg-pink-50 flex">

{/* Sidebar */}

<div className="w-64 bg-white shadow-lg p-6">

<h2 className="text-2xl font-bold text-pink-600 mb-8">
Vivah E-Connect
</h2>

<ul className="space-y-4">

<li>
<button
className="w-full text-left hover:text-pink-600"
onClick={() => navigate("/dashboard")}
>
Dashboard
</button>
</li>

<li>
<button
className="w-full text-left hover:text-pink-600"
onClick={handleMatches}
>
Profiles
</button>
</li>

<li>
<button
className="w-full text-left hover:text-pink-600"
onClick={handleConnections}
>
Connections
</button>
</li>

<li>
<button
className="w-full text-left hover:text-pink-600"
onClick={handleChat}
>
Chat
</button>
</li>

<li>
<button
className="w-full text-left hover:text-pink-600"
onClick={handleProfile}
>
MyAccount
</button>
</li>

<li>
<button
className="w-full text-left text-red-500"
onClick={handleLogout}
>
Logout
</button>
</li>

</ul>

</div>


{/* Main Content */}

<div className="flex-1 p-10">

<h1 className="text-3xl font-bold mb-6">
Welcome Back
</h1>


{/* Quick Stats */}

{/* Discover Profiles */}
<div className="bg-white p-6 rounded-xl shadow mb-10">

  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">
      Discover Profiles
    </h2>

    <button
      onClick={handleMatches}
      className="text-sm text-pink-600 hover:underline"
    >
      View All →
    </button>
  </div>

  {profiles.length === 0 ? (
    <p className="text-sm text-gray-500">
      No profiles available
    </p>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {profiles.slice(0, 4).map((p) => (
        <div
          key={p._id}
          className="bg-pink-50 rounded-lg p-3 hover:shadow transition"
        >
          <img
            src={p.Images?.[0]}
            className="h-40 w-full object-cover object-[center_20%] rounded-md mb-2 "
          />

          <h3 className="text-sm font-semibold">
            {p.Name}
          </h3>

          <p className="text-xs text-gray-500">
            {p.Location}
          </p>

          <button
            onClick={() => navigate(`/profile/${p._id}`)}
            className="mt-2 text-xs text-pink-600 hover:underline"
          >
            View Profile
          </button>
        </div>
      ))}
    </div>
  )}
</div>

{/* Action Cards */}

<div className="grid md:grid-cols-3 gap-8">

<div className="bg-white p-6 shadow rounded-lg text-center">

<h3 className="text-xl font-semibold mb-2">
Find Matches
</h3>

<p className="text-gray-500 mb-4">
Discover compatible profiles.
</p>

<button
className="bg-pink-600 text-white px-4 py-2 rounded"
onClick={handleMatches}
>
Explore
</button>

</div>


<div className="bg-white p-6 shadow rounded-lg text-center">

<h3 className="text-xl font-semibold mb-2">
View Connections
</h3>

<p className="text-gray-500 mb-4">
Manage your connection requests.
</p>

<button
className="bg-pink-600 text-white px-4 py-2 rounded"
onClick={handleConnections}
>
Open
</button>

</div>


<div className="bg-white p-6 shadow rounded-lg text-center">

<h3 className="text-xl font-semibold mb-2">
Start Chatting
</h3>

<p className="text-gray-500 mb-4">
Talk with your connections.
</p>

<button
className="bg-pink-600 text-white px-4 py-2 rounded"
onClick={handleChat}
>
Chat
</button>

</div>

</div>

</div>

</div>
);
}

export default Dashboard;