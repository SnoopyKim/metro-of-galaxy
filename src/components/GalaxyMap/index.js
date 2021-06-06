import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { OrbitControls, Stars, useAspect, useTexture } from "@react-three/drei";
import images from "../../resources/images"
import * as THREE from "three";
// import { gsap } from "gsap";
import { gsap, Power2 } from "gsap/all";
import coords, { threeValues } from '../../resources/coords';
import colors from '../../resources/colors';

export default function GalaxyMap() {
    const [target, setTarget] = useState(null)
    
    useEffect(() => {
        document.onkeydown = event => {
            switch (event.code) {
                case 'Enter':
                    setTarget(threeValues.main.position);
                    break;
                case 'Backspace':
                    setTarget(null);
                    break;
                default:
                    break;
            }
        }
    }, [])

    // ! return문 안에서 map을 바로 쓰지말고 따로 빼놔야 Hooks 규칙을 피할 수 있음 !
    const planets = coords.map((coord) => 
        <PlanetForMap
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
                <Background />
                <PlanetForMain visible={target === threeValues.main.position} />
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

const Background = () => (
    <mesh position={threeValues.background.position} rotation={threeValues.background.rotation}>
        <sphereGeometry attach="geometry" args={threeValues.background.sphere} />
        <meshBasicMaterial
            attach="material"
            map={useTexture(images.galaxy.default)}
            side={THREE.BackSide}
        />
    </mesh>
)


const Camera = ({ target }) => {
    const { camera } = useThree();
    useEffect(() => {
        // console.log(target)
        target ? zoomIn() : zoomOut()
    }, [target])

    const zoomIn = () => gsap.to(camera.position, {
        duration: 1.5,
        x: target[0],
        y: target[1],
        z: target[2] + 5,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        },
        ease: Power2.easeOut
    } );

    const zoomOut = () => gsap.to(camera.position, {
        duration: 1,
        x: 0,
        y: 0,
        z: 60,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        },
        ease: Power2.easeIn
    })
    return null;
}

const PlanetForMain = ({ visible }) => {
    const ref = useRef();
    const [hovered, setHovered] = useState(false)
    const [planetTexture, glowTexture] = useTexture([images.earth.default, images.glow.default]) 

    useFrame(() => visible && (ref.current.rotation.y += 0.01))
    return (
        <>
        <mesh 
            ref={ref} 
            visible={visible} 
            position={threeValues.main.position}
            rotation={threeValues.main.rotation}
            onPointerEnter={(e) => setHovered(true)}
            onPointerLeave={(e) => setHovered(false)}>
            <sphereGeometry args={threeValues.main.sphere} />
            <meshBasicMaterial 
                attach="material" 
                // color={colors.metro.sinbundang} 
                map={planetTexture} />
        </mesh>
        { hovered && 
            <sprite position={threeValues.main.position} scale={[5, 5, 1.0]}>
                <spriteMaterial 
                    attach="material" 
                    opacity={1.0} 
                    color={colors.metro.sinbundang} 
                    blending={THREE.AdditiveBlending} 
                    map={glowTexture} />
            </sprite> 
        }
        </>
    )
}

const PlanetForMap = ({ position, selected, onClick, onDoubleClick }) => {
    const planet = useRef()
    const [hovered, setHovered] = useState(false)
    const { scale } = useSpring({
        scale: hovered ? 2 : 1,
        config: config.wobbly
    })
    const [planetTexture, glowTexture] = useTexture([images.mars.default, images.glow.default])

    useFrame(() => selected && (planet.current.rotation.y += 0.01))

    return (
        <animated.group 
            ref={planet}
            // rotation={new THREE.Euler(90*radian, 0, 0)}
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
            <sphereGeometry args={[0.5, 50, 50]} />
            <meshBasicMaterial 
                attach="material" 
                // color={colors.metro.sinbundang} 
                map={planetTexture} />
            <sprite scale={[2.5, 2.5, 1.0]}>
                <spriteMaterial 
                    attach="material" 
                    opacity={0.5} 
                    color={colors.metro.sinbundang} 
                    blending={THREE.AdditiveBlending} 
                    map={glowTexture} />
            </sprite>
        </mesh>
        </animated.group>
    )
}