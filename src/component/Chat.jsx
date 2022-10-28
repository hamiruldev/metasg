import React, { useState } from 'react'
import {
    Box,
    Stack,
    Typography,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material'
import { FixedSizeList } from 'react-window'
import channel from '../../socket'

const Chat = () => {
    const { id } = channel

    const [serverMessage, setServerMessage] = useState([
        { id: id, msg: 'hello from me' },
    ])

    const appendMessage = (data) => {
        const list = document.getElementById('list')
        if (list) {
            const li = document.createElement('li')
            li.innerHTML = data?.msg
            list.appendChild(li)
        }
    }

    const setMessage = () => {
        const txt = document.getElementById('text')
        const datamsg = { id: id, msg: txt.value }
        channel.emit('chat message', datamsg)
    }

    channel.on('chat message', (data) => {
        appendMessage(data)
    })

    // console.log('channel', channel)

    return (
        <>
            <Box
                sx={{
                    width: 'max-content',
                    height: 'max-content',
                    display: 'flex',
                    justifyContent: ' center',
                    alignItems: 'flex-start',
                    position: 'absolute',
                    bottom: '2vh',
                    right: '3vw',
                    flexDirection: 'column',
                    backgroundColor: 'black',
                    color: 'white',
                    padding: '1%',
                    borderRadius: '7px',
                    mb: 2,
                    pb: 2,
                }}
            >
                <Stack direction={'column-reverse'}>
                    <Typography variant="span">message from</Typography>
                    <ul id="list"></ul>
                </Stack>
                <Stack direction={'row'}>
                    <input type="text" id="text" />
                    <button
                        onClick={() => {
                            setMessage()
                        }}
                    >
                        sent message
                    </button>
                </Stack>
            </Box>
        </>
    )
}

export default Chat
