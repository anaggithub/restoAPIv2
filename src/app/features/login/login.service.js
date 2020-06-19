import { Service } from "../../core/service.js";

export class LoginService {
    static async login (login) {
      return await Service.getQuery(
        `
        SELECT u.user_id, u.name, u.lastname, u.email, u.role_id
        FROM  user u 
        WHERE u.username = ?
        AND u.password = ?`,
          [login.username, login.password]
      )
    }
  }