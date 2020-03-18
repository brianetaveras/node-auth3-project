const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const apiRoute = require('./router/apiRouter');
const cookieParser = require('cookie-parser');

const server = express();

server.use(cookieParser())
server.use(helmet());
server.use(cors());
server.use(express.json())
server.use('/api', apiRoute);





server.get('/', (req, res)=>{
    res.json({
        message: 'Welcome to my API :)'
    })
})



server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})


server.listen(4000, ()=>{
    console.log(`
    ____________________________________
   |     ___                            |
   |    (^0^) http://localhost:4000     |
   |   /(___)                           |
   |     ^ ^                            |
   |____________________________________|
    
    `)
})
