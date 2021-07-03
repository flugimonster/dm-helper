import "./App.css";

import { DmPage } from "./dm_page/DmPage";
import { BattlePage } from "./battle_page/BattlePage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/battle">
            <BattlePage />
          </Route>
          <Route path="/">
            <DmPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
