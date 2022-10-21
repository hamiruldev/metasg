import React, { useState, useEffect, useRef, Suspense } from 'react'

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
    Reflector
} from 'lingo3d-react'

import { io } from 'socket.io-client'

import { Button, CssBaseline } from '@mui/material'
import TouchAppTwoToneIcon from '@mui/icons-material/TouchAppTwoTone'

import ResponsiveDrawer from '../component/Drawer'
import { serverPlayerOnly, textLimit } from '../helper'
import { panelObj } from '../../public/dummy/dummy'

const Game = () => {
    const progress = usePreload(
        [
            'maps/v2/map.glb',
            '3dCharacter/character.fbx',
            '3dCharacter/BreathingIdle.fbx',
            '3dCharacter/Running.fbx',
            'skyBox/sky.jpg',
        ],
        15555900
    )

    const [socketCon, setSocketCon] = useState(false)
    const [socket, setSocket] = useState(null)
    const [server, setServer] = useState()
    const [running, setRunning] = useState(false)
    const [isVisible, setVisible] = useState(false)

    const [arrowPosition, setArrowPosition] = useState({
        x: 0,
        y: 0,
        z: 0,
    })

    //PLAYER
    const dummyRef = useRef(null)
    const textRef = useRef(null)
    const remoteTextRef = useRef(null)

    const remoteRef = useRef(null)
    const boothRef = useRef(null)
    const refWorld = useRef(null)
    const spaceFighterRef = useRef(null)

    const remoteData = remoteRef?.current
    const remoteTextData = remoteTextRef?.current

    const { width } = useWindowSize()

    const handleClick = (ev) => {
        const { id } = socket
        const dummy = dummyRef.current
        const textName = textRef.current

        if (!dummy && !textName) return

        setArrowPosition(ev.point)

        textName?.lookTo(ev.point.x, undefined, ev.point.z, 0.1)
        textName?.moveTo(ev.point.x, undefined, ev.point.z, 5)

        dummy?.lookTo(ev.point.x, undefined, ev.point.z, 0.1)
        dummy?.moveTo(ev.point.x, undefined, ev.point.z, 5)

        setRunning(true)

        socket?.emit('move', {
            id: id,
            rotation: [dummy.rotationX, dummy.rotationY, dummy.rotationZ],
            position: Object.values(ev.point),
            animation: true,
        })

        dummy.onMoveToEnd = () => {
            setRunning(false)
            socket?.emit('move', {
                id: id,
                rotation: [dummy.rotationX, dummy.rotationY, dummy.rotationZ],
                position: Object.values(ev.point),
                animation: false,
            })
        }
    }

    const movePlayer = (ev) => {
        const { id } = socket
        const dummy = dummyRef.current
        const textName = textRef.current

        if (!dummy && !textName) return

        dummy?.lookTo(ev.point.x, undefined, ev.point.z, 0.1)
        dummy?.moveTo(ev.point.x, undefined, ev.point.z, 10)

        textName?.lookTo(ev.point.x, undefined, ev.point.z, 0.1)
        textName?.moveTo(ev.point.x, undefined, ev.point.z, 10)

        setArrowPosition(ev.point)

        setRunning(true)

        socket?.emit('move', {
            id: id,
            rotation: [dummy.rotationX, dummy.rotationY, dummy.rotationZ],
            position: Object.values(ev.point),
            animation: true,
        })

        dummy.onMoveToEnd = () => {
            setRunning(false)
            socket?.emit('move', {
                id: id,
                rotation: [dummy.rotationX, dummy.rotationY, dummy.rotationZ],
                position: Object.values(ev.point),
                animation: false,
            })
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setSocketCon(true)
        }, 7000)
        // On mount initialize the socket connection
        if (socketCon == true) {
            socket == null ? setSocket(io('')) : socket.disconnect()
        }

        return () => {
            if (socket) {
                socket.disconnect()
            }
        }
    }, [socketCon])

    useEffect(() => {
        socket &&
            socket?.on('move', (clients) => {
                setServer(serverPlayerOnly(Object?.values(clients), socket.id))
            })
    }, [socket])

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
                    }}
                >
                    {`${Math.round(progress)}% `}
                    <br />
                    loading...
                </div>
            )}

            {progress == 100 && (
                <>
                    <World>
                        {/* <LingoEditor /> */}
                        {/* <Environment /> */}
                        {/* <SkyLight intensity={0.1} /> */}
                        <UI>
                            <ResponsiveDrawer />
                        </UI>

                        <Suspense fallback={null}>
                            <Setup
                                // bloom
                                // motionBlur
                                pbr
                                // bloomStrength={0.4}
                                // defaultLight={true}

                                skybox="skyBox/sky.jpg"
                                pixelRatio={5}
                            />
                        </Suspense>

                        {/* <Reflector
                            x={-106.08}
                            y={-216.73}
                            z={-1207.92}
                            rotationX={-90.00}
                            scale={35.67}
                            scaleX={35.67}
                            scaleY={102.31}
                            opacityFactor={0.40}
                            reflection
                            mirror={1.50} /> */}


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
                            scaleZ={0.00}
                            color="#ffa400" />



                        <Model
                            name="worldmap"
                            physics="map"
                            ref={boothRef}
                            width={245.36}
                            depth={245.36}
                            // bloom
                            x={-149.17}
                            y={1494.28}
                            z={-1113.66}
                            scale={30}
                            onClick={(ev) => {
                                handleClick(ev)
                            }}
                            src="maps/v2/map.glb"
                        >

                            {panelObj?.map((item, key) => {
                                return (<>
                                    <Find
                                        key={key}
                                        name={item?.name}
                                        bloom={item?.bloom}
                                        textureFlipY={item?.textureFlipY}
                                        textureRotation={item?.textureRotation}
                                        videoTexture={item?.videoTexture}
                                        color={item?.color}
                                        onMouseOver={() => {
                                            console.log('onMouseOver')
                                        }}
                                        onMouseOut={() => {
                                            console.log('onMouseOut')
                                        }}
                                        onClick={() => {
                                            console.log('onClick')
                                        }}
                                    >
                                        {/* <HTML>
                                            <div>
                                                <Button
                                                    sx={{
                                                        color: "white",
                                                        px: 1,
                                                        background: " rgba( 255, 255, 255, 0.25 )",
                                                        boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
                                                        backdropFilter: "blur( 4px )",
                                                        borderRadius: "10px",
                                                        border: "1px solid rgba( 255, 255, 255, 0.18 )",
                                                    }}
                                                    variant="text"
                                                    size="small"
                                                    endIcon={<TouchAppTwoToneIcon />}
                                                >
                                                    Click
                                                </Button>
                                            </div>
                                        </HTML> */}
                                    </Find>
                                </>)
                            })}


                            <Find
                                bloom
                                name="Line001"
                                color="#ffffff"
                            />

                            <Find
                                bloom
                                name="Box050"
                                color="#ffffff"
                            />
                            <Find
                                bloom
                                name="Box057"
                                color="#ffffff"
                            />

                            {/* <Find
                                bloom
                                name="Object001"
                                color="#ffffff"
                            /> */}


                            <Find
                                bloom
                                name="ceilinglight"
                                color="#ffffff"
                            />

                            <Find bloom name="Box050" color="#ffffff" />
                            <Find bloom name="Box057" color="#ffffff" />

                            <Find bloom name="Box058" color="#ffffff" />

                            <Find bloom name="Box2131639774" color="#ffffff" />
                        </Model>

                        <Trigger
                            helper={true}
                            // pad={true}
                            x={-75.15}
                            y={-287.29}
                            z={-984.78}
                            targetIds="player"
                            radius={1000.0}
                            onEnter={() => {
                                setVisible(true)
                            }}
                            onExit={() => {
                                setVisible(false)
                            }}
                        />

                        {isVisible ? (
                            <>
                                <Suspense
                                    fallback={
                                        <Cube
                                            color="black"
                                            x={-39.44}
                                            y={-109.37}
                                            z={-109.37}
                                        />
                                    }
                                >
                                    <Model
                                        ref={spaceFighterRef}
                                        physics="map"
                                        width={245.36}
                                        depth={245.36}
                                        scaleX={10}
                                        scaleY={20}
                                        scaleZ={20}
                                        x={-137.75}
                                        y={-213.67}
                                        z={-1113.66}
                                        scale={2}
                                        animation={'Scene'}
                                        src="npc/spaceFighter.glb"
                                    />
                                </Suspense>
                            </>
                        ) : (
                            <>
                                <Suspense
                                    fallback={
                                        <Sphere
                                            color="blue"
                                            x={-39.44}
                                            y={-109.37}
                                            z={-109.37}
                                        />
                                    }
                                >
                                    <Sphere
                                        onClick={(ev) => {
                                            movePlayer(ev)
                                        }}
                                        opacity={1}
                                        color="red"
                                        x={-39.44}
                                        y={-109.37}
                                        z={-109.37}
                                    />
                                </Suspense>
                            </>
                        )}

                        <Group ref={textRef}
                            x={-39.19}
                            z={414.86}
                            y={100.98}
                        >
                            <HTMLMesh>
                                <HTML>
                                    <div className="status">
                                        <span style={{ fontSize: '12px' }}>
                                            {socket?.id == null
                                                ? 'Connecting... .'
                                                : textLimit(socket?.id, 9)}
                                        </span>
                                    </div>
                                </HTML>
                            </HTMLMesh>

                            <Sphere
                                y={-10}
                                x={-14}
                                opacity={1}
                                bloom={true}
                                color={`${socket?.id == null ? '#ff0004' : '#00ff00'}`}
                                emissiveColor={`${socket?.id == null ? '#ff0004' : '#00ff00'}`}
                                scale={0.03}
                            />
                        </Group>

                        <ThirdPersonCamera
                            enableDamping
                            active={true}
                            mouseControl={'drag'}
                            lockTargetRotation={false}
                            fov={width < 640 ? 90 : 90}
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
                                z={415.54}
                                y={52.30}

                                rotationX={180}
                                rotationY={-22.37}
                                rotationZ={180}
                                src="3dCharacter/new/character.fbx"
                                animation={running ? 'running' : 'idle'}
                                animations={{
                                    idle: '3dCharacter/new/BreathingIdle.fbx',
                                    running: '3dCharacter/new/Running.fbx',
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

                        {server != [] &&
                            server?.map((client, key) => {
                                if (
                                    client?.animation == true &&
                                    remoteData !== null &&
                                    remoteTextData !== null &&
                                    client?.id == remoteData?.id
                                ) {
                                    remoteData.lookTo(
                                        client?.position[0],
                                        undefined,
                                        client?.position[2],
                                        0.1
                                    )
                                    remoteData.moveTo(
                                        client?.position[0],
                                        undefined,
                                        client?.position[2],
                                        5
                                    )

                                    remoteTextData.lookTo(
                                        client?.position[0],
                                        undefined,
                                        client?.position[2],
                                        0.1
                                    )
                                    remoteTextData.moveTo(
                                        client?.position[0],
                                        undefined,
                                        client?.position[2],
                                        5
                                    )

                                    remoteRef.current.onMoveToEnd = () => {
                                        socket?.emit('move', {
                                            id: client?.id,
                                            animation: false,
                                            rotation: Object.values(
                                                client?.rotation
                                            ),
                                            position: Object.values(
                                                client?.position
                                            ),
                                        })
                                    }
                                }

                                return (
                                    <>
                                        <Group
                                            ref={remoteTextRef}
                                            y={5}
                                            key={key}
                                            id={client?.id}
                                        >
                                            <HTMLMesh>
                                                <HTML>
                                                    <div className="status">
                                                        <span
                                                            style={{
                                                                fontSize:
                                                                    '12px',
                                                            }}
                                                        >
                                                            {client?.id == null
                                                                ? 'Connecting... .'
                                                                : textLimit(
                                                                    client?.id,
                                                                    9
                                                                )}
                                                        </span>
                                                    </div>
                                                </HTML>
                                            </HTMLMesh>

                                            <Sphere
                                                y={100.98}
                                                x={-14}
                                                opacity={1}
                                                bloom={true}
                                                color={`${client?.id == null ? '#ff0004' : '#00ff00'}`}
                                                emissiveColor={`${client?.id == null ? '#ff0004' : '#00ff00'}`}
                                                scale={0.03}
                                            />
                                        </Group>

                                        <Dummy
                                            key={key}
                                            id={client?.id}
                                            ref={remoteRef}
                                            gravity={true}
                                            physics="character"
                                            width={50}
                                            depth={50}
                                            scale={1}
                                            src={'3dCharacter/character.fbx'}
                                            animation={
                                                client?.id == remoteData?.id &&
                                                    client?.animation
                                                    ? 'running'
                                                    : 'idle'
                                            }
                                            animations={{
                                                idle: '3dCharacter/BreathingIdle.fbx',

                                                running:
                                                    '3dCharacter/Running.fbx',
                                            }}
                                        />
                                    </>
                                )
                            })}
                    </World>
                </>
            )}
        </>
    )
}

export default Game
