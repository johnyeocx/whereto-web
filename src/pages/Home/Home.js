import React from 'react'
import splash from '../../images/splash.png'

function Home() {
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#111',
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}><img src={splash} style={{
            objectFit: 'contain',
            height: '100px'
        }}></img></div>
    )
}

export default Home