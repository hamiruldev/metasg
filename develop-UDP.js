import fs from 'fs'
import express from 'express'
import Router from 'express-promise-router'
import { createServer } from 'vite'
import viteConfig from './vite.config.js'
import { Server } from 'socket.io'
import { randomIntFromInterval, randomSpherePoint } from './src/helper.js'
import http from 'http'

import geckos, { iceServers } from '@geckos.io/server'

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

// Create express app and listen on port 8080
const app = express()
app.use(router)

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
//geckos.io

let clients = {}

// have to user server instead of app
server.listen(4444, () => {
    console.log('express is on http://localhost:4444')
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
