import User from "../models/User.js";

// new user registration
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // check if user exists or not
    let user = await User.findOne({ email });
    if (user) {
      // return res.status(400).json({ message: "User has already registered!" });
      throw new Error("User has already registered!");
    }

    //creating a new user
    user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      password: user.password,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // finding user with email
    let user = await User.findOne({ email });

    if (!user) {
      throw new Error("E-mail not found!");
    }

    // password checking while login
    if (await user.comparePassword(password)) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        password: user.password,
        verified: user.verified,
        admin: user.admin,
        token: await user.generateJWT(),
      });
    } else {
      throw new Error("Invalid e-mail or password!");
    }
  } catch (error) {
    next(error);
  }
};

const userProfile = async (req, res, next) => {
  try {
    // searching user
    let user = await User.findById(req.user._id);
    if (user) {
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        password: user.password,
        verified: user.verified,
        admin: user.admin,
      });
    } else {
      let error = new Error("User not found!");
      error.statusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    //searching user
    let user = await User.findById(req.user._id);
    if (!user) {
      throw new Error("User does not exist!");
    }
    //updating name, email & body
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password && req.body.password.length < 6) {
      throw new Error("Password length must be at least 6 characters!");
    } else if (req.body.password) {
      user.password = req.body.password;
    }
    // saving the updated user
    const updatedUser = await user.save();
    return res.status(200).json({
      _id: updatedUser._id,
      avatar: updatedUser.avatar,
      name: updatedUser.name,
      email: updatedUser.email,
      password: updatedUser.password,
      verified: updatedUser.verified,
      admin: updatedUser.admin,
      token: await updatedUser.generateJWT(),
    });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, userProfile, updateProfile };
