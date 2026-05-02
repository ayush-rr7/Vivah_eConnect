
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
const {user,logout} =useAuth();
const navigate = useNavigate();

const handleMatches = () => {
  navigate("/profiles");
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

<div className="grid grid-cols-3 gap-6 mb-10">

<div className="bg-white p-6 rounded-lg shadow text-center">
<h3 className="text-xl font-semibold">12</h3>
<p className="text-gray-500">Matches</p>
</div>

<div className="bg-white p-6 rounded-lg shadow text-center">
<h3 className="text-xl font-semibold">5</h3>
<p className="text-gray-500">Pending Requests</p>
</div>

<div className="bg-white p-6 rounded-lg shadow text-center">
<h3 className="text-xl font-semibold">3</h3>
<p className="text-gray-500">Messages</p>
</div>

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