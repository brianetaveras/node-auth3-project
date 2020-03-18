const db = require('../data/config');
const bcrypt = require('bcryptjs')


class Users{

    async findUser(username){
        return await db('users')
        .select("*")
        .where('username', username)
        .first()
    }
    async findAllUsers(){
        return await db('users')
        .select("*")
    }

    async addUser(data){
        try {
            const { username, password, department } = data;
        
            const hashedPass = await bcrypt.hash(password, 10);
        
            const newUser = await db("users").insert({
              username: username,
              password: hashedPass,
              department: department
            });

            return newUser
        
          } catch (err) {
              throw err
          }
    }



}




module.exports = new Users()