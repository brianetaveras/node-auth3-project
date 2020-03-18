const jwt = require('jsonwebtoken');
const db = require('../data/config')
function verifyUser(){
    return async (req, res, next)=>{
        try{
            const decodedJson = await jwt.verify(req.cookies.token, process.env.JWT_SECRET)

            const user = await db('users')
                        .select("*").
                        where('id', decodedJson.id)
                        .first()

            if(user){
                next()

            }

        } catch(err){
            res.status(400).json({
                message: "Oops! Seems like your token is not valid :("
            })
        }
    }
}



module.exports = verifyUser