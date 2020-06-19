import jwt from 'jsonwebtoken';
import config from '../../config/index.js'


export const verifyToken = (req, res, next) => {

  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {

    try {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]

      jwt.verify(bearerToken, config.JWT.PRIVATE_KEY)
      next()     

    } catch (error) {
      res
        .status(401)
        .send({ error: 'Unauthorized.', message: 'Token verification failed. Error: ' + error })
    }
  }

  else {
    res
      .status(401)
      .send({ error: 'Unauthorized.', message: 'There is no token on headers or accesing a route that does not exist' })
  }
}