import fs from 'fs'
import express from 'express'
import Router from 'express-promise-router'
import { Server } from 'socket.io'
import { randomSpherePoint } from './src/helper.js'
import { createServer } from 'http'

// Create router
const router = Router()

// Main route serves the index HTML
router.get('/', async (req, res, next) => {
    let html = fs.readFileSync('index.html', 'utf-8')
    res.send(html)
})

// Everything else that's not index 404s
router.use('*', (req, res) => {
    res.status(404).send({ message: 'Not Found' })
})

// Create express app and listen on port 4444
const app = express()
app.use(express.static('dist'))
app.use(router)

const httpServer = createServer(app)

const ioServer = new Server(httpServer)

let clients = {}

// Socket app msgs
ioServer.on('connection', (client) => {
    console.log(
        `User ${client.id} connected, there are currently ${ioServer.engine.clientsCount} users connected`
    )

    const randompoint = randomSpherePoint(-150, 150, 50, 300)

    //Add a new client indexed by his id
    clients[client?.id] = {
        id: client?.id,
        animation: false,
        rotation: [0, 0, 0],
        position: [randompoint[0], 250, randompoint[2]],
    }

    ioServer.sockets.emit('move', clients)

    client.on('move', ({ id, position, rotation, animation }) => {
        clients[id].id = id
        clients[id].position = position
        clients[id].rotation = rotation
        clients[id].animation = animation

        ioServer.sockets.emit('move', clients)
    })

    client.on('chat message', (data) => {
        ioServer.sockets.emit('chat message', data)
    })

    client.on('disconnect', () => {
        console.log(`${client.id} got disconnected`)

        ioServer.sockets.emit(
            'chat message',
            `Channel "${client.id}" got disconnected!`
        )

        //Delete this client from the object
        delete clients[client.id]

        ioServer.sockets.emit('move', clients)
    })
})

httpServer.listen(process.env.PORT || 4444, () => {
    console.log(`Listening on port http://localhost:4444...`)
})
