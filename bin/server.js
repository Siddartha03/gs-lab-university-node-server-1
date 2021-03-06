require('dotenv').config()
const http = require('http')
const app = require('../app')
const PORT = process.env.PORT || 4200

const server = http.createServer(app)

server.listen(PORT, (err) => {
    if(!err) {
        console.log(`Server Started at localhost:${PORT}`)
    }
})