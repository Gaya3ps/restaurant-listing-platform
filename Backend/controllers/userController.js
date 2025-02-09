import User from '../models/User.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { generateToken } from '../helper/jwtHelper.js';

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or user doesnt exist ' });
    }

    // Compare the input password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    
    
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const role = "user";
    const {token}=generateToken(user.username,user._id,user.email,role);
    const {password:_, ...userWithoutPass } = user._doc;

    // Send success response
    res.status(200).json({
      message: 'Login successful',
      userWithoutPass,
      token
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

