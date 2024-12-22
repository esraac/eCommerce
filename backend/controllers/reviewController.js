import Review from "../models/reviewModel.js";

// Tüm yorumları almak için API route
const fetchReview = async (req, res) => {
    try {
      const { productId } = req.query;
      
      // Ürüne ait yorumları veritabanından alıyoruz
      const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
      
      // Yorumları döndürüyoruz
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching reviews' });
    }
  }


  // Yorum eklemek için API route
const submitReview = async (req, res) => {
    try {
      const { productId } = req.params;
      const { firstName, lastName, comment, rating } = req.body;
  
      // Yeni yorum verisini oluşturuyoruz
      const newReview = new Review({
        productId,
        firstName,
        lastName,
        comment,
        rating,
      });
  
      // Yorum veritabanına kaydediyoruz
      await newReview.save();
  
      // Yorumları tekrar çekiyoruz ve döndürüyoruz
      const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
  
      // Güncellenmiş yorumları döndürüyoruz
      res.json(reviews);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding review' });
    }
  }

  export {fetchReview,submitReview}