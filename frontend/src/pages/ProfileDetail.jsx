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
 const senderProfileId =  getActiveProfileId();;

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
    <>
      <div className="flex  flex-col items-center">
        <h1>Detailed Profile</h1>
        <div className=" w-sm my-3  bg-teal-200 p-4   rounded">
          <div>
            {/* <div className="grid grid-cols-3 gap-4">
                {users?.Images?.map((img, index) => (
                  <img key={index} src={img} className="rounded object-cover" />
                ))}
              </div> */}
            {/* <div className="grid grid-cols-3 gap-3">
                {users?.Images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="rounded cursor-pointer object-cover h-32 w-full"
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsOpen(true);
                    }}
                  />
                ))}
              </div> */}
            <div
              className="relative w-full cursor-pointer"
              onClick={() => {
                setCurrentIndex(0);
                setIsOpen(true);
              }}
            >
              <img
                src={users?.Images?.[0]}
                className="rounded w-full h-64 object-cover object-top"
              />

              {users?.Images?.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-sm px-2 py-1 rounded">
                  +{users.Images.length - 1}
                </div>
              )}
            </div>

            {isOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                {/* Close */}
                <button
                  className="absolute top-5 right-6 text-white text-3xl"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>

                {/* Left arrow */}
                <button
                  className="absolute left-6 text-white text-4xl"
                  onClick={() =>
                    setCurrentIndex(
                      (currentIndex - 1 + users.Images.length) %
                        users.Images.length,
                    )
                  }
                ></button>

                {/* Image */}
                <img
                  src={users.Images[currentIndex]}
                  // className="max-h-[15%] max-w-[15%] object-contain"
                  className="h-full max-h-3/4 w-auto object-contain"
                />

                {/* Right arrow */}
                <button
                  className="absolute right-6 text-white text-4xl"
                  onClick={() =>
                    setCurrentIndex((currentIndex + 1) % users.Images.length)
                  }
                ></button>
              </div>
            )}
          </div>
          <div className=" bg-teal-200 p-4 ">
            {/* Left */}
            <div>
              {users.Name} <br />
              {users.Gender}
              <br />
              Age: {users.Age} <br />
              Caste:{users.Caste} <br />
              Income:{users.Income} <br />
              Height: {users.Height_Ft}ft {users.Height_In}in <br />
              Weight: {users.Weight} <br />
            </div>
            {/* Right */}
            <div>
              Caste: {users.Caste} <br />
              Relegion: {users.Relegion}
              <br />
              Education: {users.Education} <br />
              Job_Details: {users.Job_Details} <br />
              Income: {users.Income} <br />
              Martial_Status: {users.Martial_Status} <br />
              Location: {users.Location} <br />
              Contacts: {users.Contacts} <br />
            </div>
          </div>
          <div>
            <button
              onClick={sendRequest}
              className="h-md p-1 m-2  bg-pink-700  text-white rounded"
            >
              Connect Now
            </button>
          </div>
        </div>

        {/* ))}*/}
      </div>
    </>
  );
}

export default ProfileDetail;
