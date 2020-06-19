import { UserService } from "./user.service.js";
import { User } from "./user.model.js";

export class UserController {
    static async getAll() {
        return await UserService.getAllDB()
    }

    static async getById(id) {      
        return await UserService.getOneById(id)
    }

    static async add({ user_id, username, name, lastname, email, address, password, province_id, role_id }) {
        const userObj = new User(user_id, username, name, lastname, email, address, password, province_id, role_id)
        return await UserService.store(userObj)
    }
  
    static async updateById(id, { user_id, username, name, lastname, email, address, password, province_id, role_id }) {
        const userObj = new User(user_id, username, name, lastname, email, address, password, province_id, role_id)
        return await UserService.update(id, userObj)
    }
    
    static async deleteById(id) {       
        return await UserService.delete(id)
    }
}

