import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

// import our component
//import ReportTime from "./ReportTime.js";
//import Child from "./Child.js";
import DonutSite from "./DonutSite.js";
import Form from "./Form.js";

// main component of app is always one page (depending on url path) + Menu below
const App = () => {

  return (

    <Router>

      <Switch>
        <Route exact path="/" component={Form} /> {/*Den första visas som default*/}
      
        <Route path="/DonutSite.js" component={DonutSite} />
        
        
      </Switch>

    </Router>

  );
};


export default App;