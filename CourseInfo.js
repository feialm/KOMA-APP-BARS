import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import * as d3 from "d3";
import AnimatedPieHooksdays from './doughnut_course_time.js';
import AnimatedPieHooksworked from './doughnut_course_worktime.js';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function setMyData(theObject){ 
  var myDataTemp=[
    {
      "id":  theObject.id, 
      "label": "Används ej",
      "value": theObject.totTime, //rec min, totala tiden 
      "addedTime": theObject.repTodayTime, //gjort min idag 
      "totAddedTime":theObject.repTime, //gjort totalt  
      "color": theObject.color,  
      "startDate":theObject.startDate, //MM/DD/ÅÅÅÅ
      "endDate":theObject.endDate    }
  ];
  return myDataTemp;
}


function loadData(myData){
  try {
    const storage = JSON.parse(window.localStorage.getItem("data"));
    return storage || [];
  } catch (e) {
    return [];
  }
}

function write_name(myData){
  {/*let myData = loadData(); */}
  var name = myData[0].id; 
  return <h1 className="title" style={{marginTop: "25px"}}>{name}</h1>;
}

function hours_to_min(value){
  var hours = value/60
  return hours
}

function days_tot(myData){
  var endDate = new Date(myData[0].endDate)
  var todaysDate = new Date()
  var difference_In_Time = endDate.getTime() - todaysDate.getTime();
  var difference_In_Days = difference_In_Time / (1000 * 3600 * 24); 
 
  if( difference_In_Days % 1 < 0.5){
    difference_In_Days = Math.floor(difference_In_Days)
  }
  else
  {
    difference_In_Days= Math.ceil(difference_In_Days)
  }

  return difference_In_Days
}


function day_span(myData){
  var endDate = new Date(myData[0].endDate)
  var startDate = new Date(myData[0].startDate)
  var difference_In_Time = endDate.getTime() - startDate.getTime();

  if(difference_In_Time < 0){
    return 0
  }
  else{
    var difference_In_Days = difference_In_Time / (1000 * 3600 * 24); 
  
    if( difference_In_Days % 1 < 0.5){
        difference_In_Days = Math.floor(difference_In_Days)
     }
    else
      {
       difference_In_Days= Math.ceil(difference_In_Days)
      }
    return difference_In_Days
  }
}

function hour_donut_text(myData) { //Måste ändra vad myData[0]. är för nått
  var hour_worked = (myData[0].totAddedTime)/ 60;
  var tot_time = (myData[0].value)/ 60;
  
  if( hour_worked % 1 < 0.5){
        hour_worked = Math.floor(hour_worked)
     }
  else
     {
       hour_worked= Math.ceil(hour_worked)
     }


  if( tot_time % 1 < 0.5){
        tot_time = Math.floor(tot_time)
     }
  else
     {
       tot_time= Math.ceil(tot_time)
     }
  return <p style={{fontSize: "30px"}}>{hour_worked}/{tot_time}</p>
}


function day_donut_text(myData) {
  return <p style={{fontSize: "30px"}}>{days_tot(myData)}</p>
}


function create_fake_array_two(myData){
  var dayDiff_nbr = days_tot(myData)
  var dayDiff_per = day_span(myData)

  if(((myData[0].value)-(myData[0].totAddedTime))<0){
    var recomend_left = 0
  }
  else {
    var recomend_left=(myData[0].value)-(myData[0].totAddedTime)
  }

  var fakeArray = [
    {
        "id": myData[0].id,
        "label": myData[0].label,
        "value":  myData[0].value, //rec min
        "addedTime":  myData[0].addedTime, //gjort min idag
        "totAddedTime":  myData[0].totAddedTime, //gjort totalt
        "color":  '#AE81FF',
        "startDate": myData[0].startDate, //MM/DD/ÅÅÅÅ  30dar skillnad
        "endDate": myData[0].endDate,
        "recom": myData[0].totAddedTime
    },
    {
       "id": "dummy",
        "label": "dummy_",
        "value": 100, //rec min
        "addedTime": 0, //gjort min idag
        "totAddedTime":0, //gjort totalt
        "color": "#242b2b",
        "startDate":"12/01/2019", //MM/DD/ÅÅÅÅ  30dar skillnad
        "endDate":"12/27/2019",
        "recom": recomend_left
    }
  ];
  return fakeArray
}


