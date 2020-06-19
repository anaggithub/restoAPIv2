import Router from 'express'
import { LoginController } from './login.controller.js'

const router = Router()

router.get('/', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password)
    return res
      .status(400)
      .send({ error: 'Bad request.', message: 'You must send username and password' })

  try {
     
    const token = await LoginController.login(username, password)
    
     if (token) {
      res.status(200).json({ message: 'Logged in successfully.', token })
    } else {
      res
        .status(401)
        .send({ error: 'Unauthorized.', message: 'Wrong username or password.' })
    }
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong while logging in.',
      message: error
    })
  }
})

export default router