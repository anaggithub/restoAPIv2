import config from '../../config/index.js'
import jwt from 'jsonwebtoken';



export const userIsAdmin = (req, res, next) => {
  
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {

    try {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]

      const data = jwt.verify(bearerToken, config.JWT.PRIVATE_KEY)
   
      
      if (data.role_id === 1) {
        next()
      } else {
        res
          .status(403)
          .send({ error: 'Forbidden.', message: 'Access denied.' })
      }
    } catch (error) {
      res
        .status(401)
        .send({ error: 'Unauthorized.', message: 'Rol verification failed. Error: ' + error })
    }
  }

  else {
    res
      .status(401)
      .send({ error: 'Unauthorized.', message: 'There is no token on headers or accesing a route that does not exist' })
  }
  }

