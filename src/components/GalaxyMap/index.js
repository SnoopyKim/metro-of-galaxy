import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { useSpring, animated, config } from "@react-spring/three";
import { OrbitControls, Stars, useAspect, useTexture } from "@react-three/drei";
import bg_galaxy from "../../assets/images/bg_galaxy.jpg";
import bg_galaxy2 from "../../assets/images/bg_galaxy2.jpg";
import bg_planet from "../../assets/images/planet.jpg"
import { Vector3 } from "three";

export default function GalaxyMap() {
    return (
        <Canvas>
            <ambientLight intensity={0.1} />
            <directionalLight />
            <OrbitControls />
            <Suspense fallback={null}>
                <Galaxy />
                <Stars />
                <Planet x={0} y={0}/>
                <Planet x={2} y={2}/>
                <Planet x={-2} y={-2}/>
            </Suspense>
        </Canvas>
    )
}

const Galaxy = () => {
    const { scene } = useThree()
    scene.background = useTexture(bg_galaxy)
    return null;
}

const Planet = ({ x, y }) => {
    const [hovered, setHovered] = useState(false)
    const { scale } = useSpring({
        scale: hovered ? 1.5 : 1,
        config: config.wobbly
    })
    return (
        <animated.mesh
            position={[x ?? 0, y ?? 0, 0]}
            scale={scale}
            onClick={(e) => console.log('clicked!')}
            onPointerEnter={(e) => setHovered(true)}
            onPointerLeave={(e) => setHovered(false)}
        >
            <sphereGeometry args={[0.5, 100, 100]} />
            <meshBasicMaterial attach="material" color={'royalblue'} map={useTexture(bg_planet)}  />
        </animated.mesh>
    )
}