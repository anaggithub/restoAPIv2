import Router from 'express'
import { OrdersController } from './order.controller.js'
import idIsNumber from '../../middlewares/idIsNumber.middleware.js'
import idExists from '../../middlewares/idExists.middleware.js'
import { userIsAdmin } from '../../middlewares/userIsAdmin.middleware.js'

//Si hay un export default no puedo usar las llaves, si no lo hay sí puedo usar las llaves.

const router = Router()

router
    .get('/', userIsAdmin, async (req, res) => {

        try {
            const order = await OrdersController.getAll()
            res.json(order)

        } catch (error) {
            res.status(500).json({ error: 'Error while getting all orders.', message: error })
        }

    })
    .get('/:id', idIsNumber, userIsAdmin, idExists(OrdersController), async (req, res) => {
        try {
            const id = req.params.id
            const order = await OrdersController.getById(id)
            const orderdetail = await OrdersController.getDetailById(id)
            order[0].order_detail = orderdetail
            res.json(order[0])

        } catch (error) {
            res.status(500).json({ error: 'Error while getting order by id', message: error })
        }
    })

    .post('/', async (req, res) => {

        const { total, datetime, user_id, order_status_id, payment_id, order_detail } = req.body

        if (!total || !datetime || !user_id || !order_status_id || !payment_id || !order_detail)

            return res
                .status(400)
                .send({ error: 'Bad request.', message: 'You must send total, datetime, user_id, order_status_id, payment_id, order_detail' })


        try {

            await OrdersController.addOrder(req.body)

            const order_id_result = await OrdersController.getLastUserOrderById(req.body.user_id)
            const order_id = order_id_result[0].order_id

            const order_detail = req.body.order_detail
            await order_detail.forEach(element => {
                const { quantity, product_id } = element
                OrdersController.addDetail({ quantity, product_id, order_id })
            });

            res.status(201).json({ message: 'Order created successfully.' })
        } catch (error) {
            res.status(500).json({ error: 'Error while creating order.', message: error })
        }

    })


    .put('/:id', userIsAdmin, idIsNumber, idExists(OrdersController), async (req, res) => {

        const id = parseInt(req.params.id)

        const { order_status_id } = req.body

        if (!order_status_id)
            return res
                .status(400)
                .send({ error: 'Bad request.', message: 'You must send order_status_id' })

        try {
            const status = parseInt(req.body.order_status_id)
            await OrdersController.updateById(id, status)
            res.status(200).json({ message: 'Order status updated successfully.' })
        } catch (error) {
            res.status(500).json({ error: 'Error while updating order status', message: error })
        }

    })


    .delete('/:id', userIsAdmin, idIsNumber, idExists(OrdersController), async (req, res) => {
        const id = parseInt(req.params.id)

        try {
            await OrdersController.deleteDetailById(id)
            await OrdersController.deleteOrderById(id)

            res.status(200).json({ message: 'Order deleted successfully.' })
        } catch (error) {
            res.status(500).json({ error: 'Error while deleting Order.', message: error })
        }

    })



export default router