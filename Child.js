

//import React from "react";
import './App.css';
import { useState } from 'react';
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ReportTime from './ReportTime';

let i = 0;

console.log("h")

function incrementID(){


console.log("a")
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
  percentage = percentage.toFixed(2);
  console.log(total);
  console.log(part);
  return percentage;
}



function handleClickActivity(e) {
  e.preventDefault();
  console.log('hej du klickade rätt typ');
}

function handleClickQuestion(e) {
  e.preventDefault();
  console.log('hej du klickade rätt typ igen');
}


function inData(props){
	const b = props.courses;
	console.log("YOLO");
	console.log(b);
 return (
      b.map(c=> (<ActivityInfo key={c.name} a={c} />))
    );
}





/*Funktion som ger innehåll genom att skicka in array av objekt*/
function ActivityInfo(props) {
const a = props.a;
	console.log(props);
	

	console.log(a)
	  let barProgress = timeCalc(a.totTime, a.repTime)+"%";
	  var same = colour(i);
console.log(barProgress);
   return(
    <div className="WrapperActivity" onClick={handleClickActivity}>

{console.log("Ketchup"),
console.log(a.name)}
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



//}//den här är tillaggd var sist förut!!!!!!!!!!!!
/*renderar sidelementen typ*/
	function APPChild(props) {
	 i = 0;
	const [menuWidth, changeMenuWidth] = useState(0);
	const [buttonWidth, changeButtonWidth] = useState(0);
  const [redirect, setRedirect] = useState(false);

  function HandleClickMenu(){
      
    changeMenuWidth("100%");
    changeButtonWidth("250px");
   
    console.log('GRATTIS DU KAN KLICKA typ');
  }


 function reportTime(){
  if (buttonWidth === "250px"){
    return(
      <p>Report Time</p>
     /* <Route>
      <Route path="/ReportTime" component ={ReportTime} />
      </Route> */
      );
  }
 }

 function handleClickReport() {

  console.log('hej du klickade på Report');
   setRedirect(true);
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
        {inData(props)}  {/*här ska vi rendera ActivityInfo, för att skriva ut kursinfo*/}
    
      </div>

      {/*Footer*/}
      <div className="App-bottom">
      <p className="Dots">Bottom Header</p>
      </div>

       <div id="menuID" style={{width: menuWidth}}></div>

        <div className="buttonWrapper" style={{width: buttonWidth}}>
        <div className="reportButton" style={{width: buttonWidth}} onClick={handleClickReport}>{reportTime()}</div>
        


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

        <div>
   
//Det är detrta vi ska fixa
      {redirect === false && 
      <APPChild />
      }
      {redirect === true && 
      <ReportTime  />
      }
      
    </div>
   
    </div>




  
    


      
      //{redirect === true && <ReportTime /> }
    
    

  );
}

//return null;


export default APPChild;