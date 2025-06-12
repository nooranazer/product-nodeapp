
import Product from "../models/product.js";
import HttpError from "../middlewares/httpError.js";
import { json } from "express";


// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({is_deleted: false}); 
    res.status(200).json(products);

  } catch (err) {
  return next(HttpError('server error',500))
  }
};


//get a single product
export const getOneProduct = async (req, res, next) => {
  const id = (req.params.id)
try{
  const fetchedProduct = await Product.findOne(
    {
    _id: id,
     is_deleted: false
    })

  if(!fetchedProduct){
    return next(new HttpError('product not found',404))
  } else {
    res.status(200).json({
      message:'product fetched',
      status:true,
      data:fetchedProduct})
  }
} catch (error) {
  return next(new HttpError('server error',500))
}
}


// add new product
export const addProducts = async (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  try {
    const newProduct = await new Product({ name, price }).save();

    if (!newProduct) {
      return next(new HttpError('Product not found', 400));
    }

    res.status(201).json(
      {
        status: true,
        message:'product added',
        data:null
      });

  } catch (err) {
    return next(new HttpError('Something went wrong, could not add product', 500));
  }
};



// delete a product
export const deleteProduct = async (req, res, next) => {
  const id = (req.params.id);

  try{
    const deletedProduct = await Product.findOneAndUpdate(
      {_id: id, is_deleted:false },//condition
      { is_deleted: true },//what to update
      { new: true }//to save
    )
    
    if(!deletedProduct){
      return next(new HttpError("product not found",404))
    } else {

        res.status(200).json({
        status:true,
        message:'product deleted',
        data:null})
    }
    } catch (error) {
      return next(new HttpError("server error",500))
    }

  }



//update product
export const updateProduct = async (req, res, next) => {
    const id = (req.params.id);
    const { name, price} = req.body;
    
    try{
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: id, is_deleted: false },
        {name,price}
      )

      if (!updatedProduct) {
        return next(new HttpError("product not found",404))
      } else {
        res.status(200).json({
          status:true,
          message:"product updated successfully",
          data:updatedProduct
        })
      }

    } catch (error) {
      console.error(error,"rrrrrr")
      return next(new HttpError("server error",500))
    }

}
   






