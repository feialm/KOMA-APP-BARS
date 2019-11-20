import React, { Component } from 'react';
import './App.css';
import { useState } from 'react';


// fake array to test stuff
var a1 = {name:"TNA003", totTime:"100", repTime:"70"};
var a2 = {name:"TNG033", totTime:"100", repTime:"30"};
var a3 = {name:"TNG033", totTime:"100", repTime:"30"};
var a4 = {name:"TNA003", totTime:"100", repTime:"70"};
var a5 = {name:"TNG033", totTime:"100", repTime:"66"};
var a6 = {name:"TNG033", totTime:"100", repTime:"30"};

var activityArray = [a1, a2, a3, a4, a5, a6];

let i = 0;

function incrementID(){
  i++;
}

function colour(i){
 
  let colour1 = "white";

  var mod = i % 5;

  if (mod === 0){
    colour1 = "#f92672"; //rosa
  }
   else if (mod === 1){
    colour1 = "#a6e22e"; //grön #33c474
  }
   if (mod === 2){
     colour1 = "#66d9ef" //blå #4ac3ff
  }
   if (mod === 3){
     colour1 = "#ae81ff"; //lila #ca45ff
  }
   if (mod === 4){
    colour1 = "#fd971f"; //orange
  }

  incrementID();
  return colour1;
}

function timeCalc(total, part){
  var percentage = (part/total)*100;
  return percentage;
}

function renderActivities(){
  return (
      activityArray.map(c => ( <ActivityInfo key={c.name} a={c} />))
    );
}

function handleClickActivity(e) {
  e.preventDefault();
  console.log('hej du klickade rätt typ');
}

function handleClickQuestion(e) {
  e.preventDefault();
  console.log('hej du klickade rätt typ igen');
}




/*Funktion som ger innehåll genom att skicka in array av objekt*/
function ActivityInfo(props) {

  const a = props.a;
  let barProgress = timeCalc(a.totTime, a.repTime)+"%";
  var same = colour(i);

  return(
    <div className="WrapperActivity" onClick={handleClickActivity}>

      {/*Här ska vi försöka skriva ut arrayen med dess namn och tid */}
      <p className="ActivityName">{a.name}</p>
      <div className="ActivityDetails">
          <p className="ActivityPercentage">{timeCalc(a.totTime, a.repTime)}% done</p>
          <p className="ActivityMoreDetails">More details</p>
      </div>
      
      <div className="ActivityBar" style={{backgroundColor: same, opacity: 0.3}}></div>
      <div className="ActivityProgress" style={{width: barProgress, backgroundColor: same, opacity: 0.8}}></div>
    
    </div>
  )
}


  function reportTime(){
  return(
    <p>Report Time</p>
    )
}

/*renderar sidelementen typ*/
function App(props) {
i = 0;
const [menuWidth, changeMenuWidth] = useState(0);
const [buttonWidth, changeButtonWidth] = useState(0);

  function HandleClickMenu(){
      
    changeMenuWidth("100%");
    changeButtonWidth("250px");
   
    console.log('GRATTIS DU KAN KLICKA typ');
  }

 function reportTime(){
  if (buttonWidth === "250px"){
    return(
      <p>Report Time</p>
      );
  }
 }

 function addActivity(){
  if (buttonWidth === "250px"){
    return(
      <p>Add Activity</p>
      );
  }
 }

  function deleteActivity(){
  if (buttonWidth === "250px"){
    return(
      <p>Delete Activity</p>
      );
  }
 }
  return (
    <div className="App">
 
      {/*Header*/}
      <div className="App-header">
        <h1>APPNAME</h1>

        {/*Question Button*/}
        <div className="QuestionButton" onClick={handleClickQuestion}>
         <p className="question">?</p>
        </div>
      </div>

      {/*Main body*/}
      <div className="MainBody">
        {renderActivities()}  {/*här ska vi köra ActivityInfo, för att skriva ut kursinfo*/}
    
      </div>

      {/*Footer*/}
      <div className="App-bottom">
      <p className="Dots">Bottom Header</p>
      </div>

       <div id="menuID" style={{width: menuWidth}}></div>

        <div className="buttonWrapper" style={{width: buttonWidth}}>
        <div className="reportButton" style={{width: buttonWidth}}>{reportTime()}</div>
        <div className="addButton" style={{width: buttonWidth}}>{addActivity()}</div>
        <div className="deleteButton" style={{width: buttonWidth}}>{deleteActivity()}</div>
       </div>

      {/*Menu Button*/}
      <div className="MenuButton" onClick={HandleClickMenu}>
        <div className="MenuIcon">
          <div className="menu"></div>
          <div className="menu"></div>
          <div className="menu"></div>
        </div>
      </div>
    </div>
  );
}

export default App;
