import React, { useState, useEffect, useRef, Suspense } from 'react'
import {
    Routes,
    Route,
    Link,
    HashRouter,
    BrowserRouter,
} from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import Game from './Game/Game'

import Theme from './Theme'
import './App.css'
import { useParams } from 'react-router-dom'
import Iframe from './page/Iframe'
import Nomenu from './page/Nomenu'

function App() {
    const theme = createTheme(Theme)
    const viteBaseUrl = import.meta.env.VITE_BASE_URL

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter basename={`${viteBaseUrl}`}>
                    <Routes>
                        <Route path="/" element={<Game />} />
                        <Route
                            path="everything"
                            element={
                                <Nomenu
                                    url={'https://360xp.co/ismartwebsite/'}
                                />
                            }
                        />
                        <Route
                            path="services"
                            element={
                                <Iframe
                                    url={
                                        'https://360xp.co/ismartwebsite/services/'
                                    }
                                />
                            }
                        />
                        <Route
                            path="about-us"
                            element={
                                <Iframe
                                    url={
                                        'https://360xp.co/ismartwebsite/about-us/'
                                    }
                                />
                            }
                        />
                        <Route
                            path="contact-us"
                            element={
                                <Iframe
                                    url={
                                        'https://360xp.co/ismartwebsite/contact-us/'
                                    }
                                />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    )
}

export default App
