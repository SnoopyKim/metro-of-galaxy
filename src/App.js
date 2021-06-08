import { createContext, useCallback, useEffect, useState } from "react";
import GalaxyMap from "./components/GalaxyMap";
import { threeValues } from "./resources/coords";
import icons from './resources/icons';

export const Context  = createContext();

function App() {
  const [name, setName] = useState('')
  const [station, setStation] = useState(null);
  const contextValue = { station, setStation };

  const typeStation = (e) => {
    setName(e.target.value);
  }

  const search = (e) => {
    if (e.code === 'Enter') {
      const name = e.target.value;
      name.length > 0 && setStation({name, position: threeValues.main.position})
      setName('');
    }
  }  

  return (
    <Context.Provider value={contextValue}>
      <GalaxyMap />
      <div id="ui-container">
        {station && <div id="back" onClick={() => setStation(null)}>
          <img src={icons.back.default} alt={"Back"}/>
        </div> }
        { station && <span>{station?.name}</span> }
        { !station && <input type="text" value={name} onChange={typeStation} onKeyDown={search}/> }
      </div>
    </Context.Provider>
  );
}

export default App;
