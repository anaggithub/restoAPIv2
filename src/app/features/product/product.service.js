import { Service } from "../../core/service.js";

export class ProductsService {

    static async getAllDB() {
        return await Service.getQuery('SELECT * FROM product')
    }

    static async getOneById(id) {
        return await Service.getQuery('SELECT * FROM product WHERE product_id = ?', [id])
    }

    static async store(product) {
        return await Service.setQuery('INSERT INTO product VALUES (null, ?, ?, ?, ?)', [
            product.product,
            product.price,  
            product.picture,
            product.product_type_id,                  
        ])
    }

    static async update(id, product) {
       
        return await Service.setQuery('UPDATE product SET product = ?, price = ?, picture = ?, product_type_id = ? WHERE product_id = ?', [      
            product.product,
            product.price,  
            product.picture,
            product.product_type_id,     
            id,      
        ])     
    }

    static async delete(id) {
        return await Service.setQuery('DELETE FROM product WHERE product_id = ?', [id])     
    }


}