function create_fake_array(myData){
  var dayDiff_nbr = days_tot(myData)
  var dayDiff_per = day_span(myData)

  var fakeArray = [
    {
        "id": myData[0].id,
        "label": myData[0].label,
        "value":  myData[0].value, //rec min
        "addedTime":  myData[0].addedTime, //gjort min idag
        "totAddedTime":  myData[0].totAddedTime, //gjort totalt
        "color":  myData[0].color,
        "startDate": myData[0].startDate, //MM/DD/ÅÅÅÅ  30dar skillnad
        "endDate": myData[0].endDate,
        "dayDiff": dayDiff_nbr
    },
    {
       "id": "dummy",
        "label": "dummy_",
        "value": 100, //rec min
        "addedTime": 0, //gjort min idag
        "totAddedTime":0, //gjort totalt
        "color": "#242b2b",
        "startDate":"12/01/2019", //MM/DD/ÅÅÅÅ  30dar skillnad
        "endDate":"12/27/2019",
        "dayDiff": dayDiff_per
    }
  ];
  return fakeArray
}


function goal_text(myData) {
  var tot_value_min = Number(myData[0].value);
  var tot_worked_min = myData[0].totAddedTime;
  var days_left = days_tot(myData);
  var work_a_day = (tot_value_min-tot_worked_min)/days_left;
  var hours= Math.floor(work_a_day/60);
  var minutes = (work_a_day % 60);

  if(minutes === 0){
    return hours+'h';
  }
  if(hours === 0){
    return Math.floor(minutes)+"min"
  }
  return hours+'h '+ Math.floor(minutes)+'min';
}


function courseinfo(props) {
  const theObject = props.location.state;
  var myData=setMyData(theObject);

  return (
    <div className="center">

      {/*Home Button*/}
      <Link to="/">
        <div className="smalCirkel home">
          <i class="fa fa-home fa-2x"></i>
        </div>
      </Link>
      <div className="appHeader head fitText" style={{height: "90px"}}>
        {write_name(myData)}
      </div>

      {/*deadlines*/}
      <div className="deadlines">
        <p id="dead_title">Deadlines</p>
        <div className="deadlines_in">
          <p>Tenta 03/05-20</p>
        </div>
      </div>

      <div id="wrapper"> 
        <div id="first">
          <AnimatedPieHooksworked
            data={create_fake_array_two(myData)}
            width={150}
            height={150}
            innerRadius={50}
            outerRadius={75}
          />
          <div id="lhsText">
            {hour_donut_text(myData)}
            <p>hours</p>
          </div>
        </div>
        <div id="second">
         <AnimatedPieHooksdays
          data={create_fake_array(myData)}
          width={150}
          height={150}
          innerRadius={50}
          outerRadius={75}
          />
          <div id="rhsText">
            {day_donut_text(myData)}
            <p>days left</p>
          </div> 
        </div>
      </div>
      <div className="goal">
        <p>Goal: {goal_text(myData)} per day</p>
      </div>
      <div className="divButtonCourseInfo">
        <Link to="/ReportTime.js"><button onClick={() =>( myData[0].id, myData[0].startDate,myData[0].endDate,myData[0].value)} className="reportButton_CourseInfo center">
          <p className="buttonText" id="reportButtonText">Report time</p>
        </button> </Link>
        <Link to="/">
          <button onClick={() =>( myData[0].id, myData[0].startDate,myData[0].endDate,myData[0].value)} className="editButton center">
            <p className="buttonText" id="editButtonText">Edit course</p>
          </button>
        </Link>
      </div>

      {/*Footer*/}
      <div className="App-bottom">
      <p className="dots">Bottom Header</p>
      </div>
    </div>
  );
}

export default courseinfo;