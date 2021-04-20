import './App.css';

import { characters } from './battle_page/data';
import { ListOfCharacters } from './battle_page/ListOfCharacters'

function App() {
  return (
    <div className="App">
      <ListOfCharacters variant='horizontal' characters={characters} />
    </div>
  );
}

export default App;
