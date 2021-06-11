const degree = Math.PI / 180;

export const getCircleCoords = (number, radius = 5, posZ=0) => {
    if (isNaN(number)) return [];
    const arr = Array.from({ length: number }, (v, i) => i);
    return arr.map(i => [radius*(Math.cos(360*degree/number*i)), radius*(Math.sin(360*degree/number*i)), posZ])
}

export const getRandomRotation = () => {
    return [ 360*Math.random()*degree, 360*Math.random()*degree, 360*Math.random()*degree ]
}

export const threeValues = {
    background: {
        position: [ 0, 0, 0 ],
        rotation: [ 0, 90*degree, 0 ],
        sphere: [ 150, 10, 10 ]
    },
    main: {
        position: [ 0, 0, -60 ],
        rotation: [ 23.4*degree, 0*degree, 23.4*degree ],
        sphere: [ 1, 30, 30 ]
    },
}

