import express from 'express'
import bodyParser from 'body-parser'
import loginRoutes from './features/login/login.routes.js'
import productRoutes from './features/product/product.routes.js'
import userRoutes from './features/user/user.routes.js'
import orderRoutes from './features/order/order.routes.js'
import { verifyToken } from './middlewares/verifyToken.middleware.js'

const app = express()

app
    .use(bodyParser.json())
    .use('/login', loginRoutes)
    .use('/users', userRoutes)
    .use('/products', productRoutes)
    .use(verifyToken)
    .use('/orders', orderRoutes)

export default app