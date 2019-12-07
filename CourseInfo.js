import React from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
import * as d3 from "d3";
import AnimatedPieHooksdays from './doughnut_course_time.js';
import AnimatedPieHooksworked from './doughnut_course_worktime.js';


function loadData(){
    try {
      const storage = JSON.parse(window.localStorage.getItem("data"));
      return storage || [];
    } catch (e) {
      return [];
    }
  }

function write_name(){
  let myData = loadData();
  var name = myData[0].id; 
  return <h1>{name}</h1>;
}

function hours_to_min(value){
  var hours = value/60
  return hours
}

function days_tot(){
  let myData = loadData();
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

function day_span(){
    let myData = loadData();

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

function hour_donut_text() { //Måste ändra vad myData[0]. är för nått
    let myData = loadData();

  var hour_worked = (myData[0].totTime)/ 60;
  
  if( hour_worked % 1 < 0.5){
        hour_worked = Math.floor(hour_worked)
     }
  else
     {
       hour_worked= Math.ceil(hour_worked)
     }

  var tot_time = (myData[0].totTime)/ 60;

  if( tot_time % 1 < 0.5){
        tot_time = Math.floor(tot_time)
     }
  else
     {
       tot_time= Math.ceil(tot_time)
     }
    console.log('hour_worked')
     console.log(hour_worked)
     console.log('tot_time')
     console.log(tot_time)

     return <p>{hour_worked} / {tot_time}</p>

}

function day_donut_text() {
    let myData = loadData();

  return <p>{days_tot(myData)}</p>
}


function create_fake_array_two(myData){
var dayDiff_nbr = days_tot(myData)

var dayDiff_per = day_span(myData)

if(((myData[0].value)-(myData[0].totAddedTime))<0){
  var recomend_left = 0

}
else
{
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
    var tot_value_min = myData[0].value
    var tot_worked_min = myData[0].totAddedTime

    var days_left= days_tot(myData)
    console.log(days_left)
    var work_a_day = (tot_value_min-tot_worked_min)/days_left;

    var hours= Math.floor(work_a_day/60);
    console.log(hours+"Hours")
    var minutes = (work_a_day % 60);
    console.log(minutes+"min")
  
   if(minutes === 0){
     return hours+'h';
   }
   if(hours === 0){
     return Math.floor(minutes)+"min"
    }

   return hours+'h '+ Math.floor(minutes)+'min';



    return <p>Goal: {hours}h {Math.floor(minutes)}</p>
}


function courseinfo() {
  return (
    <div className="App">
        {/*<div>
          <button onClick={changeData}>Transform</button>
        </div>*/}
        <div className="appHeader head fitText">
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
              width={170}
              height={170}
              innerRadius={60}
              outerRadius={84}
            />
              
            <div id="lhsText">
              {hour_donut_text(myData)}
              <p>hours</p>
            </div>
         
          </div>

          <div id="second">
           <AnimatedPieHooksdays
            data={create_fake_array(myData)}
            width={170}
            height={170}
            innerRadius={60}
            outerRadius={84}
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
            <button onClick={() =>( myData[0].id, myData[0].startDate,myData[0].endDate,myData[0].value)} className="reportButton_CourseInfo center">
               <p className="buttonText" id="reportButtonText">Report time</p>
            </button>
          
            <button onClick={() =>( myData[0].id, myData[0].startDate,myData[0].endDate,myData[0].value)} className="editButton center">
               <p className="buttonText" id="editButtonText">Edit activity</p>
           </button>
         </div>

    
    </div>
  );
}

export default courseinfo;

var myData = [
    {
        "id": "TNA004",
        "label": "Analys2",
        "value": 876, //rec min
        "addedTime": 110, //gjort min idag
        "totAddedTime":110, //gjort totalt
        "color": "#f92672",
        "startDate":"12/02/2019", //MM/DD/ÅÅÅÅ
        "endDate":"12/05/2019"
    }
];