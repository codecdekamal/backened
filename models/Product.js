const mongoose = require("mongoose");
const ProductSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim:true,
      required:[true,"Please provide name"],
      maxlength:[100,"You have crossed the limit "]
    },
    price: {
      type: Number,
      required:[true,"Please provide price"],
     default:0,
    },
    description: {
      type: String,
      required:[true,"Please provide description"],
      maxlength:[100,"You have crossed the limit "]
    },
    images: {
      type: String,
      default:"/uploads/example.jpeg"
    },
    category: {
      type: String,
      required:[true,"Please provide category"],
      enum:["mens","womens","kids"]
    },
    freeShipping: {
      type: Boolean,
    },
    stock: {
      type: Number,
      required:true,
      default:15,
    },
    rating: {
      type: Number,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductSchema);
