import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import {
  FaStar,
  FaStarHalfStroke,
  FaTruckFast,
  FaHeart,
} from "react-icons/fa6";
import { TbShoppingBagPlus } from "react-icons/tb";
import Footer from "../components/Footer";
import RelatedProducts from "../components/RelatedProducts";

export default function Product() {
  const { productId } = useParams();
  const {
    products,
    currency,
    addToCart,
    fetchReviews,
    submitReview,
    getUserCart,
  } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [user, setUser] = useState(null);

  const fetchProductData = () => {
    const selectedProduct = products.find((item) => item._id === productId);
    if (selectedProduct) {
      setProduct(selectedProduct);
      setImage(selectedProduct.image[0]);
    }
  };

  const fetchProductReviews = async () => {
    const data = await fetchReviews(productId);
    setReviews(data);
  };

  const handleReviewSubmit = async () => {
    if (!newComment) return alert("Please write a comment.");

    const review = {
      productId,
      comment: newComment,
      rating: newRating,
    };

    try {
      await submitReview(productId, review);
      setNewComment("");
      setNewRating(5);
      fetchProductReviews();
    } catch (error) {
      console.error("Error submitting review: ", error);
    }
  };

  const calculateAverageRating = () => {
    if (!reviews) {
      return 0;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const averageRating = calculateAverageRating();

  const filteredReviews = ratingFilter
    ? reviews.filter((review) => review.rating === ratingFilter)
    : reviews;

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  useEffect(() => {
    if (productId) {
      fetchProductReviews();
    }
  }, [productId]);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserCart(); // Kullanıcı bilgisini al
      setUser(userData); // State'e ata
    };

    fetchUser();
  }, [getUserCart]);

  if (!product) {
    return <div>...Loading</div>;
  }

  return (
    <section>
      <div className="max-padd-container mt-8 xl:mt-6">
        {/* Product Details */}
        <div className="max-padd-container flex gap-12 flex-col xl:flex-row bg-white py-16 rounded-2xl">
          {/* Image Section */}
          <div className="flex flex-1 gap-x-4">
            <div className="flex flex-col gap-2">
              {product.image.map((item, i) => (
                <img
                  onClick={() => setImage(item)}
                  src={item}
                  key={i}
                  alt="productImg"
                  className="max-h-[100px] w-auto rounded-lg cursor-pointer"
                />
              ))}
            </div>
            <div className="flex-1 flex justify-center items-center">
              <img
                src={image}
                alt=""
                className="rounded-xl bg-gray-10 max-h-[400px] w-auto object-contain"
              />
            </div>
          </div>
          {/* Info Section */}
          <div className="flex-[1.5] rounded-2xl px-7">
            <h3 className="h3 !my-2.5 text-gray-800">{product.name}</h3>
            <div className="flex items-baseline gap-x-5">
              <h3 className="h3 text-tertiary">
                {currency}
                {product.price}
              </h3>
              <div className="flex items-center gap-x-2 text-secondary mb-2">
                <div className="flex gap-x-1 text-secondary text-xl">
                  {/* `averageRating` kontrol ediliyor */}
                  {averageRating && averageRating > 0
                    ? [...Array(Math.floor(averageRating))].map((_, i) => (
                        <FaStar key={i} />
                      ))
                    : null}
                  {averageRating % 1 > 0 && <FaStarHalfStroke />}
                </div>
                <span className="text-sm">
                  ({reviews?.length > 0 ? reviews.length : 0})
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="flex flex-col gap-4 my-4 mb-5">
              <div className="flex gap-2">
                {[...product.sizes]
                  .sort((a, b) => {
                    const order = ["S", "M", "L", "XL", "XXL"];
                    return order.indexOf(a) - order.indexOf(b);
                  })
                  .map((item, i) => (
                    <button
                      onClick={() => setSize(item)}
                      key={i}
                      className={`${
                        item === size
                          ? "bg-tertiary text-white"
                          : "border-gray-300"
                      } border-[1.5px] border-tertiary h-8 w-10 bg-primary rounded-md text-sm`}
                    >
                      {item}
                    </button>
                  ))}
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <button
                onClick={() => addToCart(product._id, size)}
                className="btn-dark w-1/2 flex items-center justify-center gap-x-2"
              >
                Add to cart
                <TbShoppingBagPlus />
              </button>
              <button className="btn-light">
                <FaHeart />
              </button>
            </div>
            <div className="flex items-center gap-x-2 mt-2">
              <FaTruckFast className="text-lg text-tertiary" />
              <span className="text-sm text-gray-600">
                Free Delivery on orders over 500$
              </span>
            </div>
            <hr className="my-4 w-2/3 border-gray-300" />
            <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
              <p>Authenticity You Can Trust</p>
              <p>Easy Returns and Exchanges Within 7 Days</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h4 className="text-lg font-semibold">Reviews</h4>

          {/* Rating Filter */}
          <div className="mb-4">
            <label className="mr-2">Filter by Rating:</label>
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(Number(e.target.value))}
              className="border p-2 rounded"
            >
              <option value={0}>All</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Stars
                </option>
              ))}
            </select>
          </div>

          {/* Yorumların listelendiği alan */}
          <div className="flex flex-col gap-4 mt-4">
            {!reviews ? (
              <p className="text-gray-600">Henüz yorum eklenmemiş.</p>
            ) : (
              reviews
                .filter((review) =>
                  ratingFilter ? review.rating === ratingFilter : true
                )
                .map((review, i) => (
                  <div key={i} className="border rounded-lg p-4 shadow-sm">
                    <h5 className="font-semibold">{`${review.firstName} ${review.lastName}`}</h5>
                    <div className="flex items-center gap-x-1 text-yellow-500">
                      {[...Array(Math.floor(review.rating))].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                      {review.rating % 1 > 0 && <FaStarHalfStroke />}
                    </div>
                    <p className="text-sm text-gray-600">{review.comment}</p>
                    <span className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleString()}
                    </span>
                  </div>
                ))
            )}
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">Add a Review</h4>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border rounded-lg p-2 mb-2"
              rows="4"
              placeholder="Write your comment..."
            />
            <div className="flex items-center gap-x-4">
              <label>
                Rating:
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                  className="ml-2 border rounded p-1"
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </label>
              <button
                onClick={handleReviewSubmit}
                className="btn-dark px-4 py-2 rounded-lg"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <RelatedProducts category={product.category} productId={productId} />
        </div>
      </div>
      <Footer />
    </section>
  );
}
