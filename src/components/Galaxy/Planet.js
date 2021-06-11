import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { getRandomRotation } from '../../resources/coords';

function Planet({ position, geometry, texture, color, rotate=true}) {
    const planetRef = useRef();

    useFrame(() => rotate && (planetRef.current.rotation.y += 0.01))

    return (
        <mesh ref={planetRef} position={position} rotation={getRandomRotation()}>
            <sphereGeometry args={geometry} />
            <meshBasicMaterial 
                attach="material"
                color={color}
                map={texture}
                />
        </mesh>
    )
}

export default Planet
