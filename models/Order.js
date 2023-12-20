const mongoose = require("mongoose");
const singleCartSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  product: { type: mongoose.Schema.ObjectId, ref: "Products", required: true },
});
const orderSchema = mongoose.Schema(
  {
    customerName:String,
    orderStatus:{
      type:String,
      default:"Shipped"
    },
    paymentMethod:{
      type:String,
      default:"PayPal",
    },
    shippingAddress:{
      type:Object,
      default:"123 Main Street, Anytown, USA",
    },
    subtotal:{
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    items: [singleCartSchema],
    // status:{
    //    type:String,
    //    enum:["pending","failed","paid","delivered","canceled"],
    //    default:"pending"
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Order", orderSchema);
