import Review from "../models/reviewModel.js";

// Yorumları getir
const fetchReview = async (req, res) => {
  try {
    const { productId } = req.query;

    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Ürün ID'si gerekli" });
    }

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Yorumlar alınırken hata oluştu" });
  }
};

// Yorum ekle
const submitReview = async (req, res) => {
  try {
    const { productId, comment, rating } = req.body;
    const name = req.user.name; // Auth middleware'den kullanıcı adını al

    if (!productId || !comment || !rating) {
      return res
        .status(400)
        .json({ success: false, message: "Tüm alanlar gerekli" });
    }

    const newReview = new Review({
      productId,
      name,
      comment,
      rating,
    });

    await newReview.save();
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Yorum eklenirken hata oluştu" });
  }
};

export { fetchReview, submitReview };
