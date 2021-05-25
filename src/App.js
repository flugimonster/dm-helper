import './App.css';

import { characters } from './battle_page/data';
import { ListOfCharacters } from './battle_page/ListOfCharacters';
import Table from './dm_page/Table';
import { BattleParser } from './battle_page/BattleParser';

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
            <BattleParser/>
          </Route>
          <Route path="/">
            <Table />
          </Route>
        </Switch>
      </Router>
    </div >
  );
}

export default App;
