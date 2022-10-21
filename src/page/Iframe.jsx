import React from 'react'
import ResponsiveDrawer from '../component/Drawer'

const Iframe = ({ url }) => {
    return (
        <>
            <ResponsiveDrawer />
            <iframe style={{
                display: "block",
                width: "-webkit-fill-available",
                height: "-webkit-fill-available ",
                border: "0px",
                backgroundColor: "black"

            }} src={url} />
        </>
    )
}

export default Iframe