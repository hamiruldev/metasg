import fs from 'fs'
import express from 'express'
import Router from 'express-promise-router'
import { Server } from 'socket.io'
import { randomIntFromInterval, randomSpherePoint } from './src/helper.js'

import http from 'http'
import geckos, { iceServers } from '@geckos.io/server'

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
// const server = app.listen(process.env.PORT || 8080, () => {
//     console.log(`Listening on port http://localhost:8080...`)
// })

// const ioServer = new Server(server)

const server = http.createServer(app)

//geckos.io
const ioServer = geckos({
    iceServers: process.env.NODE_ENV === 'production' ? iceServers : [],
    authorization: async (auth, request) => {
        // console.log('auth', auth)
        // console.log('ip', request.connection.remoteAddress)
        // console.log('ip (behind proxy)', request.headers['x-forwarded-for'])
        return true
    },
})

ioServer.addServer(server)

let clients = {}

// have to user server instead of app
// server.listen(4444, () => {
//     console.log('express is on http://localhost:4444')
// })

const PORT = process.env.PORT || 4444
server.listen(PORT, function () {
    console.log('Server is now running on port ' + PORT)
})

// Socket app msgs
ioServer.onConnection((channel) => {
    channel.onDisconnect(() => {
        console.log(`${channel.id} got disconnected`)

        //Delete this client from the object
        delete clients[channel.id]

        ioServer.emit(
            'chat message',
            `Channel "${channel.id}" got disconnected!`
        )

        ioServer.emit('move')
    })

    console.log(
        `User ${channel.id} connected, there are currently ${channel?.webrtcConnection?.connections?.size} users connected`
    )

    const rndInt = randomIntFromInterval(-20, 20)
    const randompoint = randomSpherePoint(-150, 150, 50, 300)

    //Add a new client indexed by his id
    clients[channel?.id] = {
        id: channel?.id,
        animation: false,
        rotation: [0, 0, 0],
        position: [randompoint[0], 0, randompoint[2]],
    }

    ioServer.emit('move', clients)

    channel.on('chat message', (data) => {
        ioServer.emit('chat message', data)
    })

    channel.on('move', ({ id, position, rotation, animation }) => {
        clients[id].id = id
        clients[id].animation = animation
        clients[id].rotation = rotation
        clients[id].position = position

        ioServer.emit('move', clients)
    })
})
