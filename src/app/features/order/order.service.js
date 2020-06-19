import { Service } from "../../core/service.js";

export class OrdersService {

    static async getAllDB() {
        return await Service.getQuery(
            `
        SELECT o.order_id, o.total, o.datetime, s.order_status, p.payment, u.username, u.address
        FROM \`order\` o
        JOIN order_status s ON o.order_status_id = s.order_status_id
        JOIN payment p ON o.payment_id = p.payment_id
        JOIN user u ON o.user_id = u.user_id   
        ORDER BY o.datetime     
        `
        )
    }

    static async getOrderById(id) {
        return await Service.getQuery(
        `
        SELECT o.order_id, o.total, o.datetime, s.order_status, p.payment, u.username, u.address
        FROM \`order\` o
        JOIN order_status s ON o.order_status_id = s.order_status_id
        JOIN payment p ON o.payment_id = p.payment_id
        JOIN user u ON o.user_id = u.user_id     
        WHERE o.order_id = ?
        `, [id])
    }


    static async getDetailById(id) {
        return await Service.getQuery(
            `
        SELECT t.product_type, p.product, d.quantity
        FROM  order_detail d        
        JOIN product p ON d.product_id = p.product_id 
        JOIN product_type t ON p.product_type_id = t.product_type_id     
        WHERE d.order_id = ?
        `, [id])
    }


    static async getLastUserOrderById(id) {
        return await Service.getQuery(
        `
        SELECT MAX(o.order_id) as order_id
        FROM \`order\` o     
        WHERE o.user_id = ?
        
        `, [id])
    }


    static async storeOrder(order) {
        return await Service.setQuery('INSERT INTO \`order\` VALUES (null, ?, ?, ?, ?, ?)', [
            order.total,
            order.datetime,
            order.user_id,
            order.order_status_id,
            order.payment_id
        ])
    }

    static async storeDetail(order_detail) {
        return await Service.setQuery('INSERT INTO order_detail VALUES (null, ?, ?, ?)', [
            order_detail.quantity,
            order_detail.product_id,
            order_detail.order_id,
        ])
    }

    static async update(id, order_status_id) {
        return await Service.setQuery('UPDATE \`order\` SET order_status_id = ? WHERE order_id = ?', [         
            order_status_id,
            id,
        ])
    }

    static async deleteDetail(id) {
        return await Service.setQuery('DELETE FROM order_detail WHERE order_id = ?', [id])
    }

    static async deleteOrder(id) {
        return await Service.setQuery('DELETE FROM \`order\` WHERE order_id = ?', [id])
    }
}