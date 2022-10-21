import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Routes, Route, Link } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'

import Game from './Game/Game'

import Theme from './Theme'
import './App.css'
import { useParams } from 'react-router-dom'
import Iframe from './page/Iframe';

function App() {


    const theme = createTheme(Theme);

    const route = useParams()
    console.log("route -->", route);

    return (
        <>

            <ThemeProvider theme={theme}>

                <CssBaseline />
                <Routes>
                    <Route path="/" element={<Game />} />
                    <Route path="everything" element={<Iframe url={"https://360xp.co/ismartwebsite/index/"} />} />
                    <Route path="services" element={<Iframe url={"https://360xp.co/ismartwebsite/services/"} />} />
                </Routes>

            </ThemeProvider>

        </>
    )
}

export default App
