import logo from './logo.svg';
import './App.css';

import {characters} from './battle_page/data';
import {ListOfCharacters} from './battle_page/ListOfCharacters'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <ListOfCharacters characters={characters} />
      </header>
    </div>
  );
}

export default App;
