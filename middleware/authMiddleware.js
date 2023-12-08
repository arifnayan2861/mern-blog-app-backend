import jwt from "jsonwebtoken";
const { verify } = jwt;

import User from "../models/User.js";

const authGuard = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const { id } = verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select("-password");
      next();
    } catch (error) {
      let err = new Error("Not authorized. Token failed!");
      err.statusCode = 401;
      next(err);
    }
  } else {
    let error = new Error("Not authorized. No Token!");
    error.statusCode = 401;
    next(error);
  }
};

const adminGuard = (req, res, next) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    let error = new Error("Not authorized as an Admin!");
    error.statusCode = 401;
    next(error);
  }
};

export { authGuard, adminGuard };
