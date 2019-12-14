import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { useState } from 'react';
import React, { Component } from 'react';
import ReportTime from "./ReportTime.js";
import CourseInfo from './CourseInfo.js';

var menubool = false;
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

function gotoCourseInfo(props){
  return(
    <CourseInfo test={props}/>
 );
}

function handleClickActivity(props) {
  gotoCourseInfo(props);
  return props;
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


function renderActivities(HHH){
  return (
     HHH.map(c=> (<ActivityInfo key={c.name} a={c} />))
  );
}


/*Funktion som ger innehåll genom att skicka in array av objekt*/
function ActivityInfo(HHH) {
  const a = HHH.a;
  let barProgress = timeCalc(a.totTime, a.repTime)+"%";
  var same = colour(i);
  
  return(
    <Link to={{pathname: "/CourseInfo.js", state: a}}>
      <div className="wrapperActivity" onClick={() => handleClickActivity(a)}>
        <p className="activityName">{a.id}</p>
        <div className="activityDetails">
          <p className="activityPercentage">{timeCalc(a.totTime, a.repTime)}% done</p>
          <p className="activityMoreDetails">More details</p>
        </div>
        <div className="activityBar" style={{backgroundColor: same, opacity: 0.3}}/>
        <div className="activityProgress" style={{width: barProgress, backgroundColor: same, opacity: 0.8}}/>
      </div>
    </Link>
  )
}

//}//den här är tillaggd var sist förut!!!!!!!!!!!!
/*renderar sidelementen typ*/
function BarSite(HHH) {
  var HHH = loadData();
  i = 0;

  /*meny lista typ*/
  const [menuWidth, changeMenuWidth] = useState(0);     
  const [buttonWidth, changeButtonWidth] = useState(0);
  const [hideMenu, triggerHideMenu] = useState(true);
  const [hideFeedBack, triggerHideFeedBack] = useState(true);

  /*Questionbutton and list*/
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
      	<div className="questionWrapper fitText">
	      	<div className="appHeader" style={{height: "90px"}}>
	      		<h1 className="title">Help<br/></h1>
	      	</div>
	      	<div className="questionText center">
		    		<p className="helpText" style={{marginTop: "10px"}}>StudyUp help organise and keep track spent on your course.<br/></p>
				 		<p className="helpText">View all the courses from the homepage!<br/></p>
						<p className="helpText">Select a course to find details about it!<br/></p>
						<p className="helpText">Press the <span style={{color: "#ae81ff"}}>purple button</span> to find out how many hours you need to study each course everyday!</p>
						<p className="helpTitle" style={{marginTop: "35px"}} >Menu options</p>
						<p className="helpText" style={{marginTop: "0"}}>Select <span style={{color: "#fd971f"}}>Report Time </span>to report time spent on a course.</p>
						<p className="helpText">Select <span style={{color: "#a6e22e"}}>Add Course </span>to add a course.</p>
						<p className="helpText">Select <span style={{color: "#f92672"}}>Delete Course </span>to delete a course.</p>
						<p className="helpText">Select <span style={{color: "#ae81ff"}}>Reset </span>to make a default reset of the app.</p>
	      	</div>
	      	<div className="App-bottom">
        		<p className="dots">Bottom Header</p>
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

  function HandleClickFeedBack(){ /*gör likadant för allt annat, typ?*/
    if(hideFeedBack){  
      feedBack();                 /* öppnar menyn */
      triggerHideFeedBack(false);
      changeMenuWidth("100%");
      changeButtonWidth("200px");
      console.log("aaa popup where");
    }
    else{                           /* göm menyn */
      triggerHideFeedBack(true);  
      changeMenuWidth("0");
      changeButtonWidth("0");
      console.log("no popup");
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
        <p className="buttonText">Add Course</p>
      );
    }
  }


  function deleteActivity(){
    if (hideMenu === false){
      return(
        <p className="buttonText">Delete Course</p>
      );
    }
  }


  function clearList(){
    window.localStorage.clear();
    window.location.reload(true);
  }


  function feedBack(){
    return(
      <div className="feedBack" id="resetButton">
        <h1>WARNING!</h1>
        <p>Are you sure that you want to DELETE all the courses?</p>
        <button style={{width: 210} } onClick={() => clearList()} className="purpleButton" id="resetButton">
          <p className="buttonText pBlack">Yes</p>
        </button>
        <button style={{width: 210}} className="redButton" onClick={() => window.location.reload(true)}>
          <p className="buttonText pBlack">No</p>
        </button>
      </div>
    );
  }

  return (
    <div className="center">
 
      {/*Header*/}
      <div className="appHeader head">
        <h1 className="titleDescrip">StudyUp</h1>
         <p className="h3">My Courses</p>
      </div>

      {/*Question Button*/}
      <div className="questionButton smalCirkel" onClick={handleClickQuestion}>
        <p className="question removeMargin">?</p>
      </div>

       {/*Question List*/}
      <div className="questionID" style={{width: questionWidth}}>
        {questionText()}
      </div>
      {
        hideFeedBack ? (null) : (feedBack())
      }

      {/*Main body*/}
      <div className="mainBody">
        {renderActivities(HHH)}  {/*här ska vi rendera ActivityInfo, för att skriva ut kursinfo*/}
      </div>


      {/*Menu Button*/}
      <div className="menuButton" onClick={HandleClickMenu}>
        <div className="menuIcon">
          <div className="menu"/>
          <div className="menu"/>
          <div className="menu"/>
        </div>
      </div>

      {/*Menu List*/}
      <div className="menuClass" style={{width: menuWidth}}>
        <div className="menuID" style={{width: menuWidth}}/>
          <Link to="/ReportTime.js">
            <button className="orangeButton reportButton" style={{width: buttonWidth}}>
              {reportTime()}
            </button>
          </Link>
          <Link to="/FormSite.js">
            <button className="addButton" style={{width: buttonWidth}}>
              {addActivity()}
            </button>
          </Link>
          <button className="deleteButton" style={{width: buttonWidth}}>
            {deleteActivity()}
          </button>
          <button style={{width: buttonWidth}} onClick={HandleClickFeedBack} className="orangeButton resetButton">
            <p className="buttonText pBlack">Reset</p>
          </button>
        </div>
        <Link to="/DonutSite.js">
          <div className="nextPage_right">
            <p>&#62;</p>
          </div>
        </Link>
      <div>
       
      {/*Footer*/}
      <div className="App-bottom">
        <p className="dots">Bottom Header</p>
      </div>
    </div>
  </div>
  );
}

//return null;


export default BarSite;