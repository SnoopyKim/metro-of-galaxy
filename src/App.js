import { createContext, useCallback, useContext, useEffect, useState } from "react";
import BackButton from "./components/BackButton";
import GalaxyMap from "./components/Galaxy/GalaxyMap";
import { AppContext } from "./contexts/AppContext";
import { threeValues } from "./resources/coords";
import icons from './resources/icons';

function App() {
  const { station, setStation, zodiacIdx, setZodiacIdx } = useContext(AppContext);

  const search = (e) => {
    if (e.code === 'Enter') {
      const name = e.target.value;
      name.length > 0 && setStation({name, position: threeValues.main.position})
      e.target.value = '';
    }
  }

  return (
    <>
      <GalaxyMap />
      <div id="ui-container">
        { station && <BackButton /> }
        { station && <span>{station?.name}</span> }
        { !station && <input type="text" onKeyDown={search}/> }
      </div>
    </>
  );
}

export default App;
