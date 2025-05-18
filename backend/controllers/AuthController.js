// Import required libraries and modules
import jwt from "jsonwebtoken";            // Used for generating and verifying JWT tokens
import bcrypt from "bcryptjs";             // Used for securely hashing and comparing passwords
import dotenv from "dotenv";               // Loads environment variables from .env file

// Import user-related DB operations
import { createUserInDB, doesUserExist, getUserWithEmail } from "../models/UserModel.js";

// Load environment variables
dotenv.config();

/**
 * @desc    Register a new user
 * @route   POST /auth/register
 * @access  Public
 */
export const register = async (req, res) => {
  const { name, email, password, age } = req.body;

  try {
    // Check if the email is already in use
    if (await doesUserExist(email)) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password before saving to DB
    const hashedPassword = bcrypt.hashSync(password, 10); // 10 = salt rounds

    // Save the new user to the database
    await createUserInDB({ name, email, password: hashedPassword, age });

    // Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * @desc    Log in an existing user and set JWT in cookie
 * @route   POST /auth/login
 * @access  Public
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserWithEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      age: user.age,
    };

    const token = jwt.sign(payload, process.env.SECRET_OR_KEY, { expiresIn: "3h" });

    // Set token in HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only true in production over HTTPS
      sameSite: "Strict",
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
    });

    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  };
  

/**
 * @desc    Example of a protected route that requires JWT authentication
 * @route   GET /auth/protected
 * @access  Private
 */
export const protectedRoute = (req, res) => {
  res.json({ message: "You accessed a protected route", user: req.user });
};
