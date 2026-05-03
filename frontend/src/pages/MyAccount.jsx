import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import profile2 from "../assets/profile2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {SkeletonCard,SkeletonUser} from "../component/skeleton.jsx"

function MyAccount() {


const { user, loading,profiles, activeProfileId, setActiveProfileId } = useAuth();

const handleActiveProfile = (profileId, e) => {
  e.preventDefault();
  setActiveProfileId(profileId);
};

  return (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-6 px-4">

    {/* Header */}
    <h1 className="text-3xl text-center font-semibold text-gray-800 mb-6">
      My Account
    </h1>

    {/* User Info Card */}
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 flex items-center gap-6">

      <img
        src={profile2}
        alt="profile"
        className="h-24 w-24 object-cover rounded-full border-4 border-pink-200"
      />

      {loading ? (
        <SkeletonUser />
      ) : (
        user && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {user.Name}
            </h2>
            <p className="text-gray-600 text-sm">{user.Email}</p>
            <p className="text-gray-500 text-sm">{user.City}</p>

            <Link
              to={`/PartnerPreferences`}
              className="inline-block mt-2 text-pink-600 text-sm hover:underline"
            >
              Edit Partner Preferences →
            </Link>
          </div>
        )
      )}
    </div>

    {/* Profiles Section */}
    <div className="max-w-6xl mx-auto mt-8">

      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Your Profiles
      </h2>

      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-6">

        {loading
          ? Array(6).fill().map((_, i) => <SkeletonCard key={i} />)
          : profiles?.map((u) => (
              <div
                key={u._id}
                className={` w-xs bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1
                ${activeProfileId === u._id ? "ring-2 ring-green-500" : ""}`}
              >

              <Link to={`/profile/${u._id}`}
                    className="flex items-center gap-4 p-1"
                  >
                    {/* Profile Image */}
                    <div className="h-40 w-32 flex-shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={u.Images[0]}
                        alt="profile"
                        className="w-full h-full object-cover object-[center_25%]"
                      />
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 space-y-2 text-sm">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {u.Name}
                      </h3>

                      <p className="text-gray-500">
                        {u.Age} yrs • {u.Gender}
                      </p>

                      <p className="text-gray-600">{u.Caste}</p>

                      <p className="text-green-600 font-medium">
                        ₹ {u.Income}
                      </p>

                      <span className="inline-block bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-xs">
                        {u.Martial_Status}
                      </span>
                    </div>
                  </Link>

                {/* Action Section */}
                <div className="px-4 pb-4">

                  {activeProfileId === u._id ? (
                    <p className="text-green-600 font-semibold text-sm">
                      Active Profile
                    </p>
                  ) : (
                    <button
                      onClick={(e) => handleActiveProfile(u._id, e)}
                      className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm transition"
                    >
                      Set as Active
                    </button>
                  )}

                </div>
              </div>
            ))}
      </div>
    </div>
  </div>
);

}
export default MyAccount;