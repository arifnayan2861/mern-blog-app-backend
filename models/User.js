import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;
import jwt from "jsonwebtoken";
const { sign } = jwt;

const UserSchema = new Schema(
  {
    avatar: { type: String, default: "" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, required: false },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// hashing password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
    return next();
  }
  return next();
});

// tokens generate
UserSchema.methods.generateJWT = async function () {
  return await sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//compare password with hashed password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

const User = model("User", UserSchema);

export default User;
