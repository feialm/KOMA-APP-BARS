

//import React from "react";
import './App.css';
import { useState } from 'react';
import React, { Component } from 'react';

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
  percentage = percentage.toFixed(2);
  return percentage;
}


function handleClickActivity(e) {
  e.preventDefault();
}

function handleClickQuestion(e) {
  e.preventDefault();
}


function renderActivities(props){
  const b = props.courses;
  return (
      b.map(c=> (<ActivityInfo key={c.name} a={c} />))
    );
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


//}//den här är tillaggd var sist förut!!!!!!!!!!!!
/*renderar sidelementen typ*/
	function APPChild(props) {
	  i = 0;
  	
    /*meny lista typ*/
    const [menuWidth, changeMenuWidth] = useState(0);     
    const [buttonWidth, changeButtonWidth] = useState(0);
    const [hideMenu, triggerHideMenu] = useState(true);
    const [hideQuestion, triggerHideQuestion] = useState(true); 
    const [questionWidth, changeQuestionWidth] = useState(0); 
    const [questionOpacity, changeQuestionOpacity] = useState("100%"); 
    const [closeQuestionOpacity, changeCloseQuestionOpacity] = useState("0%");

    /* om man klickar på question button */
    function handleClickQuestion() {
      if(hideQuestion){
        triggerHideQuestion(false);
        changeQuestionWidth("100%");
        changeQuestionOpacity("0%");
        changeCloseQuestionOpacity("100%");
       
      }
      else{
        triggerHideQuestion(true);
        changeQuestionWidth("0");
        changeQuestionOpacity("100%");
        changeCloseQuestionOpacity("0%");
      }
    }

    function questionText(){
      if(hideQuestion === false){
        return(
          <div className="questionWrapper">
            <div className="App-header" id="helpHeader">
              <h1>HELP<br/></h1>
            </div>
            <div className="questionText">
              <p className="helpTitle">To do List</p>
              <p className="helpText">-centera meny √ <br/> -skriva text till help <br/> -hitta på namn <br/> -footer swipe</p>
              <p className="helpTitle">To do List</p>
              <p className="helpText">-centera meny √ <br/> -skriva text till help <br/> -hitta på namn <br/> -footer swipe</p>
              <p className="helpTitle">To do List</p>
              <p className="helpText">-centera meny √ <br/> -skriva text till help <br/> -hitta på namn <br/> -footer swipe</p>
              <p className="helpTitle">To do List</p>
              <p className="helpText">-centera meny √ <br/> -skriva text till help <br/> -hitta på namn <br/> -footer swipe</p>
              <p className="helpTitle">To do List</p>
              <p className="helpText">-centera meny √ <br/> -skriva text till help <br/> -hitta på namn <br/> -footer swipe</p>
            </div>
          </div>
        );
      }
    }


     /* om man klickar på meny-knappen */
    function HandleClickMenu(){       /*gör likadant för allt annat, typ?*/
      if(hideMenu){                   /* öppnar menyn */
        triggerHideMenu(false);
        changeMenuWidth("100%");
        changeButtonWidth("200px");
      }
      else{                           /* göm menyn */
        triggerHideMenu(true);  
        changeMenuWidth("0");
        changeButtonWidth("0");
      }
    }

  function reportTime(){
    if (hideMenu === false){
      return(
        <p className="buttonText">Report Time</p>
      );
    }
  }

  function addActivity(){
    if (hideMenu === false){
      return(
        <p className="buttonText">Add Activity</p>
      );
    }
  }

  function deleteActivity(){
    if (hideMenu === false){
      return(
        <p className="buttonText">Delete Activity</p>
      );
    }
  }

  return (
    <div className="App" id="bars">
 
      {/*Header*/}
      <div className="App-header" id="headerBars">
        <div className="title">
          <h1>APPNAME</h1>
          <p className="description">My Activities</p>
         </div>
      </div>

      {/*Question Button*/}
      <div className="QuestionButton" onClick={handleClickQuestion}>
       <p className="question">?</p>
      </div>

      {/*Main body*/}
      <div className="MainBody">
        {renderActivities(props)}  {/*här ska vi rendera ActivityInfo, för att skriva ut kursinfo*/}
      </div>

      {/*Footer*/}
      <div className="App-bottom">
      <p className="Dots">Bottom Header</p>
      </div>

      {/*Menu Button*/}
      <div className="MenuButton" onClick={HandleClickMenu}>
        <div className="MenuIcon">
          <div className="menu"></div>
          <div className="menu"></div>
          <div className="menu"></div>
        </div>
      </div>

      {/*Menu List*/}
      <div className="menuClass" style={{width: menuWidth}}>
        <div className="menuID" style={{width: menuWidth}}></div>
        <button className="reportButton" style={{width: buttonWidth}}>{reportTime()}</button>
        <button className="addButton" style={{width: buttonWidth}}>{addActivity()}</button>
        <button className="deleteButton" style={{width: buttonWidth}}>{deleteActivity()}</button>
      </div>
      
      {/*Question List*/}
      <div className="questionID" style={{width: questionWidth}}>
        {questionText()}
      </div>
    </div>
  );
}

//return null;


export default APPChild;