import React from 'react';
import Tilt from 'react-parallax-tilt';
import face from './face.jpg'
import './Logo.css'

const Logo = () => {
    return (
        <div className='ma4 mt0' style={{width: '100px'}}>
             <Tilt className='Tilt br2 shadow-2'>
                <div style={{ height: '100px'}}>
                    <h1><img style={{height: '100px'}} alt='logo' src={face}/></h1>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;