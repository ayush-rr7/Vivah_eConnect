import { useState, useEffect } from "react";
import axios from "axios";
import {createProfiles}  from "../api/profileService"
// import './App.css'

function CreateProfile() {
  // const api = "http://localhost:3002/api/user";
  const [formData, setFormData] = useState({
    Name: "",
    Age: "",
    Height_Ft: "",
    Height_In: "",
    Weight: "",
    Caste: "",
    Relegion: "",
    Education: "",
    Job_Details: "",
    Income: "",
    Location: "",
    Contacts: "",
    Gender: "",
    Martial_Status: "",
  
  });
  // State for file
  const [selectedFile, setSelectedFile] = useState([]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Handle file input changes
  const handleFileChange = (e) => {
    setSelectedFile((prev) => [...prev, ...e.target.files]);
  };
  

  const addUser = async (e) => {
    e.preventDefault();

    try {

      const userData = new FormData();
      // Append text fields
      Object.keys(formData).forEach((key) => {
        userData.append(key, formData[key]);
      });

      // Append file
      // userData.append("imageURL", selectedFile);
       selectedFile.forEach((file) => {
      userData.append("imageURL",file); // SAME FIELD NAME
      });

//       const res = await axios.post(api,userData,{
//   withCredentials: true
// } );
      
const res= await createProfiles(userData);
console.log(userData);
      alert(` User ${res.data.Name} data saved sucessfully`)
      if (res.status === 201) {
        setFormData({
          Name: "",
          Age: "",
          Height_Ft: "",
          Height_In: "",
          Weight: "",
          Caste: "",
          Relegion: "",
          Education: "",
          Job_Details: "",
          Income: "",
          Location: "",
          Contacts: "",
          Gender: "",
          Martial_Status: "",
          Images: []
        });
         setSelectedFile([]);
        document.getElementById("fileInput").value = null; // Reset file input
      
      }
    } catch (err) {
      console.log(err.message);
    }

    
    
  };

  const inputStyle =
   "w-full px-4 py-2.5  mb-4  border border-gray-300  rounded-lg  text-sm  outline-none  transition-all duration-200  focus:border-blue-500  focus:ring-2 focus:ring-blue-100 hover:border-gray-400  shadow-sm";


  return (
    <>
      {/* <div className=" min-h-screen"> */}
      <div className="   ">
        <h1 className="text-2xl flex justify-center">User Detail</h1>
      </div>
      <div className="flex justify-center">
        <div className="h-min w-2xl my-10 p-4 flex justify-center shadow-xl">
          <form onSubmit={addUser}>
            <div className="flex flex-row">
              {/* Left DIV */}
              <div>
                <input
                  type="text"
                  name="Name"
                  placeholder="Enter Your Name"
                  value={formData.Name}
                  onChange={handleChange}
                  // required
                  className={inputStyle}
                />
                <br />
                <input
                  type="number"
                  name="Age"
                  placeholder="Enter Your Age"
                  value={formData.Age}
                  onChange={handleChange}
                  // required
                  className={inputStyle}
                />{" "}
                <br />
                <input
                  type="number"
                  name="Weight"
                  placeholder="Enter Your  Weight in KG"
                  value={formData.Weight}
                  onChange={handleChange}
                  // required
                  className={inputStyle}
                />
                <br />
                <input
                  type="text"
                  name="Location"
                  placeholder="Enter Your Location"
                  value={formData.Location}
                  onChange={handleChange}
                  className={inputStyle}
                />
                <br />
                <input
                  type="number"
                  name="Contacts"
                  placeholder="Enter Your Contacts"
                  value={formData.Contacts}
                  onChange={handleChange}
                  className={inputStyle}
                />
                <br />
                <div
                  className="  w-full mb-4  
               flex justify-evenly
              "
                >
                  <input
                    type="number"
                    name="Height_Ft"
                    placeholder="Height"
                    value={formData.Height_Ft}
                    onChange={handleChange}
                    // required
                    className="w-18  py-1.5 px-1 rounded  border border-gray-300    text-sm  outline-none  transition-all duration-200  focus:border-blue-500  focus:ring-2 focus:ring-blue-100 hover:border-gray-400   flex justify-evenly"
                  />

                  <h1 className="block py-1.5">feet</h1>
                  <input
                    type="number"
                    name="Height_In"
                    placeholder="Height"
                    value={formData.Height_In}
                    onChange={handleChange}
                    // required
                    className="w-18  py-1.5 px-1 rounded border border-gray-300   text-sm  outline-none  transition-all duration-200  focus:border-blue-500  focus:ring-2 focus:ring-blue-100 hover:border-gray-400   flex justify-evenly "
                  />

                  <h2 className="inline py-1.5">inch</h2>
                </div>
                 <label className="block text-blue-600 mb-1 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              name="Images"
              // value={formData.imageURL}
              id="fileInput"
              onChange={handleFileChange}
              accept="image/*"
              multiple   
              // required
              className="w-full text-blue-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
              </div>

              {/* Right div */}
              <div className="mx-8">
                <input
                  type="text"
                  name="Education"
                  placeholder="Enter Your Education"
                  value={formData.Education}
                  onChange={handleChange}
                  // required
                  className=" w-full px-4 py-2.5  mb-4  border border-gray-300  rounded-lg  text-sm  outline-none  transition-all duration-200  focus:border-blue-500  focus:ring-2 focus:ring-blue-100 hover:border-gray-400  shadow-sm"
                />
                <br />
                <input
                  type="text"
                  name="Job_Details"
                  placeholder="Enter Your Job_Details"
                  value={formData.Job_Details}
                  onChange={handleChange}
                  className={inputStyle}
                />
                <br />
                <input
                  type="number"
                  name="Income"
                  placeholder="Enter Your Income  per month"
                  value={formData.Income}
                  onChange={handleChange}
                  className={inputStyle}
                />
                <br />

                <select 
                name="Relegion"            
                  value={formData.Relegion}
                  onChange={handleChange}
                  className={inputStyle}>
                  {/* <label>Religion</label> */}
                  <option value="">Select Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Buddhism">Buddhism</option>
                  <option value="Christian">Christian</option>
                </select>
                <br />
                <input
                  type="text"
                  name="Caste"
                  placeholder="Enter Your Caste "
                  value={formData.Caste}
                  onChange={handleChange}
                  // required
                  className={inputStyle}
                />
                <br />

                {/* 3rd div */}
                <div>
                  <div className="flex gap-2">
                    <p> Gender :</p>
                    <label>
                      <input
                        type="radio"
                        name="Gender"
                        value="male"
                        checked={formData.Gender === "male"}
                        onChange={handleChange}
                      />
                      male
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="Gender"
                        value="female"
                        checked={formData.Gender === "female"}
                        onChange={handleChange}
                      />
                      Female
                    </label>
                  </div>
                  <br />

                  <p>Martial Status : </p>
                  <div className="flex gap-2">
                    <label>
                      <input
                        type="radio"
                        name="Martial_Status"
                        value="Unmarried"
                        checked={formData.Martial_Status === "Unmarried"}
                        onChange={handleChange}
                      />
                      Unmarried
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="Martial_Status"
                        value="Divorce"
                        checked={formData.Martial_Status === "Divorce"}
                        onChange={handleChange}
                      />
                      Divorce
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="Martial_Status"
                        value="Widow"
                        checked={formData.Martial_Status === "Widow"}
                        onChange={handleChange}
                      />
                      Widow
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Div */}
           

            <input
              type="checkbox"
              name="Terms"
              // checked={formData.Terms}
              // onChange={handleChange}
            />
            <label>I agree to the terms and condition </label>
            <br />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-red-600 text-white rounded w-1/2  p-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default CreateProfile;
