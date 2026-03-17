import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import profile2 from "../assets/profile2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {SkeletonCard,SkeletonUser} from "../component/skeleton.jsx"

function MyAccount() {

   const { user, profiles,loading } = useAuth();
    const [activeProfileId, setActiveProfileId] = useState(
  localStorage.getItem("activeProfileId")
  );
 
  useEffect(() => {
  if (!activeProfileId && profiles?.length) {
    setActiveProfileId(profiles[0]._id);
    localStorage.setItem("activeProfileId", profiles[0]._id);
  }
}, [profiles]);

const handleActiveProfile = (profileId, e) => {
  e.preventDefault(); // ❗ prevents <a> navigation

  localStorage.setItem("activeProfileId", profileId);
  setActiveProfileId(profileId);
};

  return (
  <div>
    <h1 className="text-2xl text-center p-2">My Account Details</h1>

  <div className="flex justify-center mt-4">
  <img
    src={profile2}
    alt="profile"
    className="h-32 w-32 object-cover rounded-full border-2 border-gray-300"
  />
</div>

    {/* User Info Section */}
    <div className="flex justify-center">
      {loading ? (
        <SkeletonUser />
      ) : (
        user && (
          <div className="w-md text-xl p-4">
            <h2 className="text-2xl font-semibold mb-2">
              Welcome {user.Name}
            </h2>

            <p>Email: {user.Email}</p>
            <p>City: {user.City}</p>
          </div>
        )
      )}
    </div>

    {/* Profiles Grid */}
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 p-4">
      {loading
        ? Array(6).fill().map((_, i) => <SkeletonCard key={i} />)
        : profiles?.map((u) => (
  <div
    key={u._id}
    className={`bg-teal-200 p-2 hover:shadow-lg hover:scale-105 transition rounded w-xs 
    ${activeProfileId === u._id ? "border-4 border-green-500" : ""}`}
  >
   <Link to={`/profile/${u._id}`}>
      <img
        src={u.Images[0]}
        alt="profile"
        className="h-20 w-25 object-cover object-top rounded"
      />

      <div className="mt-2 text-sm">
        <p>{u.Name}</p>
        <p>{u.Gender}</p>
        <p>Age: {u.Age}</p>
        <p>Caste: {u.Caste}</p>
        <p>Income: {u.Income}</p>
        <p>{u.Martial_Status}</p>
      </div>

      {/* ✅ Active / Set Active UI */}

      {activeProfileId === u._id ? (
        <p className="text-green-700 font-semibold mt-2">
          ✅ Active Profile
        </p>
      ) : (
        <button
          onClick={(e) => handleActiveProfile(u._id, e)}
          className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
        >
          Set Active
        </button>
      )}
      </Link> 
   
  </div>
)) }
    </div>
  </div>
);
}
export default MyAccount;