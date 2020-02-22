import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BubblePage from './components/BubblePage'

import Login from "./components/Login";
import "./styles.scss";
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
        <Link to='/'>Home</Link>
        <Link to='/protected'>Bubble</Link>
        </nav>
        <Switch>
          <Route exact path="/" render={props => 
             <Login {...props}/>
            } />
          <ProtectedRoute exact path='/protected' component={BubblePage}/>
        </Switch>
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
