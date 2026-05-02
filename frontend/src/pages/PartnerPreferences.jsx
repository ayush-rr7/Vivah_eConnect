import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { getActiveProfileId } from "../utils/getActiveProfile";
import { useAuth } from "../context/AuthContext";

// const { activeProfileId } = useAuth();


const PartnerPreference = () => {

  const { activeProfileId: profileId } = useAuth();
  console.log(profileId);
  const [formData, setFormData] = useState({
    ageMin: "",
    ageMax: "",
    incomeMin: "",
    incomeMax: "",
    heightMin: "",
    heightMax: "",
    religion: "",
    caste: "",
    education: [],
    location: "",
    maritalStatus: "",
  });

  const labelStyle =
    "block font-semibold text-gray-700 mb-3 text-sm md:text-base";


  // ---------------- HANDLE INPUT ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        education: [...formData.education, value],
      });
    } else {
      setFormData({
        ...formData,
        education: formData.education.filter((item) => item !== value),
      });
    }
  };

 
 // ---------------- SAVE / UPDATE ----------------
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.put(
      `/api/pref/${profileId}`,
      formData
    );

    alert("Preferences saved successfully!");
    console.log(res.data);
  } catch (err) {
    console.log(err);
    alert("Error saving preferences");
  }
};
// ---------------- FETCH EXISTING DATA ----------------
useEffect(() => {
  fetchPreferences();
}, [profileId]);

const fetchPreferences = async () => {
  try {
       const res = await api.get(`/api/pref/${profileId}`);

    setFormData({
      ageMin: "",
  ageMax: "",
  incomeMin: "",
  incomeMax: "",
  heightMin: "",
  heightMax: "",
  religion: "",
  caste: "",
  location: "",
  maritalStatus: "",
      ...res.data?.preferences,
       education: res.data?.preferences?.education || [],
    });
  } catch (err) {
    console.log(err);
  }
};
  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">

        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800">
            Partner Preferences
          </h1>
          <p className="text-gray-500 mt-3">
            Set your ideal partner preferences
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">

          {/* AGE */}
          <div>
            <label className={labelStyle}>Preferred Age Range</label>
            <div className="flex gap-4">
              <input
                type="number"
                name="ageMin"
                value={formData.ageMin}
                onChange={handleChange}
                className="input-field"
                placeholder="Min"
              />
              <input
                type="number"
                name="ageMax"
                value={formData.ageMax}
                onChange={handleChange}
                className="input-field"
                placeholder="Max"
              />
            </div>
          </div>

          {/* INCOME */}
          <div>
            <label className={labelStyle}>Preferred Income Range</label>
            <div className="flex gap-4">
              <input
                type="number"
                name="incomeMin"
                value={formData.incomeMin}
                onChange={handleChange}
                className="input-field"
                placeholder="Min"
              />
              <input
                type="number"
                name="incomeMax"
                value={formData.incomeMax}
                onChange={handleChange}
                className="input-field"
                placeholder="Max"
              />
            </div>
          </div>

          {/* HEIGHT */}
          <div>
            <label className={labelStyle}>Preferred Height Range</label>
            <div className="flex gap-4">

              <select
                name="heightMin"
                value={formData.heightMin}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Min</option>
                <option>4'6"</option>
                <option>4'8"</option>
                <option>4'10"</option>
                <option>5'0"</option>
                <option>5'2"</option>
                <option>5'4"</option>
                <option>5'6"</option>
                <option>5'8"</option>
                <option>6'0"</option>
              </select>

              <select
                name="heightMax"
                value={formData.heightMax}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Max</option>
                <option>5'0"</option>
                <option>5'2"</option>
                <option>5'4"</option>
                <option>5'6"</option>
                <option>5'8"</option>
                <option>6'0"</option>
                <option>6'2"</option>
                <option>6'4"</option>                
                <option>6'6"</option>                
              </select>

            </div>
          </div>

          {/* RELIGION */}
          <div>
            <label className={labelStyle}>Preferred Religion</label>
            <select
              name="religion"
              value={formData.religion}
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
          </div>

          {/* CASTE */}
          <div>
            <label className={labelStyle}>Preferred Caste</label>
            <input
              name="caste"
              value={formData.caste}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className={labelStyle}>Preferred Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select</option>
              <option>Delhi</option>
              <option>Bhagalpur</option>
              <option>Chandigarh</option>
              <option>Bangalore</option>
              <option>Any</option>
            </select>
          </div>

          {/* MARITAL STATUS */}
          <div>
            <label className={labelStyle}>Preferred Marital Status</label>
            <select
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className="input-field"
            >
              <option value="">Select</option>
              <option>Never Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </select>
          </div>

          {/* EDUCATION */}
          <div className="md:col-span-2">
            <label className={labelStyle}>Preferred Education</label>

            <div className="grid md:grid-cols-3 gap-4">
              {["B.Tech", "M.Tech", "MBA", "MBBS", "CA", "Gov Job"].map(
                (item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 border p-3 rounded-xl"
                  >
                    <input
                      type="checkbox"
                      value={item}
                      checked={formData.education.includes(item)}
                      onChange={handleCheckboxChange}
                    />
                    {item}
                  </label>
                )
              )}
            </div>
          </div>

          {/* BUTTON */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-4 rounded-2xl font-semibold hover:bg-pink-600"
            >
              Save Preferences
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PartnerPreference;