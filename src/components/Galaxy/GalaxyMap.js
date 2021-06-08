import { Canvas } from "@react-three/fiber";
import React, { Suspense,useContext} from "react";
import { Html, useProgress, useTexture } from "@react-three/drei";
import images from "../../resources/images"
import { BackSide } from "three";
import coords, { threeValues } from '../../resources/coords';
import { Context } from "../../App";
import icons from '../../resources/icons';
import Camera from './Camera';
import PlanetForMain from './PlanetForMain';

export default function GalaxyMap() {
    const { station, setStation } = useContext(Context)

    return (
        <Canvas style={{position: "absolute"}}>
            <Camera target={station}/>
            <Suspense fallback={<Loading />}>
                <Background />
                <PlanetForMain visible={station?.position === threeValues.main.position} />
            </Suspense>
        </Canvas>
    )
}

const Loading = () => {
    const { progress } = useProgress();
    return (
        <Html as='div' center style={{top: -100, width: 200}}>
            <div style={{display: "flex", flexDirection: "row"}}>
                <img src={icons.react.default} alt={'reactjs'} width={100}/>
                <img src={icons.three.default} alt={'threejs'} width={100}/>
            </div>
            <p style={{width: 200, textAlign: "center"}}>{Math.round(progress)+1} % loaded</p>
        </Html>
    );
}

const Background = () => (
    <mesh position={threeValues.background.position} rotation={threeValues.background.rotation}>
        <sphereGeometry attach="geometry" args={threeValues.background.sphere} />
        <meshBasicMaterial
            attach="material"
            map={useTexture(images.galaxy.default)}
            side={BackSide}
        />
    </mesh>
)


