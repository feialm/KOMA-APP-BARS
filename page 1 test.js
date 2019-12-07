import React from 'react';
import logo from './logo.svg';
import './App.css';
 import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";




const page1test = () => {

 console.log("Hi page1test!");

let object = {name: "Bengt", age: 33};

  return (
    <div>
     
    <h1> Welcome to page 1 test </h1>

    <Link to={{ pathname: "/page2test", state: object}} > To Page 2! </Link>

    </div>
  );
}

export default page1test;
