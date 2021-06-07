import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useCallback, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { OrbitControls, Stars, useAspect, useTexture } from "@react-three/drei";
import images from "../../resources/images"
import * as THREE from "three";
// import { gsap } from "gsap";
import { gsap, Power2 } from "gsap/all";
import coords, { threeValues } from '../../resources/coords';
import colors from '../../resources/colors';
import { Context } from "../../App";

export default function GalaxyMap() {
    const { station, setStation } = useContext(Context)
    
    useEffect(() => {
        document.onkeydown = event => {
            switch (event.code) {
                case 'Enter':
                    setStation(threeValues.main.position);
                    break;
                case 'Backspace':
                    setStation(null);
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
            selected={station === coord}
            onClick={(planet) => setStation(coord)} 
            onDoubleClick={() => setStation(null)}
            />
    )

    return (
        <Canvas style={{position: "absolute"}}>
            <Camera target={station}/>
            <Suspense fallback={<Loading />}>
                <Background />
                <PlanetForMain visible={station === threeValues.main.position} />
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
        target ? zoomIn(target) : zoomOut()
    }, [target])

    const zoomIn = useCallback((pos) => gsap.to(camera.position, {
        duration: 1.5,
        x: pos[0],
        y: pos[1],
        z: pos[2] + 5,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        },
        ease: Power2.easeOut
    }), []);

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
    console.log(hovered)
    useFrame(() => visible && (ref.current.rotation.y += 0.01))
    return (
        <group 
            ref={ref} 
            visible={visible} 
            position={threeValues.main.position}
            rotation={threeValues.main.rotation}
            onClick={(e) => setHovered(true)}
            onPointerEnter={(e) => setHovered(true)}
            >
            <mesh
                onPointerEnter={(e) => setHovered(true)}
                onPointerLeave={(e) => setHovered(false)}>
                <sphereGeometry args={threeValues.main.sphere} />
                <meshBasicMaterial 
                    attach="material" 
                    color={'#AAA'} 
                    map={planetTexture} />
            </mesh>
            { hovered && 
                <sprite scale={[5, 5, 1.0]}>
                    <spriteMaterial 
                        attach="material" 
                        opacity={1.0} 
                        color={colors.metro.sinbundang} 
                        blending={THREE.AdditiveBlending} 
                        map={glowTexture} />
                </sprite> 
            }
        </group>
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