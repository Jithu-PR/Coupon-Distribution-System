const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const couponRouter = require('./routes/couponRoute')

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cache-Control',
      'Expires',
      'Pragma',
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use('/api/coupon', couponRouter)

app.listen(PORT, () => console.log(`server is now running on port ${PORT}`));