import { createContext, useState } from "react";
import GalaxyMap from "./components/GalaxyMap";

export const Context  = createContext();

function App() {
  const [station, setStation] = useState(null);
  const contextValue = { station, setStation };
  return (
    <Context.Provider value={contextValue}>
      <GalaxyMap />
      <div id="ui-container">
        <span style={{flex:1, color: "white"}}>{contextValue.station}</span>
      </div>
    </Context.Provider>
  );
}

export default App;
