import { LoginService } from "./login.service.js";
import config from '../../../config/index.js'
import jwt from 'jsonwebtoken';
import { Login } from "./login.model.js";

export class LoginController {

  static async login(username, password) {

    const loginObj = new Login(username, password)
    const findUser = await LoginService.login(loginObj)

    if (findUser.length === 1) {

      try {
        const token = jwt.sign(findUser[0], config.JWT.PRIVATE_KEY)
        return token
      }

      catch (error) {
        console.log('Error al generar token:' + error)
        return null
      }

    }
    else {    
      return null
    }
  }
}