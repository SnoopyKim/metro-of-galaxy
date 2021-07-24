import { createContext, useCallback, useContext, useEffect, useState } from "react";
import BackButton from "./components/BackButton";
import GalaxyMap from "./components/Galaxy/GalaxyMap";
import { AppContext } from "./contexts/AppContext";
import { threeValues } from "./resources/coords";
import icons from './resources/icons';
import CircularButton from './components/CircularButton/index';
import ZodiacPanel from "./components/ZodiacPanel";
import testData from './resources/testData';
import { getStationInfo, getStations } from "./utils/data";

let stations

function App() {
  const { station, setStation, index, zodiacIdx, setZodiacIdx } = useContext(AppContext);
  const [stationList, setStationList] = useState([])

  useEffect(() => {
    const sessionData = sessionStorage.getItem('stations')
    sessionData && console.log(sessionData)
    if (sessionData) {
      stations = JSON.parse(sessionData)
    } else {
      getStations(false).then(res => {
        stations = res
        sessionStorage.setItem('stations', JSON.stringify(res))
      })
    }
  }, [])

  const handleInput = (e) => {
    const text = e.target.value;
    const array = stations?.filter(station => station.indexOf(text) !== -1)
    setStationList(array)
  }

  const search = (e) => {
    if (e.code === 'Enter') {
      const name = e.target.value;
      console.log(name, stationList)
      if (name.length > 0 && stationList.length > 0) {
        getStationInfo(stationList[0], false).then(res => {
          console.log(res)
          setStation(res)
          e.target.value = '';
        })
      }
    }
  }

  return (
    <>
      <GalaxyMap />
      <div id="ui-container">
        { station && <BackButton /> }
        { station && <span>{stationList[0]}</span> }
        { !station && <input type="text" onChange={handleInput} onKeyDown={search}/> }
        <ZodiacPanel />
      </div>
    </>
  );
}

export default App;
