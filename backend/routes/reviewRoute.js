import express from "express";
import { submitReview, fetchReview } from "../controllers/reviewController.js";
import authUser from "../middleware/auth.js";

const reviewRouter = express.Router();

reviewRouter.post("/submit", authUser, submitReview);
reviewRouter.get("/fetch", fetchReview);

export default reviewRouter;
