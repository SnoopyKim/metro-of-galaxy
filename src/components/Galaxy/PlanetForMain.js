import { useRef, useState } from "react";
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { threeValues } from "../../resources/coords";
import { AdditiveBlending } from 'three'
import colors from './../../resources/colors';
import images from './../../resources/images';

const PlanetForMain = ({ visible }) => {
    const ref = useRef();
    const [hovered, setHovered] = useState(false)
    const [planetTexture, glowTexture] = useTexture([images.earth.default, images.glow.default]) 
    
    useFrame(() => visible && (ref.current.rotation.y += 0.01))
    return (
        <group 
            ref={ref} 
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
                        blending={AdditiveBlending} 
                        map={glowTexture} />
                </sprite> 
            }
        </group>
    )
}

export default PlanetForMain;