import Profile from "../models/Profile.js";
import Connection from "../models/Connection.js";

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

    // 👇 MULTIPLE IMAGE HANDLING
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

    res.status(201).json(savedUser); // 👈 send back to frontend
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
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
 
};


