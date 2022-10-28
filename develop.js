import fs from 'fs'
import express from 'express'
import Router from 'express-promise-router'
import { createServer } from 'vite'
import viteConfig from './vite.config.js'
import { Server } from 'socket.io'
import { randomIntFromInterval, randomSpherePoint } from './src/helper.js'

// Create router
const router = Router()

// Create vite front end dev server
const vite = await createServer({
    configFile: false,
    server: {
        middlewareMode: 'html',
    },
    ...viteConfig,
})

// Main route serves the index HTML
router.get('/', async (req, res, next) => {
    let html = fs.readFileSync('index.html', 'utf-8')
    html = await vite.transformIndexHtml(req.url, html)
    res.send(html)
})

// Use vite middleware so it rebuilds frontend
router.use(vite.middlewares)

// Everything else that's not index 404s
router.use('*', (req, res) => {
    res.status(404).send({ message: 'Not Found' })
})

// Create express app and listen on port 4444
const app = express()
app.use(router)
const server = app.listen(process.env.PORT || 4444, () => {
    // console.log(`Listening on port http://localhost:4444...`)
})

// const ioServer = new Server(server)

// let clients = {}

// Socket app msgs
// ioServer.on('connection', (client) => {
// console.log(
//     `User ${client.id} connected, there are currently ${ioServer.engine.clientsCount} users connected`
// )

// const randompoint = randomSpherePoint(-150, 150, 50, 300)

//Add a new client indexed by his id
// clients[client?.id] = {
//     id: client?.id,
//     animation: false,
//     rotation: [0, 0, 0],
//     position: [randompoint[0], 200, randompoint[2]],
// }

// ioServer.sockets.emit('move', clients)

// client.on('move', ({ id, position, rotation, animation }) => {
//     clients[id].id = id
//     clients[id].position = position
//     clients[id].rotation = rotation
//     clients[id].animation = animation

//     ioServer.sockets.emit('move', clients)
// })

// client.on('chat message', (data) => {
//     ioServer.sockets.emit('chat message', data)
// })

// client.on('disconnect', () => {
//     // console.log(`${client.id} got disconnected`)

//     ioServer.sockets.emit(
//         'chat message',
//         `Channel "${client.id}" got disconnected!`
//     )

//     //Delete this client from the object
//     delete clients[client.id]

//     ioServer.sockets.emit('move')
// })
// })
