import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authUser = async (req, res, next) => {
  // Authorization header kontrolü
  const token = req.headers["authorization"]?.split(" ")[1]; // "Bearer <token>" formatında olabilir

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Token bulunamadı" });
  }

  try {
    // Token'ı doğrulama
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcıyı bulma
    const user = await userModel.findById(decoded.userId); // userId olarak değiştirildi
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Kullanıcı bulunamadı" });
    }

    // Kullanıcıyı request objesine ekleyerek sonraki adımlara geçilmesini sağla
    req.user = user;
    next(); // Token geçerliyse devam et
  } catch (error) {
    console.error("Token doğrulama hatası:", error);

    // Hata türüne göre uygun mesajı döndür
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Geçersiz token" });
    } else if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token süresi dolmuş" });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Geçersiz veya süresi dolmuş token" });
    }
  }
};

export default authUser;
