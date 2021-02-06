import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import CocktailShow from './components/CocktailShow';

import 'bulma'
import './App.css';

function App() {
  return (
    <Router>
        <div>
          <Switch>
            <Route path='/cocktails/:id' component={CocktailShow} />
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </Router>
  );
}

export default App;
