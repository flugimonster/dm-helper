import './App.css';

import { characters } from './battle_page/data';
import { ListOfCharacters } from './battle_page/ListOfCharacters';
import Table from './dm_page/Table';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { useEffect } from 'react';

function App() {
  useEffect(() => {
  }, [])
  
  return (
    <div className="App">
      <Router>

        <Switch>
          <Route path="/battle">
            <ListOfCharacters variant='vertical' characters={characters} />
          </Route>
          <Route path="/">
            <Table />
            <button style={{ position: 'absolute', left: '50%', transform: 'translate(-50%)', marginTop: 15 }} onClick={() => {
              window.open('/battle', '_blank', 'frame=false, width=240, height=800')
            }}>START</button>
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
