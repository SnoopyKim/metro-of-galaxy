import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { getRandomRotation } from '../../resources/coords';
import { AdditiveBlending } from 'three';
import { useTexture } from '@react-three/drei';
import images from './../../resources/images';

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
            <sprite scale={[1.4, 1.4, 1.0]}>
                <spriteMaterial 
                    attach="material" 
                    opacity={1.0} 
                    blending={AdditiveBlending} 
                    map={useTexture(images.glow.default)} />
            </sprite> 
        </mesh>
    )
}

export default Planet
