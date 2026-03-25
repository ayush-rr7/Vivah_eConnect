import jwt from "jsonwebtoken";
import Profile from "../models/Profile.js";

const socketAuth =  async (socket, next) => {

  try {

    const cookieHeader =
      socket.handshake.headers.cookie;

    if (!cookieHeader)
      return next(new Error("No cookie"));

    const token =
      cookieHeader
        .split("; ")
        .find(c => c.startsWith("token="))
        ?.split("=")[1];

    if (!token)
      return next(new Error("Unauthorized"));

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    
 const profileId =
      socket.handshake.auth?.profileId ||
      socket.handshake.query?.profileId;

    if (!profileId) {
      return next(new Error("No profile selected"));
    }

    // Verify profile belongs to this user
    const profile = await Profile.findOne({
      _id: profileId,
      userId: decoded.userId
    });

    if (!profile) {
      return next(new Error("Unauthorized profile access"));
    }

    //  Attach BOTH user + profile
    socket.user = {
      id: decoded.userId
    };

    socket.profile = {
      id: profileId
    };

    next();

  } catch (err) {
    next(new Error("Authentication failed"));
  }
};

export default socketAuth;