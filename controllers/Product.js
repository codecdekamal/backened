const Products = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
const createProduct = async (req, res) => {
  try {
    req.body.user = req.user.userID;
    const product = await Products.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ product });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};
const getAllProducts = async (req, res) => {
  const products = await Products.find({});
  res.status(StatusCodes.OK).json({ products });
  console.log("getAllProducts");
};
const getSingleProduct = async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "No Product is found with this id" });
  }
  res.status(StatusCodes.OK).json({ product });
};
const updateProduct = async (req, res) => {
    try {   
      console.log(req.files)   
        const product = await Products.findById(req.params.id);
        if (!product) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ msg: "No Product is found with this id" });
        }
        const updateProduct = await Products.findOneAndUpdate(
          {_id:req.params.id},
          {...req.body}
        );
        res.status(StatusCodes.OK).json({ updateProduct }); 
    } catch (error) {
      console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg:error.message }); 
    }
  
};
const deleteProduct = async (req, res) => {
      try {
        const product = await Products.findById(req.params.id);
        if (!product) {
          return res
            .status(StatusCodes.NOT_FOUND)
            .json({ msg: "No Product is found with this id" });
        }
         await Products.findOneAndDelete({_id:req.params.id},);
        res.status(StatusCodes.OK).json({ msg:"Success" }); 
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg:error.message }); 

      }
};
const uploadImage = async (req, res) => {
  console.log(req.files.img,req.body)
  console.log(req.params.id)
  try {
    if(!req.files){
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"No file is uploaded."})
   }
   const productImage = req.files.img
   if(!productImage.mimetype.startsWith('image')){
    return res.status(StatusCodes.BAD_REQUEST).json({msg:"No file is uploaded."})
   }
   const maxSize = 1024*1024
   if(productImage.size >maxSize){
       return res.status(StatusCodes.BAD_REQUEST).json({msg:"Please provide image of size lesser than 1 mb."})
   }
   const imagePath = path.join(__dirname,"../public/uploads/"+productImage.name )
   productImage.mv(imagePath,function(err){
     if(err){
       return res.status(500).json({msg:err});
   }
   })
   await Products.findByIdAndUpdate({_id:req.params.id},{images:`/uploads/${productImage.name}`})
   res.status(200).json({msg:"success"});
  } catch (error) {
    console.log(error)
  }


};
const getProductsByCategory = async (req,res) =>{
  try {
    const category = req.params.category;
    if(category==="allProducts"){
      const products = await Products.find({})
      return res.status(StatusCodes.OK).json({products})
    }
     const products = await Products.find({category:category})
     res.status(StatusCodes.OK).json({products})
  } catch (error) {
     console.log(error)
  }
}
module.exports = {
  createProduct,
  uploadImage,
  deleteProduct,
  updateProduct,
  getSingleProduct,
  getAllProducts,
  getProductsByCategory
};
