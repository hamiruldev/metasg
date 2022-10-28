import fs from 'fs'
import express from 'express'
import Router from 'express-promise-router'
import { Server } from 'socket.io'
import { randomIntFromInterval, randomSpherePoint } from './src/helper.js'

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

// Create express app and listen on port 8080
const app = express()
app.use(express.static('dist'))
app.use(router)
const server = app.listen(process.env.PORT || 4444, () => {
    // console.log(`Listening on port http://localhost:8080...`)
})

const ioServer = new Server(server)

let clients = {}

// Socket app msgs
ioServer.on('connection', (client) => {
    // console.log(
    //     `User ${client.id} connected, there are currently ${ioServer.engine.clientsCount} users connected`
    // )

    const rndInt = randomIntFromInterval(-20, 20)
    const randompoint = randomSpherePoint(-150, 150, 50, 300)

    //Add a new client indexed by his id
    clients[client?.id] = {
        id: client?.id,
        animation: false,
        rotation: [0, 0, 0],
        position: [randompoint[0], 0, randompoint[2]],
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
        // console.log(`${client.id} got disconnected`)

        //Delete this client from the object
        delete clients[client.id]

        ioServer.sockets.emit(
            'chat message',
            `Channel "${client.id}" got disconnected!`
        )

        ioServer.sockets.emit('move')
    })
})
