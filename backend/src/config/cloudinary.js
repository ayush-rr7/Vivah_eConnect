import dotenv from "dotenv";
dotenv.config(); // 🔴 MUST be at the top
import { v2 as cloudinary }  from 'cloudinary'
import multer from 'multer'
import { CloudinaryStorage }  from 'multer-storage-cloudinary'


cloudinary.config({

  // CLOUD_NAME: dkwpjyx62,
  // API_KEY: 363837161787594,
  // API_SECRET: Z2zvfc_pFGgMuLn9n1roxbTMkC8

  cloud_name:process.env.CLOUD_NAME,
   api_key :process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  
  params: {
    folder: "profiles", // folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
    // transformation :[{width:800, height:800, crop:"limit"}]
  }
});

//upload on cloudinary

const upload= multer({storage});

export default  upload ;


















// const randomString =(length)=>{
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   let result ='';
//   for( let i=0;i<length; i++){
//     result+= characters.charAt(Math.floor(Math.random()
//     *characters.length));
//   }
//   return result;
// }

// const storage = multer.diskStorage({
//    destination : (req,file,cb)=>{
//     cb(null,"uploads/");
//    },
//    filename: (req,file,cb)=>{
//     cb(null,randomString(4)+'__'+file.originalname);
//    }
// })

// // const fileFilter=(req,file,cb)=>{
// //   if(file.mimetype ==='image/jpeg' || file.mimetype === 'image/jpg'){
// //     cb(null,true);
// //   }
// //   else{
// //     cb(null,false);
// //   }
// // }
// const multerOptions={
//   storage
//     // ,fileFilter
// };
