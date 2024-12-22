import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mogodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import productRouter from "./routes/productRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import reviewRouter from "./routes/reviewRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

//middlware
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)
app.use('/api/reviews', reviewRouter)

app.get('/',(req,res)=>{
    res.send("Api Working")
})

app.listen(port, ()=>console.log(`Server is running on PORT:`+port))