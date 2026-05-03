import { useState, useEffect } from "react";
import axios from "axios";
import { createProfiles,getProfileDetail,editProfiles } from "../api/profileService";
import { useParams, useNavigate } from "react-router-dom";
import "../index.css";

function CreateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;

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

  const [selectedFile, setSelectedFile] = useState([]);

  // ---------------- FETCH PROFILE (EDIT MODE) ----------------
  useEffect(() => {
    if (!isEditMode) return;

    const fetchProfile = async () => {
      try {
          const res = await getProfileDetail(id);
           
        const data = res.data;

        setFormData({
          Name: data.Name || "",
          Age: data.Age || "",
          Height_Ft: data.Height_Ft || "",
          Height_In: data.Height_In || "",
          Weight: data.Weight || "",
          Caste: data.Caste || "",
          Religion: data.Religion || "",
          Education: data.Education || "",
          Job_Details: data.Job_Details || "",
          Income: data.Income || "",
          Location: data.Location || "",
          Contacts: data.Contacts || "",
          Gender: data.Gender || "",
          Martial_Status: data.Martial_Status || "",
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetchProfile();
  }, [id]);

  // ---------------- HANDLE INPUT ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- HANDLE FILE ----------------
  const handleFileChange = (e) => {
    setSelectedFile((prev) => [...prev, ...e.target.files]);
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = new FormData();

      Object.keys(formData).forEach((key) => {
        userData.append(key, formData[key]);
      });

      selectedFile.forEach((file) => {
        userData.append("imageURL", file);
      });

      let res;

      if (isEditMode) {
        res = await editProfiles(id,userData);
      } else {
        res = await createProfiles(userData);
      }

      alert(
        `User ${res.data.Name} ${
          isEditMode ? "updated" : "created"
        } successfully`
      );

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const star = <span className="text-red-500">*</span>;

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? "Edit Profile" : "Create Profile"}
        </h1>
        <p className="text-gray-500 mt-2">
          Complete your profile to get better matches
        </p>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-5xl bg-white shadow-xl rounded-3xl p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* LEFT */}
              <div>
                <label>Name {star}</label>
                <input name="Name" value={formData.Name} onChange={handleChange} required className="input-field"/>

                <label className="mt-4">Age {star}</label>
                <input type="number" name="Age" value={formData.Age} onChange={handleChange} required className="input-field"/>

                <label className="mt-4">Location</label>
                <input name="Location" value={formData.Location} onChange={handleChange} className="input-field"/>

                <label className="mt-4">Contact</label>
                <input name="Contacts" value={formData.Contacts} onChange={handleChange} className="input-field"/>

                <label className="mt-4">Height</label>
                <div className="flex gap-2">
                  <input name="Height_Ft" placeholder="Ft" value={formData.Height_Ft} onChange={handleChange} className="input-field"/>
                  <input name="Height_In" placeholder="In" value={formData.Height_In} onChange={handleChange} className="input-field"/>
                </div>

                {/* Images */}
                <label className="mt-4">Upload Images</label>
                <input type="file" multiple onChange={handleFileChange} className="input-field"/>
              </div>

              {/* RIGHT */}
              <div>
                <label>Education</label>
                <input name="Education" value={formData.Education} onChange={handleChange} className="input-field"/>

                <label className="mt-4">Income</label>
                <input name="Income" value={formData.Income} onChange={handleChange} className="input-field"/>

                <label className="mt-4">Religion</label>
                <select name="Religion" value={formData.Religion} onChange={handleChange} className="input-field">
                  <option value="">Select</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                </select>

                {/* Gender */}
                <div className="mt-4">
                  <p>Gender {star}</p>
                  <label>
                    <input type="radio" name="Gender" value="male"
                      checked={formData.Gender === "male"} onChange={handleChange}/> Male
                  </label>
                  <label className="ml-4">
                    <input type="radio" name="Gender" value="female"
                      checked={formData.Gender === "female"} onChange={handleChange}/> Female
                  </label>
                </div>

                {/* Marital Status */}
                <div className="mt-4">
                  <p>Marital Status</p>
                  <input type="radio" name="Martial_Status" value="Never Married"
                    checked={formData.Martial_Status === "Never Married"} onChange={handleChange}/> Never Married
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="text-center mt-6">
              <button className="primary-btn">
                {isEditMode ? "Update Profile" : "Create Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProfile;