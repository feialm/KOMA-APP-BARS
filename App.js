import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

// import our component
//import ReportTime from "./ReportTime.js";
//import Child from "./Child.js";
import FormSite from "./FormSite.js";
import BarSite from "./BarSite.js";
import DonutSite from "./DonutSite.js";
import ReportTime from "./ReportTime.js";
import CourseInfo from "./CourseInfo.js"

// main component of app is always one page (depending on url path) + Menu below
const App = () => {


  return (

    <Router>
      <Switch>
        <Route exact path="/" component={FormSite} /> {/*Den första visas som default*/}
        <Route path="/BarSite.js" component={BarSite} />
        <Route path="/DonutSite.js" component={DonutSite} />
        <Route path="/ReportTime.js" component={ReportTime} />
        <Route path="/CourseInfo.js" component={CourseInfo} />
      </Switch>
    </Router>



  );
};


export default App;