import React from 'react';
import logo from './logo.svg';
//import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";




const page2test = (props) => {

	console.log("Hi page2test!");

	const theObject = props.location.state;

  return (
    <div>
     
    <h1> Welcome to page 2 test </h1>

    <Link to="/page1test"> To Page 1! </Link>

    <p> A gift from page 1 ------->
    	Name: {theObject.name}, age: {theObject.age} </p>

    </div>
  );
}

export default page2test;
