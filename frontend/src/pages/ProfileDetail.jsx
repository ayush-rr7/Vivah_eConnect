import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfileDetail } from "../api/profileService";
import { connectReq } from "../api/connectionService";
import { useAuth } from "../context/AuthContext";

function ProfileDetail() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [users, setUsers] = useState([]);

  const { id } = useParams();
  const receiverProfileId = id;

  const { activeProfileId: senderProfileId } = useAuth();

  const fetchUser = async () => {
    try {
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

  const sendRequest = async () => {
    try {
      const res = await connectReq(
        senderProfileId,
        receiverProfileId
      );
alert(res.data.message); 
      // if (!res.data.success) {
      //   alert(res.data.message);
      // }
    } catch (err) {
      console.log(err);
        alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 p-6 flex justify-center">
      <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[700px]">

          {/* ================================= */}
          {/* LEFT VERTICAL CONTAINER - IMAGE */}
          {/* ================================= */}
          <div className="relative bg-gray-100 flex flex-col">

            <div
              className="relative flex-1 cursor-pointer mx-"
              onClick={() => {
                setCurrentIndex(0);
                setIsOpen(true);
              }}
            >
              {/* blurred background */}
              <img
                src={users?.Images?.[0]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-md scale-100"
              />

              {/* main image */}
              <img
                src={users?.Images?.[0]}
                alt=""
                className="relative w-full h-full object-contain z-10"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-20"></div>

              {/* name */}
              <div className="absolute bottom-6 left-6 text-white z-30">
                <h1 className="text-3xl font-bold">{users.Name}</h1>
                <p className="text-sm opacity-90 mt-1">
                  {users.Age} yrs • {users.Location}
                </p>
              </div>

              {/* photo count */}
              {users?.Images?.length > 1 && (
                <div className="absolute bottom-6 right-6 bg-black/70 text-white px-4 py-2 rounded-lg text-sm z-30">
                  +{users.Images.length - 1} Photos
                </div>
              )}
            </div>
          </div>

          {/* ================================= */}
          {/* RIGHT SIDE */}
          {/* 2 HORIZONTAL CONTAINERS */}
          {/* ================================= */}
          <div className="lg:col-span-2 flex flex-col">

            {/* TOP RIGHT CONTAINER */}
            <div className="p-8 border-b">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Basic Information
              </h2>

              <div className="grid md:grid-cols-2 gap-5">
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {users.Gender}
                </p>

                <p>
                  <span className="font-semibold">Age:</span>{" "}
                  {users.Age}
                </p>

                <p>
                  <span className="font-semibold">Height:</span>{" "}
                  {users.Height_Ft} ft {users.Height_In} in
                </p>

                <p>
                  <span className="font-semibold">Weight:</span>{" "}
                  {users.Weight}
                </p>

                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                    {users.Martial_Status}
                  </span>
                </p>

                <p>
                  <span className="font-semibold">Religion:</span>{" "}
                  {users.Religion}
                </p>
              </div>
            </div>

            {/* BOTTOM RIGHT CONTAINER */}
            <div className="p-8 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Professional & Personal Details
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <p>
                    <span className="font-semibold">Caste:</span>{" "}
                    {users.Caste}
                  </p>

                  <p>
                    <span className="font-semibold">Education:</span>{" "}
                    {users.Education}
                  </p>

                  <p>
                    <span className="font-semibold">Job:</span>{" "}
                    {users.Job_Details}
                  </p>

                  <p>
                    <span className="font-semibold">Income:</span>{" "}
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                      ₹ {users.Income}
                    </span>
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-10">
                <button
                  onClick={sendRequest}
                  className="w-full md:w-auto bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-xl shadow-md transition duration-300"
                >
                  Connect Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* IMAGE MODAL */}
        {/* ================================= */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

            <button
              className="absolute top-5 right-6 text-white text-4xl"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            <button
              className="absolute left-6 text-white text-5xl"
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
              alt=""
              className="max-h-[85%] object-contain"
            />

            <button
              className="absolute right-6 text-white text-5xl"
              onClick={() =>
                setCurrentIndex(
                  (currentIndex + 1) % users.Images.length
                )
              }
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDetail;