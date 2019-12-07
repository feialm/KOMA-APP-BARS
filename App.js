import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// komponenterna 
// 
//{/*
import page1test from './page 1 test.js';
import page2test from './page 2 test.js';

const App = () => {
   console.log("Hi evrybody!");
  return (
    
    <Router>

    <Switch>

    <Route exact path="/" component={page1test} />
    <Route path="/page2test" component={page2test} />

    </Switch>

    

    </Router>

  );
};

export default App;
