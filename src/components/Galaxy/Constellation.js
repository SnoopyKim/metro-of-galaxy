import React, { useContext, useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { getCircleCoords, zodiac } from './../../resources/coords';
import Planet from './Planet';
import { useTexture } from '@react-three/drei';
import images from './../../resources/images';

function Constellation({ position, zodiacIdx }) {
    const ref = useRef()
    const planetTexture = useTexture(images.moon.default)

    const planets = zodiac[zodiacIdx]?.positions.map(pos => 
        <Planet
            key={`${pos[0]}-${pos[1]}-${pos[2]}`}
            position={pos}
            geometry={[0.3, 16, 16]}
            texture={planetTexture}
        />)

    useFrame(() => ref.current && (ref.current.rotation.z += 0.002))

    return (
        <group ref={ref} position={position}>
            { planets }
        </group>
    )
}

export default Constellation