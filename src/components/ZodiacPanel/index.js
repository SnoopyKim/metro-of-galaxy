import React, { useContext } from 'react'
import { AppContext } from '../../contexts/AppContext';
import icons from './../../resources/icons';
import CircularButton from './../CircularButton/index';

export default function ZodiacPanel() {
    const { zodiacIdx, setZodiacIdx } = useContext(AppContext)
    return (
        <div style={{
            height: '80%',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            left: 20,
            top: '50%',
            transform: `translate(0, -50%)`,
            justifyContent: 'space-between',
        }}>
            <CircularButton img={icons.zodiac.aries.default} selected={zodiacIdx===0} onClick={() => setZodiacIdx(0)} />
            <CircularButton img={icons.zodiac.taurus.default} selected={zodiacIdx===1} onClick={() => setZodiacIdx(1)} />
            <CircularButton img={icons.zodiac.gemini.default} selected={zodiacIdx===2} onClick={() => setZodiacIdx(2)} />
            <CircularButton img={icons.zodiac.cancer.default} selected={zodiacIdx===3} onClick={() => setZodiacIdx(3)} />
            <CircularButton img={icons.zodiac.leo.default} selected={zodiacIdx===4} onClick={() => setZodiacIdx(4)} />
            <CircularButton img={icons.zodiac.virgo.default} selected={zodiacIdx===5} onClick={() => setZodiacIdx(5)} />
            <CircularButton img={icons.zodiac.libra.default} selected={zodiacIdx===6} onClick={() => setZodiacIdx(6)} />
            <CircularButton img={icons.zodiac.scorpion.default} selected={zodiacIdx===7} onClick={() => setZodiacIdx(7)} />
            <CircularButton img={icons.zodiac.sagittarius.default} selected={zodiacIdx===8} onClick={() => setZodiacIdx(8)} />
            <CircularButton img={icons.zodiac.capricorn.default} selected={zodiacIdx===9} onClick={() => setZodiacIdx(9)} />
            <CircularButton img={icons.zodiac.aquarius.default} selected={zodiacIdx===10} onClick={() => setZodiacIdx(10)} />
            <CircularButton img={icons.zodiac.pisces.default} selected={zodiacIdx===11} onClick={() => setZodiacIdx(11)} />
        </div>
    )
}
