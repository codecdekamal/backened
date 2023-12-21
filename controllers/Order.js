const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const mongoose = require('mongoose')
require("dotenv").config()
const stripe = require("stripe")(process.env.My_Stripe_Key);
const { StatusCodes } = require("http-status-codes");
const YOUR_DOMAIN = 'https://frontend-jmabpdjwf-kamal-joshis-projects.vercel.app';
const createOrder = async (req, res) => {
  try {
    let product = req.body
 console.log(product)
 console.log(product[0].user)
const user = await User.findById({_id:req.user.userID})
console.log(user)
// This is your test secret API key.
const lineItems = product.map((prod)=>({
  price_data:{
    currency:"inr",
    product_data:{
      name:prod.title,
    },
    unit_amount:prod.price*100,  
  },
  quantity:prod.quantity
}))
console.log(lineItems)
console.log(lineItems.product_data)
 product = product.map((pro)=>{
  return {name: pro.title,
  image:pro.images ,
  price:pro.price ,
  quantity:pro.quantity ,
  product:pro._id,
  shippingAddress:pro.address
}
});
  const session = await stripe.checkout.sessions.create({
    line_items:lineItems,
    mode: 'payment',
    success_url:`${YOUR_DOMAIN}/`,
    cancel_url:`${YOUR_DOMAIN}/cart`
  });
  const { amount_total,id} = session;
  console.log(user)
  const orderDetails = {
    customerName:user.name,
    totalAmount:amount_total,
    subtotal:amount_total,
    items:product,
    user:req.user.userID,
    shippingAddress:product[0].shippingAddress
  }
  await Order.create(orderDetails)
  res.json({id:session.id})
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({msg:error.message})
  }


};
const getAllOrders = async (req, res) => {
  try {
    console.log(req.user.role)
    const order = await Order.find({}).populate({ path: "user", strictPopulate: false, select: "-password" }).populate({path:"cartItems",populate:{path:"product"},strictPopulate:false})
    console.log(order)
 res.status(StatusCodes.OK).json({order})
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({msg:error.message})
  }
};
const getSingleOrder = async (req, res) => {
  try {
    const {id} = req.params
    const order = await Order.findById({_id:id})
     res.status(StatusCodes.OK).json({order})
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({msg:error})
  }
};
const updateOrder = async (req, res) => {
 
};
const getCurrentUserOrder = async (req, res) => {
  try {
    const {id} = req.params
    console.log(id)
    const userId = new mongoose.Types.ObjectId(id);
    console.log(userId)
    const order = await Order.find({user:userId}).populate('user')
     res.status(StatusCodes.OK).json({order})
     console.log(order)
  } catch (error) {
    console.log(error)
    res.status(StatusCodes.BAD_REQUEST).json({msg:error.message})
  }
};

module.exports = {
    createOrder,
  updateOrder  ,
  getSingleOrder,
  getAllOrders,
  getCurrentUserOrder
};
