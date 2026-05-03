import { useState, useEffect } from "react";
import axios from "axios";
import {createProfiles}  from "../api/profileService"
import '../index.css'

function CreateProfile() {
  
  const [formData, setFormData] = useState({
    Name: "",
    Age: "",
    Height_Ft: "",
    Height_In: "",
    Weight: "",
    Caste: "",
    Religion: "",
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
          Religion: "",
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

 
  const star = <span className="text-red-500">*</span>;

  return (
    <>
     <div className="min-h-screen bg-pink-50 py-10 px-4">
  {/* Heading */}
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-gray-800">
      User Details
    </h1>
    <p className="text-gray-500 mt-2">
      Complete your profile to get better matrimonial matches
    </p>
  </div>

  {/* Main Card */}
  <div className="flex justify-center">
    <div className="w-full max-w-5xl bg-white shadow-xl rounded-3xl p-8 md:p-10">
      <form onSubmit={addUser}>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT SECTION */}
          <div>

            <label className="block font-medium mb-2">
              Name {star}
            </label>
            <input
              type="text"
              name="Name"
              placeholder="Enter Your Name"
              value={formData.Name}
              onChange={handleChange}
              required
              className="input-field"
            />

            <label className="block font-medium mt-4 mb-2">
              Age {star}
            </label>
            <input
              type="number"
              name="Age"
              placeholder="Enter Your Age"
              value={formData.Age}
              onChange={handleChange}
              required
              className="input-field"
            />

            <label className="block font-medium mt-4 mb-2">
              Location {star}
            </label>
            <input
              type="text"
              name="Location"
              placeholder="Enter Your Location"
              value={formData.Location}
              onChange={handleChange}
              className="input-field"
            />

            <label className="block font-medium mt-4 mb-2">
              Contact {star}
            </label>
            <input
              type="number"
              name="Contacts"
              placeholder="Enter Your Contact Number"
              value={formData.Contacts}
              onChange={handleChange}
              className="input-field"
            />

            <label className="block font-medium mt-4 mb-2">
              Weight
            </label>
            <input
              type="number"
              name="Weight"
              placeholder="Enter Weight in KG"
              value={formData.Weight}
              onChange={handleChange}
              className="input-field"
            />

            {/* Height */}
            <label className="block font-medium mt-4 mb-2">
              Height
            </label>

            <div className="flex gap-3 items-center">
              <input
                type="number"
                name="Height_Ft"
                placeholder="Feet"
                value={formData.Height_Ft}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <span className="text-gray-600 font-medium">
                ft
              </span>

              <input
                type="number"
                name="Height_In"
                placeholder="Inch"
                value={formData.Height_In}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />

              <span className="text-gray-600 font-medium">
                in
              </span>
                          </div>
              {/* Image Upload */}
              <div className="mt-4">
                <label className="block font-medium mb-2">
                  Upload Images {star}
                </label>

              <input
                type="file"
                name="Images"
                id="fileInput"
                onChange={handleFileChange}
                accept="image/*"
                multiple
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white 
                text-gray-600 file:mr-4 file:py-2 file:px-4 
                file:rounded-lg file:border-0 
                file:bg-pink-600 file:text-white 
                hover:file:bg-pink-700 cursor-pointer"
              />

              <p className="text-sm text-gray-500 mt-2">
                Upload JPG, PNG, or JPEG files
              </p>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div>

            <label className="block font-medium mb-2">
              Education {star}
            </label>
            <input
              type="text"
              name="Education"
              placeholder="Enter Your Education"
              value={formData.Education}
              onChange={handleChange}
              className="input-field"
            />

            <label className="block font-medium mt-4 mb-2">
              Job Details
            </label>
            <input
              type="text"
              name="Job_Details"
              placeholder="Enter Your Job Details"
              value={formData.Job_Details}
              onChange={handleChange}
              className="input-field"
            />

            <label className="block font-medium mt-4 mb-2">
              Income
            </label>
            <input
              type="number"
              name="Income"
              placeholder="Monthly Income"
              value={formData.Income}
              onChange={handleChange}
              className="input-field"
            />

            <label className="block font-medium mt-4 mb-2">
              Religion
            </label>
            <select
              name="Religion"
              value={formData.Religion}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select Religion</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Sikh">Sikh</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Christian">Christian</option>
            </select>

            <label className="block font-medium mt-4 mb-2">
              Caste
            </label>
            <input
              type="text"
              name="Caste"
              placeholder="Enter Your Caste"
              value={formData.Caste}
              onChange={handleChange}
              className="input-field"
            />

            {/* Gender */}
            <div className="mt-6">
              <p className="font-medium mb-3">
                Gender {star}
              </p>

              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="Gender"
                    value="male"
                    checked={formData.Gender === "male"}
                    onChange={handleChange}
                  />
                  Male
                </label>

                <label className="flex items-center gap-2">
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
            </div>

            {/* Marital Status */}
            <div className="mt-6">
              <p className="font-medium mb-3">
                Marital Status {star}
              </p>

              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="Martial_Status"
                    value="Never Married"
                    checked={formData.Martial_Status === "Never Married"}
                    onChange={handleChange}
                  />
                  Never Married
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="Martial_Status"
                    value="Divorce"
                    checked={formData.Martial_Status === "Divorce"}
                    onChange={handleChange}
                  />
                  Divorce
                </label>

                <label className="flex items-center gap-2">
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

        {/* Terms */}
        <div className="mt-8">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="Terms"
              required
            />
            <span>
              I agree to the Terms & Conditions {star}
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="primary-btn"
          >
            Submit Profile
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
    </>
  );
}

export default CreateProfile;
