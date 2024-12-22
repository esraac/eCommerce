import mongoose, { mongo } from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Hangi ürüne ait olduğunu belirtir
  firstName: { type: String, required: true }, // Kullanıcının ilk adı
  lastName: { type: String, required: true }, // Kullanıcının soyadı
  reviews: { type: String, required: true }, // Yorum metni
  rating: { type: Number, min: 1, max: 5, required: true }, // Yorum puanı (1-5 arası)
  createdAt: { type: Date, default: Date.now }, // Yorumun oluşturulma tarihi
});

const reviewModel =  mongoose.model('Review', reviewSchema);

export default reviewModel;
