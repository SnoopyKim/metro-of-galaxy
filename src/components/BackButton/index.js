import React, { useContext } from 'react'
import './index.css'
import icons from './../../resources/icons';
import { AppContext } from '../../contexts/AppContext';

export default function BackButton() {
    const { setStation } = useContext(AppContext);
    return (
        <div id="back" onClick={() => setStation(null)}>
          <img src={icons.back.default} alt={"Back"}/>
        </div>
    )
}
