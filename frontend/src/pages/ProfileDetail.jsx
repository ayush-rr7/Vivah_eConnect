import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import useUser from "./Hook/useUser";
import { getActiveProfileId } from "../utils/getActiveProfile";
import { getProfileDetail } from "../api/profileService";
import { connectReq } from "../api/connectionService";

import { useAuth } from "../context/AuthContext";


function ProfileDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { profiles } = useAuth();
  const {id} = useParams();
 const receiverProfileId=id;

//  const senderProfileId = profiles?.[0]?._id;
//  const senderProfileId =  getActiveProfileId();
const { activeProfileId: senderProfileId } = useAuth();

  const [users, setUsers] = useState([]);
 
  const fetchUser = async () => {
    try {
      //     const res = await axios.get(api,{
      //   withCredentials: true
      // });

      const res = await getProfileDetail(id);
      setUsers(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [receiverProfileId]);

  const sendRequest = async (e) => {
    // e.preventDefault();
    try {
      const res = await connectReq(senderProfileId,
receiverProfileId);

      if (!res.data.success) {
        alert(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
   
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-6 px-4 flex justify-center">
    
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">

      {/* 🔹 IMAGE SECTION */}
      <div
        className="relative w-full cursor-pointer"
        onClick={() => {
          setCurrentIndex(0);
          setIsOpen(true);
        }}
      >
        <div className="relative w-full h-100 overflow-hidden rounded-t-2xl">

  {/* 🔹 Blurred background */}
  <img
    src={users?.Images?.[0]}
    className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
  />

  {/* 🔹 Main image (no crop) */}
  <img
    src={users?.Images?.[0]}
    className="relative w-full h-full object-contain"
  />

</div>

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        {/* name */}
        <div className="absolute bottom-4 left-5 text-white">
          <h1 className="text-2xl font-semibold">{users.Name}</h1>
          <p className="text-sm opacity-90">
            {users.Age} yrs • {users.Location}
          </p>
        </div>

        {users?.Images?.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
            +{users.Images.length - 1} Photos
          </div>
        )}
      </div>

      {/* 🔹 MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          
          <button
            className="absolute top-5 right-6 text-white text-3xl"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>

          <button
            className="absolute left-6 text-white text-4xl"
            onClick={() =>
              setCurrentIndex(
                (currentIndex - 1 + users.Images.length) %
                  users.Images.length
              )
            }
          >
            ‹
          </button>

          <img
            src={users.Images[currentIndex]}
            className="max-h-[80%] object-contain"
          />

          <button
            className="absolute right-6 text-white text-4xl"
            onClick={() =>
              setCurrentIndex((currentIndex + 1) % users.Images.length)
            }
          >
            ›
          </button>
        </div>
      )}

      {/* 🔹 INFO SECTION */}
      <div className="p-6 grid md:grid-cols-2 gap-6">

        {/* LEFT */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">Basic Info</h2>

          <p><span className="font-medium">Gender:</span> {users.Gender}</p>
          <p><span className="font-medium">Age:</span> {users.Age}</p>
          <p><span className="font-medium">Height:</span> {users.Height_Ft}ft {users.Height_In}in</p>
          <p><span className="font-medium">Weight:</span> {users.Weight}</p>

          <p>
            <span className="font-medium">Status:</span>{" "}
            <span className="bg-pink-100 text-pink-600 px-2 py-1 rounded-full text-sm">
              {users.Martial_Status}
            </span>
          </p>
        </div>

        {/* RIGHT */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">Professional & Personal</h2>

          <p><span className="font-medium">Religion:</span> {users.Relegion}</p>
          <p><span className="font-medium">Caste:</span> {users.Caste}</p>
          <p><span className="font-medium">Education:</span> {users.Education}</p>
          <p><span className="font-medium">Job:</span> {users.Job_Details}</p>
          <p>
            <span className="font-medium">Income:</span>{" "}
            <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">
              ₹ {users.Income}
            </span>
          </p>
        </div>
      </div>

      {/* 🔹 CONTACT + CTA */}
      <div className="border-t p-6 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* <p className="text-gray-600 text-sm">
          📞 {users.Contacts}
        </p> */}

        <button
          onClick={sendRequest}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow-md transition"
        >
          Connect Now
        </button>
      </div>

    </div>
  </div>

  );
}

export default ProfileDetail;
