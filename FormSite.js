import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
//import Child from "./Child.js"


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

function colour(){
  var props = loadData();
  let arrayFromStorage = JSON.parse(localStorage.getItem("data"));
  var colorCounter = props.length;
  console.log(colorCounter)
  console.log('colorCounter');
  let colour1 = "white";

  var mod = colorCounter % 5;

  if (mod === 0){
    colour1 = "#f92672"; //rosa
  }
   else if (mod === 1){
    colour1 = "#a6e22e"; //grön #33c474
  }
   else if (mod === 2){
     colour1 = "#66d9ef" //blå #4ac3ff
  }
   else if (mod === 3){
     colour1 = "#ae81ff"; //lila #ca45ff
  }
   else if (mod === 4){
    colour1 = "#fd971f"; //orange
  }
  else
    colour1="yellow";

  colorCounter= colorCounter+1;

  console.log(colorCounter);
  return colour1;
}

  function fixObject (a, b, c, d, e) {
    console.log(a)
    if (a == ""){
      a = "NoName"
      console.log("NoName achived")
    }
    if(b == ""){
      b = "12/11/2019"

    }
    if(c == ""){
      c = "12/24/2020"
    }

    let TotTime = (Number(d)*60) + Number(e);
    let g = String(0); //reptime
    let f = String(TotTime);

    const Course = {id: a, startDate: b, endDate: c, totTime: f, repTime: g, repTodayTime: "0", color: colour(), colorCounter: "0" };
     
    addtoList(Course);

  }

 
  
  function addtoList(courseToAdd){
    localData.push(courseToAdd);
    setData(localData);
  }

  return(
    <div>
      <App fixObjectEtikett={fixObject} />
    </div>
  );
}

function clearList(){
  window.localStorage.clear();
  window.location.reload(true);
}


//App är form
function App(props) { // props eller inte props??
  console.log("vad får vi in??");
  console.log(props);
  console.log("Fick vi");

  const [name, setCoursName] = useState('');
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [hours, setHours] = useState(2);
  const [min, setMin] = useState(0);


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
    
  

	/*Main render for FormSite*/	

  return (

 <div className="center">

     <div className="appHeader head">
          <Link to="/">
            <div className="fitText">
              <h1>studyUp</h1>
            </div> 
          </Link>
        <p class="h3">Create your activity!</p>
      </div>

      <div className="mainBody">
        <div className="wrapperAddActivity fitText">
          <div className="wrapperAddName">
            <p className="addActivityText" id="activityName">Activity Name</p>
            <input className="textBox" id="name" type="text" placeholder="Name" onChange={changeInput}/>
          </div>
          <div className="wrapperDate">
            <div className="wrapperStartDate"> 
              <p className="addActivityText">Start Date</p> 
              <input className="dateBox" id="startDate" type="text" placeholder="ddmmyy" onChange={changeInput}/>
            </div>
            <div className="wrapperEndDate">
              <p className="addActivityText">End Date</p>
              <input className="dateBox" id="endDate" type="text" placeholder="ddmmyy" onChange={changeInput}/>
            </div>
          </div>
          <div className="wrapperAddTime">
          <p className="addActivityTime">Set time:</p>
            <div className="time">
              <input className="timeBox"  type="text" placeholder="hh" onChange={changeInput}/>
              <p className="timeIndicator">h</p>
              <input className="timeBox"  type="text" placeholder="mm" onChange={changeInput}/>
              <p className="timeIndicator">m</p>
            </div>
          </div>
          <div className="addActivityButton fitText">
          <button className="cancelButton">
            <p className="buttonText pBlack">Cancel</p>
          </button>
          <button onClick={() => clearList()} className="clearButton" id="clearButton">
            <p className="buttonText pBlack" id="clearButtonText">Clear</p>
          </button>
          <Link to="/BarSite.js">
            <button onClick={() => props.fixObjectEtikett(name,startDate,endDate,hours,min)} className="saveButton">
              <p className="buttonText pBlack" id="saveButtonText">Save</p>
            </button>
          </Link>
          
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Parent;//ska det vara parent eller app här?