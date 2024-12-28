import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  // Authorization header kontrolü
  const token = req.headers['authorization']?.split(" ")[1]; // "Bearer <token>" formatında olabilir

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    // Token'ı doğrulama
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcıyı bulma
    const user = await userModel.findById(decoded.id); // decoded.id olarak token'dan gelen kullanıcı ID'si alınır
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Kullanıcıyı request objesine ekleyerek sonraki adımlara geçilmesini sağla
    req.user = user;
    next(); // Token geçerliyse devam et
  } catch (error) {
    // Hata durumunda, daha ayrıntılı mesajlar eklemek faydalı olabilir
    console.error("Token verification failed:", error);

    // Hata türüne göre uygun mesajı döndür
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ success: false, message: "Invalid token" });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: "Token expired" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  }

  console.log("Auth middleware çalıştı");
  console.log("Kullanıcı bilgisi:", req.user);
};

export default authUser;
