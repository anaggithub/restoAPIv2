export class Order {
    constructor(total, datetime, user_id, order_status_id, payment_id) {        
        this.total = total
        this.datetime = datetime   
        this.user_id = user_id
        this.order_status_id = order_status_id     
        this.payment_id = payment_id
    }
}


export class OrderDetail {
    constructor(quantity, product_id, order_id) {  
        this.quantity =quantity
        this.product_id = product_id           
        this.order_id = order_id      
    }
}