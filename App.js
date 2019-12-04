import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import Child from "./Child.js";


//vårt nästa sak är att vi vill försöka skicka vårt course till vårt child så att dem får en props
function Parent(){
  const [localData, setLocalData] = useState(loadData());
  const [redirect, setRedirect] = useState(false);

  function saveData(a){
    window.localStorage.setItem("data", JSON.stringify(a));
    setRedirect(true);
  }

  //denna eller funktion gör vi i falla att det är null i localstarage
  function loadData(){
    try {
      const storage = JSON.parse(window.localStorage.getItem("data"));
      return storage || [];
    } catch (e) {
      return [];
    }
  }

  function setData(data){
    setLocalData(data);
    saveData(data);
  }

  function fixObject (a, b, c, d, e) {

    let TotTime = (Number(d)*60) + Number(e);
    let g = String(0); //reptime
    let f = String(TotTime);

    const Course = {name: a, startDate: b, endDate: c, totTime: f, repTime: g };
     
    addtoList(Course);
  }

  function addtoList(courseToAdd){
    localData.push(courseToAdd);
    setData(localData);
  }

  return(
    <div>
      {redirect === false && 
      <App fixObjectEtikett={fixObject} />
      }
      {redirect === true && 
      <Child courses={localData} />
      }
    </div>
  );
}
 /**/

//App är form
function App(props) { // props eller inte props??

  const [name, setCoursName] = useState({name: ''});
  const [startDate, setStartDate] = useState({startDate: 0});
  const [endDate, setEndDate] = useState({endDate: 0});
  const [hours, setHours] = useState({setH: 0});
  const [min, setMin] = useState({setMin: 0});


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

  return (
    <div className="App" id="Add">
      <div className="App-header">
        <h1 className="title">Add Activity</h1>
      </div>
      <div className="MainBody">
        <div className="WrapperAddActivity">
          <div className="WrapperAddName">
            <p className="addActivityText" id="activityName">Activity Name</p>
            <input className="textBox" type="text" placeholder="Name" onChange={changeInput}/>
          </div>
          <div className="WrapperDate">
            <div className="WrapperStartDate"> 
              <p className="addActivityText">Start Date</p> 
              <input className="dateBox" type="text" placeholder="ddmmyy" onChange={changeInput}/>
            </div>
            <div className="WrapperEndDate">
              <p className="addActivityText">End Date</p>
              <input className="dateBox" type="text" placeholder="ddmmyy" onChange={changeInput}/>
            </div>
          </div>
          <div className="WrapperAddTime">
          <p className="addActivityTime">Set Time:</p>
            <div className="time">
              <input className="timeBox" id="hours" type="text" placeholder="hh" onChange={changeInput}/>
              <p className="timeIndicator">h</p>
              <input className="timeBox" id="min" type="text" placeholder="mm" onChange={changeInput}/>
              <p className="timeIndicator">m</p>
            </div>
          </div>
          <div className="addActivityButton">
            <button className="cancelButton">
              <p className="buttonText">Cancel</p>
            </button>
            <button onClick={() => props.fixObjectEtikett(name,startDate,endDate,hours,min)} className="saveButton">
              <p className="buttonText" id="saveButtonText">Save</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parent;//ska det vara parent eller app här?

