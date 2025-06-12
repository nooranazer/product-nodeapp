import express from 'express'
import { getProducts, addProducts, deleteProduct, updateProduct, getOneProduct} from '../controllers/productController.js'


const productRoutes = express.Router();

productRoutes.get('/list', getProducts)
productRoutes.post('/add', addProducts)
productRoutes.delete('/:id', deleteProduct )
productRoutes.patch('/:id' ,updateProduct )
productRoutes.get('/:id',getOneProduct)

export  default productRoutes