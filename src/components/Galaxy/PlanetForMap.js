import { useRef, useState } from "react"
import { useSpring, config, animated } from '@react-spring/three';
import { useTexture } from '@react-three/drei';
import images from './../../resources/images';
import { useFrame } from '@react-three/fiber';
import { AdditiveBlending } from "three";
import colors from "../../resources/colors";

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
                    blending={AdditiveBlending} 
                    map={glowTexture} />
            </sprite>
        </mesh>
        </animated.group>
    )
}

export default PlanetForMap;