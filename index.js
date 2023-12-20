const express = require("express");
const app = express();
const fileUpload = require("express-fileupload")
const morgan = require("morgan");
require("dotenv").config();
const connect = require("./db/connect");
const cors = require("cors")
const productRouter = require("./router/Product")
const authRouter = require("./router/auth");
const orderRouter = require("./router/Order");
const userRouter = require("./router/User")
const {authMiddleware} = require("./middleware/auth")
const errorMiddleware = require("./middleware/errorMiddleware")
app.use(express.static("./public"))
app.use(fileUpload());
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/user",authMiddleware, userRouter);
app.use(morgan("tiny"));
const PORT = process.env.MY_PORT || 6000
const start = async () => {
  await connect(process.env.MY_MONGO_URL);
  app.listen(PORT, () => {
    console.log(`Your port has been started at ${PORT}....`);
  });
};
start();
