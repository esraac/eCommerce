import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// Token oluşturma fonksiyonu
const createToken = (userId) => {
  console.log("Creating token for userId:", userId);
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Kullanıcı girişi
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcıyı veritabanında ara
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Şifreyi bcrypt ile doğrula
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // JWT oluştur
    const token = createToken(user._id);
    console.log("Generated token:", token);

    // Token'ı yanıta ekle
    res.json({ success: true, token });  // Bu token frontend'e gönderilecektir
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Kullanıcı kaydı
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Enter a valid email" });
    }

    // Şifre güvenliği kontrolü
    const isPasswordStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    if (!isPasswordStrong) {
      return res.status(400).json({ success: false, message: "Password must include uppercase, lowercase, number, and special character" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.error("Registration error: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = req.user;

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Old password is incorrect" });
    }

    const isPasswordStrong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPassword);
    if (!isPasswordStrong) {
      return res.status(400).json({ success: false, message: "Password must include uppercase, lowercase, number, and special character" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Kullanıcı profilini güncelleme
const updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Token ile kimlik doğrulaması yapılmalı
    const user = req.user; // Kullanıcı bilgisi, verifyToken middleware'inde ekleniyor

    // Profil güncellemeleri
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile: ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { loginUser, registerUser, updateUserProfile, changePassword };
