import express from  "express"
import {submitReview, fetchReview} from "../controllers/reviewController.js"


const reviewRouter = express.Router();  // 'router' yerine 'reviewRouter' kullanılmalı

reviewRouter.post("/submit", submitReview)
reviewRouter.get("/fetch", fetchReview)

export default reviewRouter;