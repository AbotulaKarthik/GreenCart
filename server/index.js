import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'
import connectDb from './configs/db.js'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoute.js'
import sellerRouter from './routes/sellerRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoute.js'
import addressRouter from './routes/addressRoute.js'
import orderRouter from './routes/orderRoute.js'

const app = express()

/* ----------------- Middlewares ----------------- */
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://your-frontend.vercel.app' // 👈 replace
    ],
    credentials: true,
  })
)

/* ----------------- Routes ----------------- */
app.get('/', (req, res) => {
  res.send('Hello server')
})

app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)

/* ----------------- DB + Cloudinary ----------------- */
const init = async () => {
  try {
    await connectDb()
    await connectCloudinary()
    console.log('Services connected')
  } catch (err) {
    console.error(err)
  }
}

init()

export default app
