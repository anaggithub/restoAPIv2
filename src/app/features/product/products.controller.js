import { ProductsService } from "./product.service.js";
import { Product } from "./product.model.js";

export class ProductsController {
    static async getAll() {
        return await ProductsService.getAllDB()
    }

    static async getById(id) {    
        return await ProductsService.getOneById(id)        
    }

    static async add({ product_id, product, price, picture, product_type_id }) {
        const productObj = new Product(product_id, product, price, picture, product_type_id)
        return await ProductsService.store(productObj)
    }
  
    static async updateById(id, { product_id, product, price, picture, product_type_id }) {
        const productObj = new Product(product_id, product, price, picture, product_type_id)
        return await ProductsService.update(id, productObj)
    }
    
    static async deleteById(id) {       
        return await ProductsService.delete(id)
    }
}

