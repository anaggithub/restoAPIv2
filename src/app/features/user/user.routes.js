import Router from 'express'
import { UserController } from './user.controller.js'
import idIsNumber from '../../middlewares/idIsNumber.middleware.js'
import idExists from '../../middlewares/idExists.middleware.js'
import { userIsAdmin } from '../../middlewares/userIsAdmin.middleware.js'
import { verifyToken } from '../../middlewares/verifyToken.middleware.js'



const router = Router()

router
    .get('/', verifyToken, userIsAdmin, async (req, res) => {

        try {
            const users = await UserController.getAll()
            res.status(200)
                .json(users)            

        } catch (error) {
            res.status(500).json({ error: 'Error while getting all users.', message: error })
        }

    })

    .get('/:id', verifyToken, userIsAdmin, idIsNumber, idExists(UserController), async (req, res) => {
        try {
            const id = req.params.id
            const user = await UserController.getById(id)
            res.json(user)
            .status(200)
        } catch (error) {
            res.status(500).json({ error: 'Error while getting user by id', message: error })
        }
    })

    .post('/', async (req, res) => {

        const { username, name, lastname, email, address, password, province_id, role_id } = req.body

        if (!username || !name || !lastname || !email || !address || !password || !province_id || !role_id   )

            return res
            .status(400)
            .send({ error: 'Bad request.', message: 'You must send  username, name, lastname, email, address, password, province_id and role_id' })


        try {
            //     const rol = req.body.role_id

            //   if (rol !== 1) {
            await UserController.add(req.body)
            res.status(201).json({ message: 'User created successfully.' })

            // }
            //else {
            //     res.status(403)
            //       .send({ error: 'Unauthorized.', message: 'Not allowed to create more admin users.' })
            // }


        } catch (error) {
            res.status(500).json({ error: 'Error while creating user.', message: error })
        }

    })


    .put('/:id', verifyToken, idIsNumber, idIsNumber, userIsAdmin, idExists(UserController), async (req, res) => {
       
       
        const id = parseInt(req.params.id)

        const { username, name, lastname, email, address, password, province_id, role_id } = req.body

        if (!username || !name || !lastname || !email || !address || !password || !province_id || !role_id)

            return res
            .status(400)
            .send({ error: 'Bad request.', message: 'You must send  username, name, lastname, email, address, password, province_id and role_id' })


        try {
        //    const rol = req.body.role_id

       //     if (rol !== 1) {
                await UserController.updateById(id, req.body)
                res.status(201).json({ message: 'User updated successfully.' })
            //}
         //   else {
           //     res.status(403)
             //       .send({ error: 'Forbidden.', message: 'Not allowed to edit admin user or normal users rol.' })
           // }
        } catch (error) {
            res.status(500).json({ error: 'Error while updating user.', message: error })
        }

    })

    .delete('/:id', verifyToken, userIsAdmin, idIsNumber, idExists(UserController), async (req, res) => {

        const id = parseInt(req.params.id)

        try {
            const user = await UserController.getById(id)

            if (user[0].role_id !== 1) {
                await UserController.deleteById(id)
                res.status(200).json({ message: 'User deleted successfully.' })
            }
            else {
                res.status(403)
                    .send({ error: 'Unauthorized.', message: 'Not allowed to delete admin user.' })
            }

        } catch (error) {
            res.status(500).json({ error: 'Error while deleting user.', message: error })
        }

    })

export default router