import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { Stars, useAspect, useTexture } from "@react-three/drei";
import bg_planet from "../../assets/images/planet.jpg"
import * as THREE from "three";
import { gsap } from "gsap";

const coords = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(2, 2, 0),
    new THREE.Vector3(-2, -2, 0),
]

export default function GalaxyMap() {
    const [target, setTarget] = useState(null)

    return (
        <Canvas>
            <color attach="background" args={["black"]} />
            {/* <ambientLight intensity={0.1} />
            <directionalLight /> */}
            <Camera target={target}/>
            <Suspense fallback={<Loading />}>
                <Stars radius={100}/>
                {coords.map((coord) => 
                    <Planet 
                        key={`${coord.x}-${coord.y}=${coord.z}`} 
                        position={coord} 
                        zoomIn={() => setTarget(coord)} 
                        zoomOut={() => setTarget(null)}
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
        z: 10,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        }
    } );

    const zoomOut = () => gsap.to(camera.position, {
        duration: 1,
        x: 0,
        y: 0,
        z: 30,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        }
    })
    return null;
}

const Planet = ({ position, zoomIn, zoomOut }) => {
    const [hovered, setHovered] = useState(false)
    const { scale } = useSpring({
        scale: hovered ? 1.5 : 1,
        config: config.wobbly
    })
    const planetTexture = useTexture(bg_planet)

    return (
        <animated.mesh
            position={position || [0, 0, 0]}
            scale={scale}
            onClick={(e) => zoomIn()}
            onDoubleClick={(e) => zoomOut()}
            onPointerEnter={(e) => setHovered(true)}
            onPointerLeave={(e) => setHovered(false)}
        >
            <sphereGeometry args={[0.5, 100, 100]} />
            <meshBasicMaterial attach="material" color={'royalblue'} map={planetTexture}  />
        </animated.mesh>
    )
}