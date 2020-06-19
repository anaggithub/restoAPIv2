import { OrdersService } from "./order.service.js";
import { Order } from "./order.model.js";
import { OrderDetail } from "./order.model.js";

export class OrdersController {
    static async getAll() {
        return await OrdersService.getAllDB()
    }

    static async getById(id) {
        return await OrdersService.getOrderById(id)
    }


    static async getDetailById(id) {
        return await OrdersService.getDetailById(id)
    }


    static async getLastUserOrderById(id) {
        return await OrdersService.getLastUserOrderById(id)
    }


    static async addOrder({ total, datetime, user_id, order_status_id, payment_id }) {
        const orderObj = new Order(total, datetime, user_id, order_status_id, payment_id)
        return await OrdersService.storeOrder(orderObj)
    }

    static async addDetail({ quantity, product_id, order_id }) {

        try {
            const orderDetailObj = new OrderDetail(quantity, product_id, order_id)
            return await OrdersService.storeDetail(orderDetailObj)
        }

        catch (error) {
            console.log(error)
        }

    }

    static async updateById(id, order_status_id) {       
        return await OrdersService.update(id, order_status_id)
    }

    static async deleteDetailById(id) {
        return await OrdersService.deleteDetail(id)
    }

    static async deleteOrderById(id) {
        return await OrdersService.deleteOrder(id)
    }

}