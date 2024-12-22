import Review from "../models/reviewModel.js";

// Yorumları getir
const fetchReview = async (req, res) => {
  try {
    const { productId } = req.query;

    if (!productId) {
      return res.status(400).json({ success: false, message: 'Product ID is required' });
    }

    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching reviews' });
  }
};

// Yorum ekle
const submitReview = async (req, res) => {
  try {
    const { productId, name, comment, rating } = req.body;
    console.log(req.body);

    if (!productId || !name || !comment || !rating) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
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
    res.status(500).json({ success: false, message: 'Error adding review' });
  }
};

export { fetchReview, submitReview };