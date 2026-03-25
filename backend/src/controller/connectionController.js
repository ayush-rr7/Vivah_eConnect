// import connection from "../models/Connection";
import Connection from "../models/Connection.js";

const getConnection= async(req,res)=>{
  console.log("I'm here nn nd U");
  try{
  const { profileId, type, status } = req.query;

  console.log(type );
 
let connections;

if(type === "received"){

connections = await Connection.find({
receiverProfileId: profileId,
status: status
}).populate("senderProfileId", " Name Age Location")
}

else if(type === "sent"){
connections = await Connection.find({
senderProfileId: profileId,
status: status
}).populate("receiverProfileId", "Name Age Location")
}


 console.log(connections);
  return res.json(connections);
}catch(err){
  console.log(err);
res.status(500).json({ message: "Server error" });

}
};


const connectionRequest = async (req, res) => {
  try {
   
    // console.log(req.body);
    const senderProfileId = req.body.senderProfileId;
const receiverProfileId = req.body.receiverProfileId;
if(senderProfileId === receiverProfileId){
return res.status(400).json({message:"Cannot connect to yourself"})
}
    const existingRequest = await Connection.findOne({
      senderProfileId,
receiverProfileId
    });
    
   if (existingRequest) {
  return res.json({
    success: false,
    message: "Connection Request Already Sent"
  });
}
   const connection = await Connection.create({
senderProfileId,
receiverProfileId
})

console.log(connection);
    res.status(201).json({
    success: true,
    message: "Connection Request Sent Sucessfully"
  }); // send back to frontend
   
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};


const respondConnection = async (req, res) => {

try {

const { connectionId } = req.params;
const { status } = req.body;
console.log(req.params)

const connection = await Connection.findByIdAndUpdate(
connectionId,
{ status },
{ new:true }
);
console.log(connection);
res.json(connection);

} catch(err){
console.log(err);
}

}



const Removeconnection= async(req,res)=>{}
export default {connectionRequest,getConnection,respondConnection};