import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";


export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "").trim();

    if (!token) {
      throw new ApiError(401, "Unauthorized Request: No Token Provided");
    }

    console.log("Token being verified:", token);

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -confirmPassword"
    );
    
    if (!user) {
      throw new ApiError(401, "Unauthorized Request: Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "Access Token Expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, "Invalid Access Token");
    }
    throw new ApiError(401, error.message || "Unauthorized Request");
  }
});

export const isAdminLogin = asyncHandler(async (req, res, next) => {

  if (req.user?.role !== "admin") {
    throw new ApiError(401, "Unauthorized Request: Admin Access Required");
  }

  
  next();
});
