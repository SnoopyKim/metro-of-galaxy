import React from 'react'
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { getCircleCoords, zodiac } from './../../resources/coords';
import Planet from './Planet';
import { useTexture } from '@react-three/drei';
import images from './../../resources/images';

function Constellation({ position }) {
    const ref = useRef()
    const planetTexture = useTexture(images.moon.default)
    // const planets = getCircleCoords(10, 5).map(v => 
    //     <Planet 
    //         key={`${v[0]}-${v[1]}-${v[2]}`}
    //         position={v}
    //         geometry={[0.5, 16, 16]}
    //         // color={"red"}
    //         texture={planetTexture}
    //     />)

    const planets = zodiac[Math.floor(12*Math.random())].positions.map(pos => 
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