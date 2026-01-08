import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import connectDb from './configs/db.js'
import 'dotenv/config'
import userRouter from './routes/userRoute.js'
import sellerRouter from './routes/sellerRoutes.js'
import connectCloudinary from './configs/cloudinary.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoute.js'
import addressRouter from './routes/addressRoute.js'
import orderRouter from './routes/orderRoute.js'

const app = express()

const PORT = process.env.PORT || 4000


/// configs -------------------------
await connectDb()
await connectCloudinary()

const allowedOrigins = ['http://localhost:5173']


//// Core Middleware configurations ===========
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: allowedOrigins, credentials: true}))

app.get('/',(req,res)=>{
    res.send("Hello server")
})

///// user routes ---------------------
app.use('/api/user',userRouter)

///// seller routes ---------------------
app.use('/api/seller',sellerRouter)

//// product routes -----------------------
app.use('/api/product',productRouter)

//// cart routes -------------------------
app.use('/api/cart',cartRouter)

//// address routes -------------------------
app.use('/api/address',addressRouter)

//// order routes -------------------------
app.use('/api/order',orderRouter)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

export default app
