import React, { useState } from 'react'

export default function CircularButton({ img, selected, onClick }) {
    const [hover, setHover] = useState(false);
    return (
        <div style={{
            width: 36,
            height: 36,
            borderRadius: 20,
            opacity: selected ? 1.0 : 0.6,
            backgroundColor: selected ? 'white': hover ? 'lightgrey' : 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }} 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={selected ? () => {} : onClick}>
            <img style={{width: 27, height: 27}} src={img} alt={"circularButton"}/>
        </div>
    )
}
