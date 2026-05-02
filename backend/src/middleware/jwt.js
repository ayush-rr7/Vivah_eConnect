import jwt from 'jsonwebtoken';

// Middleware for JWT verification
// const authenticateJWT = (req, res, next) => {
//   // Get auth header - The Authorization header is commonly used to send authentication tokens
//

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};


// const generatedToken=(userData)=>{
//   return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:60000});
// }

export default authenticateJWT;