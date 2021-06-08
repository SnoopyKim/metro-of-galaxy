
import { useThree } from '@react-three/fiber';
import { useCallback, useEffect } from 'react';
import { gsap, Power2 } from 'gsap/gsap-core';

const Camera = ({ target }) => {
    const { camera } = useThree();
    useEffect(() => {
        target ? zoomIn(target?.position) : zoomOut()
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

export default Camera;