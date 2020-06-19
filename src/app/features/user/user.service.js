import { Service } from "../../core/service.js";

export class UserService {

    static async getAllDB() {
        return await Service.getQuery('SELECT * FROM user')
    }

    static async getOneById(id) {
        return await Service.getQuery('SELECT * FROM user WHERE user_id = ?', [id])
    }

    static async store(user) {
        return await Service.setQuery('INSERT INTO user VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?)', [
            user.username,
            user.name,  
            user.lastname,                  
            user.email,
            user.address,
            user.password,
            user.province_id,
            user.role_id,
        ])
    }

    static async update(id, user) {
       
        return await Service.setQuery('UPDATE user SET username = ?, name = ?, lastname = ?, email = ?, address = ?, password = ?, province_id = ?, role_id = ? WHERE user_id = ?', [      
            user.username,
            user.name,  
            user.lastname,                  
            user.email,
            user.address,
            user.password,
            user.province_id,
            user.role_id,   
            id,      
        ])     
    }

    static async delete(id) {
        return await Service.setQuery('DELETE FROM user WHERE user_id = ?', [id])     
    }


}