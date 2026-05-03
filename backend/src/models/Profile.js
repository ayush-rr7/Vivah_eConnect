  import mongoose from 'mongoose'
  
  const profileSchema = mongoose.Schema({
    
  Name: {
      type:String,
      required:true,
    },
    Age:{
      type:String,
      required:true,
    },
    Height_Ft:{
      type:String,
      // required:true,
    },
    Height_In:{
      type:String,
      // required:true,
    },
    Weight:{
      type:String,
      
    },
    Caste:{
      type:String,
      // required:true,
    },
    Religion:{
      type:String,
      // required:true,
    },
    Education:{
      type:String,
      // required:true,
    },
    Job_Details:{
      type:String,
     
    },
    Income:{
      type:String,
      
    },
    Location:{
      type:String,
      // required:true,
    },
    Contacts:{
      type:String,
      // required:true,
    },
    Gender:{
      type:String,
      // required:true,
    },
    Martial_Status:{
      type:String,
      // required:true,
    },
     Images:[{
      type:String,
  
    }],
      userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

    });
    
    
    
    
    const  Profile= mongoose.model('Profile', profileSchema);
    export default Profile;