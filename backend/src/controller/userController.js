import Profile from "../models/Profile.js";
import Connection from "../models/Connection.js";
import PartnerPreference from "../models/partnerPreference.js";

const addUser = async (req, res) => {
  try {
    console.log("Got req to add user");
    const {
      Name,
      Age,
      Height_Ft,
      Height_In,
      Weight,
      Caste,
      Relegion,
      Education,
      Job_Details,
      Income,
      Location,
      Contacts,
      Gender,
      Martial_Status,
    } = req.body;

    const userId = req.userId;

    //  MULTIPLE IMAGE HANDLING
    if (!req.files || req.files.length === 0) {
      console.log("err");
      return res.status(422).json({ message: "Images required" });
    }
    // Cloudinary URLs
    const imageURL = req.files.map((file) => file.path);

    const newUser = new Profile({
      Name,
      Age,
      Height_Ft,
      Height_In,
      Weight,
      Caste,
      Relegion,
      Education,
      Job_Details,
      Income,
      Location,
      Contacts,
      Gender,
      Martial_Status,
      Images: imageURL,
      userId: userId,
    });

    const savedUser = await newUser.save();
    console.log("saved");

    res.status(201).json(savedUser); //  send back to frontend
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


const getPreferences = async (req, res) => {
  try {
    const { profileId } = req.params;
    console.log(profileId);
    const preferences = await PartnerPreference.findOne({ profileId });

    return res.json({ preferences });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const savePreferences = async (req, res) => {
  try {
    const { profileId } = req.params;

    const {
      ageMin,
      ageMax,
      incomeMin,
      incomeMax,
      heightMin,
      heightMax,
      religion,
      caste,
      education,
      location,
      maritalStatus,
    } = req.body;

    
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

   
    const savedPreference = await PartnerPreference.findOneAndUpdate(
      { profileId: profile._id },
      {
        ageMin,
        ageMax,
        incomeMin,
        incomeMax,
        heightMin,
        heightMax,
        religion,
        caste,
        education,
        location,
        maritalStatus,
      },
      {
        new: true,
        upsert: true, 
      }
    );

    console.log(savedPreference);

    res.status(200).json({
      message: "Partner Preferences saved successfully",
      preferences: savedPreference,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await Profile.find();
    res.json(user);
    console.log("fetched sucessfully");
  } catch (err) {
    console.log(err.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
     console.log("hello Dear");
    const user = await Profile.findById(id);
    // const user= await Profile.find();
    res.json(user);
   
    console.log(user);
    console.log("fetched sucessfully");
  } catch (err) {
    console.log(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    console.log("hi");
    const updateTask = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updateTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export default {
  addUser,
  getUser,
  getUserById,
  deleteUser,
  updateUser,
  savePreferences,
  getPreferences
 
};


