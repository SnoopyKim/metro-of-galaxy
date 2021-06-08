import React, { useContext } from 'react'
import './index.css'
import { Context } from './../../App';
import icons from './../../resources/icons';

export default function BackButton() {
    const { setStation } = useContext(Context);
    return (
        <div id="back" onClick={() => setStation(null)}>
          <img src={icons.back.default} alt={"Back"}/>
        </div>
    )
}
