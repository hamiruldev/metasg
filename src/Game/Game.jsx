import React, { useState, useEffect, useRef, Suspense } from 'react'
import _uniqueId from 'lodash/uniqueId'

import {
    Cylinder,
    Environment,
    Torus,
    Dummy,
    Group,
    Model,
    Setup,
    ThirdPersonCamera,
    usePreload,
    useWindowSize,
    World,
    Joystick,
    LingoEditor,
    HTMLMesh,
    Water,
    Cube,
    HTML,
    UI,
    SkyLight,
    Trigger,
    Sphere,
    AmbientLight,
    Find,
    AreaLight,
    Reflector,
    SpotLight,
} from 'lingo3d-react'

// Basiir comment
// import { io } from 'socket.io-client'

import { Button, CssBaseline, CircularProgress } from '@mui/material'
// import TouchAppTwoToneIcon from '@mui/icons-material/TouchAppTwoTone'

import ResponsiveDrawer from '../component/Drawer'
// import { serverPlayerOnly, textLimit } from '../helper'
import { panelFrame, panelObj } from '../../public/dummy/dummy'

const viteBaseUrl = import.meta.env.VITE_BASE_URL

const Game = () => {
    const progress = usePreload(
        [
            `${viteBaseUrl}/maps/v2/map.glb`,
            `${viteBaseUrl}/3dCharacter/new/character.fbx`,
            `${viteBaseUrl}/3dCharacter/new/BreathingIdle.fbx`,
            `${viteBaseUrl}/3dCharacter/new/Running.fbx`,
            `${viteBaseUrl}/skyBox/sky.jpg`,
        ],
        15555900
    )

    // Hamirul
    // const [socketCon, setSocketCon] = useState(false)
    // const [socket, setSocket] = useState(null)
    // const [server, setServer] = useState()
    // const [running, setRunning] = useState(false)
    // const [isVisible, setVisible] = useState(false)
    //const [arrowPosition, setArrowPosition] = useState({x: 0,
    //     y: 0,
    //     z: 0,
    // })

    //Basiir
    const [running, setRunning] = useState(false)
    const [arrowPosition, setArrowPosition] = useState({ x: 0, y: 0, z: 0 })
    const [idTv] = useState(_uniqueId('tvkey-'))
    const [idpf] = useState(_uniqueId('pfkey-'))
    const [idrpf] = useState(_uniqueId('rpfkey-'))

    //PLAYER
    const dummyRef = useRef(null)
    const textRef = useRef(null)

    const remoteRef = useRef(null)
    const boothRef = useRef(null)

    const { width } = useWindowSize()

    const handleClick = (ev) => {
        // const { id } = socket
        const dummy = dummyRef.current
        const textName = textRef.current

        if (!dummy && !textName) return

        setArrowPosition(ev.point)

        textName?.lookTo(ev.point.x, undefined, ev.point.z, 0.1)
        textName?.moveTo(ev.point.x, undefined, ev.point.z, 5)

        dummy?.lookTo(ev.point.x, undefined, ev.point.z, 0.1)
        dummy?.moveTo(ev.point.x, undefined, ev.point.z, 5)

        setRunning(true)

        dummy.onMoveToEnd = () => {
            setRunning(false)
        }
    }

    const movePlayer = (ev) => {
        // const { id } = socket
        const dummy = dummyRef.current
        const textName = textRef.current

        if (!dummy && !textName) return

        dummy?.lookTo(ev.point.x + 100, undefined, ev.point.z + 100, 0.1)
        dummy?.moveTo(ev.point.x + 100, undefined, ev.point.z + 100, 10)

        textName?.lookTo(ev.point.x + 100, undefined, ev.point.z + 100, 0.1)
        textName?.moveTo(ev.point.x + 100, undefined, ev.point.z + 100, 10)

        setArrowPosition(ev.point)

        setRunning(true)

        dummy.onMoveToEnd = () => {
            setRunning(false)
        }
    }

    return (
        <>
            {progress < 100 && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        textAlign: 'center',
                        backgroundColor: 'black',
                        color: 'white',
                    }}
                >
                    {/* {`${Math.round(progress)}% `} */}

                    <img src={`${viteBaseUrl}/preloader/preloader.gif`} />
                    <br />
                    {/* <CircularProgress variant="determinate" value={progress} /> */}
                    {/* loading... */}
                </div>
            )}

            {progress == 100 && (
                <>
                    <World>
                        {/* <LingoEditor /> */}
                        {/* <Environment /> */}
                        <UI>
                            <ResponsiveDrawer />
                        </UI>

                        <Suspense fallback={null}>
                            <Setup
                                // bloom
                                // motionBlur
                                pbr
                                // bloomStrength={0.4}
                                defaultLight={true}
                                pixelRatio={5}
                            />
                        </Suspense>

                        <AreaLight
                            x={-131.62}
                            y={52.2}
                            z={-6166.49}
                            rotationX={46.66}
                            rotationY={-0.71}
                            rotationZ={-1.48}
                            scale={94.23}
                            scaleX={34.69}
                            scaleY={2.76}
                            scaleZ={0.0}
                            // intensity={0.01}
                            color="#ffbd46"
                        />

                        <AreaLight
                            x={-1812.64}
                            y={-178.63}
                            z={-1473.34}
                            rotationX={89.93}
                            rotationY={51.55}
                            rotationZ={-89.36}
                            scale={94.23}
                            scaleX={94.23}
                            scaleY={7.74}
                            scaleZ={0.0}
                            // intensity={0.01}
                            color="#ffbd46"
                        />

                        <AreaLight
                            x={1605.44}
                            y={-178.63}
                            z={-1473.34}
                            rotationX={89.93}
                            rotationY={-51.55}
                            rotationZ={-89.36}
                            scale={94.23}
                            scaleX={94.23}
                            scaleY={7.74}
                            scaleZ={0.0}
                            // intensity={0.01}
                            color="#ffbd46"
                        />

                        <Model
                            name="worldmap"
                            physics="map"
                            ref={boothRef}
                            width={245.36}
                            depth={245.36}
                            x={-149.17}
                            y={1494.28}
                            z={-1113.66}
                            scale={30}
                            onClick={(ev) => {
                                handleClick(ev)
                            }}
                            src={`${viteBaseUrl}/maps/v2/map.glb`}
                        >
                            {panelObj?.map((item, idTv) => {
                                return (
                                    <>
                                        <Find
                                            key={idTv}
                                            name={item?.name}
                                            bloom={item?.bloom}
                                            // texture={item?.texture}
                                            // texture={`${viteBaseUrl}/${item?.texture}`}
                                            textureFlipY={item?.textureFlipY}
                                            textureRotation={
                                                item?.textureRotation
                                            }
                                            videoTexture={`${viteBaseUrl}/${item?.videoTexture}`}
                                            color={item?.color}
                                            emissiveColor="#626262"
                                            emissiveIntensity={0.3}
                                            onClick={(e) => {
                                                movePlayer(e)
                                            }}
                                        ></Find>
                                    </>
                                )
                            })}

                            <Find bloom name="Line001" color="#ffffff" />

                            <Find bloom name="Box050" color="#ffffff" />
                            <Find bloom name="Box057" color="#ffffff" />

                            <Find bloom name="ceilinglight" color="#ffffff" />

                            <Find bloom name="Box050" color="#ffffff" />
                            <Find bloom name="Box057" color="#ffffff" />
                            <Find bloom name="Box058" color="#ffffff" />

                            {panelFrame?.map((item, idpf) => {
                                ;<Find
                                    key={idpf}
                                    bloom
                                    name={item?.name}
                                    color="#ffffff"
                                />
                            })}
                        </Model>

                        <ThirdPersonCamera
                            enableDamping
                            active={true}
                            mouseControl={'drag'}
                            lockTargetRotation={false}
                            fov={width < 640 ? 120 : 90}
                            innerY={90}
                            innerZ={150}
                            innerX={70}
                            y={1}
                            zoom={1}
                        >
                            <Dummy
                                ref={dummyRef}
                                id="player"
                                name="player"
                                physics="character"
                                width={50}
                                depth={50}
                                scale={1}
                                x={-54.47}
                                z={3250.26}
                                y={50.3}
                                rotationX={180}
                                rotationY={-22.37}
                                rotationZ={180}
                                src={`${viteBaseUrl}/3dCharacter/new/character.fbx`}
                                animation={running ? 'running' : 'idle'}
                                animations={{
                                    idle: `${viteBaseUrl}/3dCharacter/new/BreathingIdle.fbx`,
                                    running: `${viteBaseUrl}/3dCharacter/new/Running.fbx`,
                                }}
                            />
                        </ThirdPersonCamera>

                        {running && (
                            <>
                                <Group>
                                    <Torus
                                        x={arrowPosition.x}
                                        y={arrowPosition.y + 10}
                                        z={arrowPosition.z}
                                        height={100}
                                        depth={100}
                                        width={72.99}
                                        emissiveColor="#ff0000"
                                        color="#ff4e4e"
                                        rotationX={90}
                                        animation={{
                                            scale: [0, 1, 1, 0],
                                        }}
                                        scaleX={0.21}
                                        scaleY={0.24}
                                        scaleZ={0.13}
                                        normalScale={{ x: 1, y: 1 }}
                                    />
                                    <Torus
                                        x={arrowPosition.x}
                                        y={arrowPosition.y + 10}
                                        z={arrowPosition.z}
                                        height={100}
                                        depth={100}
                                        width={72.99}
                                        emissiveColor="#ff0000"
                                        color="#ff4e4e"
                                        rotationX={90}
                                        animation={{
                                            scale: [0, 1, 1, 0],
                                        }}
                                        scaleX={0.5}
                                        scaleY={0.5}
                                        scaleZ={1.64}
                                        normalScale={{ x: 1, y: 1 }}
                                    />
                                    <Cylinder
                                        bloom
                                        x={arrowPosition.x}
                                        y={arrowPosition.y + 10}
                                        z={arrowPosition.z}
                                        height={200}
                                        width={72.99}
                                        depth={100}
                                        emissiveColor="#ff0000"
                                        color="#ff4e4e"
                                        animation={{
                                            scale: [0, 0.09, 0.05, 0],
                                        }}
                                        scaleX={0.02}
                                        scaleY={0.46}
                                        scaleZ={0.03}
                                        normalScale={{ x: 1, y: 1 }}
                                    />
                                </Group>
                            </>
                        )}

                        {panelFrame?.map((item, idrpf) => {
                            <Find
                                key={idrpf}
                                name={item?.name}
                                color="#ffffff"
                            />
                        })}
                    </World>
                </>
            )}
        </>
    )
}

export default Game
