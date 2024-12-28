import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.user._id; // Auth middleware'den gelen kullanıcı bilgisi

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "Kullanıcı bulunamadı" });
    }

    let cartData = userData.cartData || {}; // Eğer cartData yoksa, boş bir obje başlat

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    // CartData'yı güncelle
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Sepete eklendi" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Sepete eklenirken hata oluştu",
      error: error.message,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.user._id; // Auth middleware'den gelen kullanıcı bilgisi

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "Kullanıcı bulunamadı" });
    }

    let cartData = userData.cartData || {}; // Eğer cartData yoksa, boş bir obje başlat

    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] = quantity;
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Sepet güncellendi" });
    } else {
      res.status(400).json({
        success: false,
        message: "Ürün veya beden sepette bulunamadı",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Sepet güncellenirken hata oluştu",
      error: error.message,
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id; // Auth middleware'den gelen kullanıcı bilgisi

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "Kullanıcı bulunamadı" });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Sepet bilgileri alınırken hata oluştu",
      error: error.message,
    });
  }
};

export { addToCart, updateCart, getUserCart };
