import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { Stars, useAspect, useTexture } from "@react-three/drei";
import bg_planet from "../../assets/images/planet.jpg"
import * as THREE from "three";
// import { gsap } from "gsap";
import { gsap, Linear } from "gsap/all";

// 2호선 대략 좌표
const coords = [
    new THREE.Vector3(1, -39, 0),
    new THREE.Vector3(6, -39, 0),
    new THREE.Vector3(11, -39, 0),
    new THREE.Vector3(16, -39, 0),
    new THREE.Vector3(24, -39, 0),
    new THREE.Vector3(31, -39, 0),
    new THREE.Vector3(39, -39, 0),
    new THREE.Vector3(45, -36, 0),
    new THREE.Vector3(48, -31, 0),
    new THREE.Vector3(51, -24, 0),
    new THREE.Vector3(51, -19, 0),
    new THREE.Vector3(51, -10, 0),
    new THREE.Vector3(51, 3, 0),
    new THREE.Vector3(51, 7, 0),
    new THREE.Vector3(51, 13, 0),
    new THREE.Vector3(50, 26, 0),
    new THREE.Vector3(46, 31, 0),
    new THREE.Vector3(40, 35, 0),
    new THREE.Vector3(29, 35, 0),
    new THREE.Vector3(18, 35, 0),
    new THREE.Vector3(6, 35, 0),
    new THREE.Vector3(1, 35, 0),
    new THREE.Vector3(-5, 35, 0),
    new THREE.Vector3(-10, 35, 0),
    new THREE.Vector3(-15, 35, 0),
    new THREE.Vector3(-25, 35, 0),
    new THREE.Vector3(-34, 35, 0),
    new THREE.Vector3(-40, 34, 0),
    new THREE.Vector3(-47, 30, 0),
    new THREE.Vector3(-50, 23, 0),
    new THREE.Vector3(-50, 13, 0),
    new THREE.Vector3(-50, 2, 0),
    new THREE.Vector3(-50, -6, 0),
    new THREE.Vector3(-50, -15, 0),
    new THREE.Vector3(-49, -28, 0),
    new THREE.Vector3(-45, -34, 0),
    new THREE.Vector3(-39, -38, 0),
    new THREE.Vector3(-31, -39, 0),
    new THREE.Vector3(-23, -39, 0),
    new THREE.Vector3(-15, -39, 0),
    new THREE.Vector3(-7, -39, 0),
]

export default function GalaxyMap() {
    const [target, setTarget] = useState(null)

    return (
        <Canvas>
            <color attach="background" args={["black"]} />
            <ambientLight intensity={0.8} />
            <Camera target={target}/>
            <Suspense fallback={<Loading />}>
                <Stars radius={100}/>
                {coords.map((coord) => 
                    <Planet 
                        key={`${coord.x}-${coord.y}=${coord.z}`} 
                        position={coord} 
                        selected={target === coord}
                        onClick={(planet) => setTarget(coord)} 
                        onDoubleClick={() => setTarget(null)}
                        />
                )}
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
        x: target.x,
        y: target.y,
        z: 3,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        }
    } );

    const zoomOut = () => gsap.to(camera.position, {
        duration: 1,
        x: 0,
        y: 0,
        z: 80,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        }
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
    const planetTexture = useTexture(bg_planet)

    // 행성 회전
    // TODO: stop이 안돼....
    const rotate = gsap.fromTo(planet.current?.rotation, {
        y: 0,
    },{
        duration: 10,
        y: Math.PI * 2,
        repeat: -1,
        ease: Linear.easeNone
    }).paused(!selected)

    return (
        <animated.mesh
            ref={planet}
            position={position || [0, 0, 0]}
            scale={scale}
            onClick={(e) => {
                if (selected) return;
                onClick(planet)
                setHovered(false)
                rotate.play()
            }}
            onDoubleClick={(e) => {
                if (!selected) return;
                rotate.pause()
                onDoubleClick()
            }}
            onPointerEnter={(e) => !selected && setHovered(true)}
            onPointerLeave={(e) => !selected && setHovered(false)}
        >
            <sphereGeometry args={[0.5, 100, 100]} />
            <meshBasicMaterial attach="material" color={'#009D3E'} map={planetTexture}  />
        </animated.mesh>
    )
}