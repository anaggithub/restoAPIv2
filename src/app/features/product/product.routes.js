import Router from 'express'
import { ProductsController } from './products.controller.js'
import idIsNumber from '../../middlewares/idIsNumber.middleware.js'
import idExists from '../../middlewares/idExists.middleware.js'
import { userIsAdmin } from '../../middlewares/userIsAdmin.middleware.js'
import { verifyToken } from '../../middlewares/verifyToken.middleware.js'

//Si hay un export default no puedo usar las llaves, si no lo hay sí puedo usar las llaves.

const router = Router()

router
    .get('/', async (req, res) => {

        try {
            const products = await ProductsController.getAll()
            res.status(200)
                .json(products)

        } catch (error) {
            res.status(500).json({ error: 'Error while getting all products.', message: error })
        }

    })
    .get('/:id', verifyToken, userIsAdmin, idIsNumber, idExists(ProductsController), async (req, res) => {
        try {
            const id = req.params.id
            const product = await ProductsController.getById(id)
            res.json(product)
        } catch (error) {
            res.status(500).json({ error: 'Error while getting product by id', message: error })
        }
    })
    .post('/', verifyToken, userIsAdmin, async (req, res) => {

        const { product, price, picture, product_type_id } = req.body

        if (!product || !price || !picture || !product_type_id)

            return res
                .status(400)
                .send({ error: 'Bad request.', message: 'You must send product, price, picture, product_type_id' })

        try {
            await ProductsController.add(req.body)
            res.status(201).json({ message: 'Product created successfully.' })
        } catch (error) {
            res.status(500).json({ error: 'Error while creating product.', message: error })
        }

    })


    .put('/:id', verifyToken, userIsAdmin, idIsNumber, idExists(ProductsController), async (req, res) => {
        const id = parseInt(req.params.id)

        const { product, price, picture, product_type_id } = req.body

        if (!product || !price || !picture || !product_type_id)
            return res
                .status(400)
                .send({ error: 'Bad request.', message: 'You must send product, price, picture, product_type_id' })


        try {
            await ProductsController.updateById(id, req.body)
            res.status(200).json({ message: 'Product updated successfully.' })
        } catch (error) {
            res.status(500).json({ error: 'Error while updating product.', message: error })
        }

    })


    .delete('/:id', verifyToken, userIsAdmin, idIsNumber, idExists(ProductsController), async (req, res) => {
        const id = parseInt(req.params.id)

        try {
            await ProductsController.deleteById(id)
            res.status(200).json({ message: 'Product deleted successfully.' })
        } catch (error) {
            res.status(500).json({ error: 'Error while deleting product.', message: error })
        }

    })


export default router

