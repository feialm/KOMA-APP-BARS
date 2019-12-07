import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { useState } from 'react';
import React, { Component } from 'react';



function ReportTime(){
  const [localData, setLocalData] = useState(loadData());
  const [redirect, setRedirect] = useState(false);

   //denna eller funktion gör vi i falla att det är null i localstarage
  function loadData(){
    try {
      const storage = JSON.parse(window.localStorage.getItem("data"));
      return storage || [];
    } 
    catch (e) {
      return [];
    }
  }

  function saveData(a){
    window.localStorage.setItem("data", JSON.stringify(a));
    setRedirect(true);
  }

  function setData(data){
    setLocalData(data);
    saveData(data);
  }

  function fixObject (a,b) {
    console.log(a);
    console.log(b);
    let r = (Number(a)*60) + Number(b);
    const Course = {repTime: r };
    addtoList(Course);
  }

  function addtoList(courseToAdd){
    localData.push(courseToAdd);
    setData(localData);
  }

  let arr = localData;

  return(
    
    <div>
      {redirect === false && 
        <App fixObjectEtikett={fixObject}/>
      }
    </div>
  );
}



//App är form
function App(props){ // props eller inte props??
  const [localData, setLocalData] = useState(loadData());
  const [name, setCoursName] = useState('');
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);
  const [dropTrigg, setDropTrigg] = useState(false);

   function loadData(){
    try {
      const storage = JSON.parse(window.localStorage.getItem("data"));
      return storage || [];
    } 
    catch (e) {
      return [];
    }
  }


  let arr = localData;


  function changeInput(event){
    if(event.target.id === "name"){
        setCoursName(event.target.value);
      }
    else if(event.target.id === "startDate"){
      setStartDate(event.target.value);
    }
    else if(event.target.id === "endDate"){
    setEndDate(event.target.value);
    }
    else if(event.target.id === "hours"){
      setHours(event.target.value);
    }
    else{
        setMin(event.target.value);
    }
  } 

  function dropMenu(){
    console.log("funkar`?");
    console.log(localData);
    //callDropMenu();
if(dropTrigg){
    setDropTrigg(false);
}
  else{
    setDropTrigg(true);
  }
    console.log(dropTrigg);
    RenderMenu(localData);
  }

  function RenderMenu(arr){
  console.log("orkar inte");
  return(
    arr.map(c=> (<MenuContent key={c.id} arrData={c} />))
    );
  }

function MenuContent(arrData){
   let menuList = arrData.arrData;
   console.log("fjksadkf");
   return(
    <div style={{backgroundColor: menuList.color, width: "100%", height: "100px"}}>
      <p>{menuList.id}</p>
    </div>

    );
}


  return (
    <div className="center">
      <div className="appHeader">
        <h1>Report Time</h1>  
      </div>
      {/*wrapper */}
      <div className ="WrapperMain">
        <div>
          <p className ="ReportTimeText"> Activity </p>
          <div className ="border" id ="activitySetTime" onClick={dropMenu}>
          {
            dropTrigg ? (RenderMenu(arr)) : (null)
          }
          </div>
        </div>
        <p className ="ReportTimeText" id="TimeStudied">Time studied</p>
        <div className ="border">
          <div className="WrapperAddTime" id="centerDiv">
            {/*textfält */}
            <input className="TimeBox" id="hours" type="text" placeholder="hh" onChange={changeInput}/>
            <p className="timeIndicator" id="hh">h</p>
            <input className="TimeBox" id="mm" type="text" placeholder="mm" onChange={changeInput}/>
            <p className="timeIndicator" id="minutes" >m</p>
          </div>
        </div>
      </div>
      <Link to="/BarSite.js">
      <button onClick={() => {props.fixObjectEtikett(hours,min)}} className="ReportButtonText">
          <p className="buttonText">Report Time</p>
      </button>
      </Link>
    </div>
  );
}

export default ReportTime;//ska det vara parent eller app här?