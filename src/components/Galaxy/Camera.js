
import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { gsap, Power2 } from 'gsap/gsap-core';

const Camera = ({ target }) => {
    const { camera } = useThree();
    
    useEffect(() => {
        target ? zoomIn(target?.position) : zoomOut()
    }, [target])

    const zoomIn = (pos) => gsap.to(camera.position, {
        duration: 1.5,
        x: pos[0] + 2.5,
        y: pos[1],
        z: pos[2] + 4,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        },
        ease: Power2.easeIn
    });

    const zoomOut = () => gsap.to(camera.position, {
        duration: 1,
        x: 0,
        y: 0,
        z: 0,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        },
        ease: Power2.easeOut
    })

    
    return null;
}

export default Camera;