import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { Stars, useAspect, useTexture } from "@react-three/drei";
import images from "../../resources/images"
import * as THREE from "three";
// import { gsap } from "gsap";
import { gsap, Power2 } from "gsap/all";
import coords from '../../resources/coords';
import colors from '../../resources/colors';

const radian = Math.PI / 180;

export default function GalaxyMap() {
    const [target, setTarget] = useState(null)
    
    // ! return문 안에서 map을 바로 쓰지말고 따로 빼놔야 Hooks 규칙을 피할 수 있음 !
    const planets = coords.map((coord) => 
        <Planet 
            key={coord.join('-')} 
            position={coord} 
            selected={target === coord}
            onClick={(planet) => setTarget(coord)} 
            onDoubleClick={() => setTarget(null)}
            />
    )

    return (
        <Canvas>
            <color attach="background" args={["black"]} />
            <ambientLight intensity={0.8} />
            <Camera target={target}/>
            <Suspense fallback={<Loading />}>
                <Stars radius={100}/>
                {planets}
            </Suspense>
        </Canvas>
    )
}

const Loading = () => {
    return (
        <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[1, 16, 16]} />
        <meshStandardMaterial
            attach="material"
            color="white"
            transparent
            opacity={0.6}
            roughness={1}
            metalness={0}
        />
        </mesh>
    );
}


const Camera = ({ target }) => {
    const { camera } = useThree();
    useEffect(() => {
        // console.log(target)
        target ? zoomIn() : zoomOut()
    }, [target])

    const zoomIn = () => gsap.to(camera.position, {
        duration: 1,
        x: target[0],
        y: target[1],
        z: 3,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        },
        ease: Power2.easeOut
    } );

    const zoomOut = () => gsap.to(camera.position, {
        duration: 1,
        x: 0,
        y: 0,
        z: 80,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        },
        ease: Power2.easeIn
    })
    return null;
}

const Planet = ({ position, selected, onClick, onDoubleClick }) => {
    const planet = useRef()
    const [hovered, setHovered] = useState(false)
    const { scale } = useSpring({
        scale: hovered ? 2 : 1,
        config: config.wobbly
    })
    const [planetTexture, glowTexture] = useTexture([images.planet.default, images.glow.default])

    useFrame(() => selected && (planet.current.rotation.y += 0.01))

    return (
        <animated.group 
            ref={planet}
            rotation={new THREE.Euler(90*radian, 0, 0)}
            position={position || [0, 0, 0]}
            scale={scale}
            onClick={(e) => {
                if (selected) return;
                onClick(planet)
                setHovered(false)
            }}
            onDoubleClick={(e) => selected && onDoubleClick()}
            onPointerEnter={(e) => !selected && setHovered(true)}
            onPointerLeave={(e) => !selected && setHovered(false)}
            >
        <mesh>
            <sphereGeometry args={[0.5, 50, 50, 0, 90*radian, 0, 180*radian]} />
            <meshBasicMaterial 
                attach="material" 
                color={colors.metro.one} 
                map={planetTexture} />
        </mesh>
        <mesh>
            <sphereGeometry args={[0.5, 50, 50, 90*radian, 90*radian, 0, 180*radian]} />
            <meshBasicMaterial 
                attach="material" 
                color={colors.metro.two} 
                map={planetTexture} />
        </mesh>
        <mesh>
            <sphereGeometry args={[0.5, 50, 50, 180*radian, 90*radian, 0, 180*radian]} />
            <meshBasicMaterial 
                attach="material" 
                color={colors.metro.three} 
                map={planetTexture} />
        </mesh>
        <mesh>
            <sphereGeometry args={[0.5, 50, 50, 270*radian, 90*radian, 0, 180*radian]} />
            <meshBasicMaterial 
                attach="material" 
                color={colors.metro.four} 
                map={planetTexture} />
        </mesh>
        <sprite scale={[2.5, 2.5, 1.0]}>
                <spriteMaterial 
                    attach="material" 
                    opacity={0.5} 
                    color={colors.metro.three} 
                    blending={THREE.AdditiveBlending} 
                    map={glowTexture} />
            </sprite>
            <sprite scale={[2.5, 2.5, 1.0]}>
                <spriteMaterial 
                    attach="material" 
                    opacity={1.0} 
                    color={colors.metro.one}
                    blending={THREE.AdditiveBlending} 
                    map={glowTexture} />
            </sprite>
        </animated.group>
    )
}