 import mongoose from 'mongoose'
  
  const prefrenceSchema = mongoose.Schema({
 
 profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
      unique: true,
    },

  ageMin: {
    type: Number,
    default: null,
  },

  ageMax: {
    type: Number,
    default: null,
  },

  incomeMin: {
    type: Number,
    default: null,
  },

  incomeMax: {
    type: Number,
    default: null,
  },

  heightMin: {
    type: String,
    default: "",
  },

  heightMax: {
    type: String,
    default: "",
  },

  religion: {
    type: String,
    default: "",
  },

  caste: {
    type: String,
    default: "",
  },

  education: {
    type: [String],
    default: [],
  },

  location: {
    type: String,
    default: "",
  },

  maritalStatus: {
    type: String,
    default: "",
  },
partnerPreferenceCompleted: {
  type: Boolean,
  default: false,
},
});

    const  PartnerPreference=  mongoose.models.PartnerPreference || mongoose.model('PartnerPreference', prefrenceSchema);
    export default PartnerPreference;