import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//register user

export const registerUser = async (req, res) => {
  try {
    let { name, email, phone, password } = req.body;
    const salt = await bcrypt.genSalt(password, 10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "Account created successfully !!",
      user: newUser,
    });
  } catch (error) {
    return res.status(422).json({
      message: `Error: ${error.message}`,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    var result = {};

    let findUser = await User.findOne({ email: email, password: password });
    !findUser && res.status(400).json("Wrong Credentials");

    const validated = await bcrypt.compare(
      password,
      password,
      findUser.password
    );
    !validated && res.status(422).json("Incorrect password");

    const token = jwt.sign(
      {
        _id: findUser._id,
        name: findUser.name,
        email: findUser.email,
        phone: findUser.phone,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: 3600,
      }
    );
    result = {
      ...findUser.doc,
      access_token: token,
    };
    res.status(200).json(result);
  } catch (error) {
    return res.status(422).json({
      message: `Error: ${error.message}`,
    });
  }
};
