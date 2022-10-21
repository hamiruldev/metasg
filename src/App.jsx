import React, { useState, useEffect, useRef, Suspense } from 'react'
import { Routes, Route, Link, HashRouter, BrowserRouter } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'

import Game from './Game/Game'

import Theme from './Theme'
import './App.css'
import { useParams } from 'react-router-dom'
import Iframe from './page/Iframe';

function App() {
    const theme = createTheme(Theme);
    const viteBaseUrl = import.meta.env.VITE_BASE_URL;

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter basename={`${viteBaseUrl}`}>
                    <Routes>
                        <Route path="/" element={<Game />} />
                        <Route path="everything" element={<Iframe url={"https://360xp.co/ismartwebsite/index/"} />} />
                        <Route path="services" element={<Iframe url={"https://360xp.co/ismartwebsite/services/"} />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    )
}

export default App
