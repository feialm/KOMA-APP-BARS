import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


// fake array to test stuff
var a1 = {name:"TNA003", totTime:"100", repTime:"70"};
var a2 = {name:"TNG033", totTime:"100", repTime:"30"};
var a3 = {name:"TNG033", totTime:"100", repTime:"30"};
var a4 = {name:"TNA003", totTime:"100", repTime:"70"};
var a5 = {name:"TNG033", totTime:"100", repTime:"66"};
var a6 = {name:"TNG033", totTime:"100", repTime:"30"};

var activityArray = [a1, a2, a3, a4, a5, a6];

let i = 0;

function colourID(i){

i++;
return i;
}

function colour(i){
 
  let colour1 = "white";

  var mod = colourID(i) % 5;

  if (mod === 0){
    colour1 = "red";
  }
   if (mod === 1){
    colour1 = "blue";
  }
   if (mod === 2){
     colour1 = "green";
  }
   if (mod === 3){
     colour1 = "yellow";
  }
   if (mod === 4){
    colour1 = "brown";
  }
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

function handleClickMenu(e) {
  e.preventDefault();
  console.log('GRATTIS DU KAN KLICKA typ');
}

/*Funktion som ger innehåll genom att skicka in array av objekt*/
function ActivityInfo(props) {

  const a = props.a;
  let barProgress = timeCalc(a.totTime, a.repTime)+"%";

  return(
    <div className="WrapperActivity" onClick={handleClickActivity}>

      {/*Här ska vi försöka skriva ut arrayen med dess namn och tid */}
      <p className="ActivityName">{a.name}</p>
      <div className="ActivityDetails">
          <p className="ActivityPercentage">{timeCalc(a.totTime, a.repTime)}% done</p>
          <p className="ActivityMoreDetails">More details</p>
      </div>

      <div className="ActivityBar" style={{backgroundColor: colour(i)}}></div>
      <div className="ActivityProgress" style={{width: barProgress}}></div>
    
    </div>
  )
}


/*renderar sidelementen typ*/
function App() {
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

      {/*Menu Button*/}
      <div className="MenuButton" onClick={handleClickMenu}>
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
