import geckos from '@geckos.io/client'

const channel = geckos({ port: null, authorization: 'UNIQUE_TOKEN' })

// console.log('location.origin', location.origin)
// console.log('channel', channel)

channel.onConnect((error) => {
    if (error) {
        // console.error(error.message)
        // console.log('Status : ', error.status)
        // console.log('StatusText: ', error.statusText)
        return
    } else {
        // console.log('You are connected', channel.id)
    }

    channel.onDisconnect(() => {
        // console.log('You got disconnected')
    })

    channel.onRaw((rawMessage) => {
        // console.log('rawMessage', rawMessage)
    })

    // sending a raw message
    setTimeout(() => {
        const buffer = new ArrayBuffer(2)
        const bufferView = new DataView(buffer)
        bufferView.setInt8(0, 5)
        bufferView.setInt8(1, 12)
        channel.raw.emit(buffer)
    }, 5000)
})

export default channel
