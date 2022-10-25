import React from 'react'

const Nomenu = ({ url }) => {
    return (
        <>
            <iframe
                style={{
                    display: 'block',
                    width: '-webkit-fill-available',
                    height: '-webkit-fill-available ',
                    border: '0px',
                    backgroundColor: 'black',
                }}
                src={url}
            />
        </>
    )
}

export default Nomenu
