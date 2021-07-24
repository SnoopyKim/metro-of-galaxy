import { useContext, useRef, useState } from "react";
import { useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { threeValues } from "../../resources/coords";
import { AdditiveBlending } from 'three'
import colors from './../../resources/colors';
import images from './../../resources/images';
import { AppContext } from "../../contexts/AppContext";

const PlanetForMain = ({ info }) => {
    const ref = useRef();
    const [hovered, setHovered] = useState(true)
    const { BackSide, AdditiveBlending } = useThree();
    const [planetTexture, glowTexture] = useTexture([images.earth.default, images.glow.default])
    
    useFrame(() => info && (ref.current.rotation.y += 0.01))
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
                <meshLambertMaterial 
                    attach="material" 
                    color={'#AAA'} 
                    map={planetTexture} />
            </mesh>
            {/* <mesh>
                <sphereGeometry args={[120, 32, 16]} />
                <shaderMaterial 
                    uniforms 
                    vertexShader={document.getElementById('vertexShader').textContent}
                    fragmentShader={document.getElementById('fragmentShader').textContent}
                    side={BackSide}
                    blending={AdditiveBlending}
                    transparent={true}
                />
            </mesh> */}
        </group>
    )
}

export default PlanetForMain;