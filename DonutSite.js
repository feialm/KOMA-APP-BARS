import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import * as d3 from "d3";
import AnimatedPieHooks from './doughnut.js';


//denna eller funktion gör vi i falla att det är null i localstarage
function loadData(){
  try {
    const storage = JSON.parse(window.localStorage.getItem("data"));
    return storage || [];
  } catch (e) {
    return [];
  }
}

//Fei och Jessie implementering med knappar
function handleClickActivity(e) {
  e.preventDefault();
}

function handleClickQuestion(e) {
  e.preventDefault();
}
 
//Donut funktioner utan modifiering 
function createTable() {
  let props = loadData();
  let table = [];

  //Outertable to create parent
  for(let i = 0; i < props.length; i++){
    let children = []
    //Inner loop to create children // 
    children.push(
      <td className='color' key={i + 'a'}>
        <div className="box" style={{backgroundColor:props[i].color}}/>
      </td>
    ) 
    children.push(<td className='idLabel' key={i + 'b'}><p>{props[i].id}</p></td>)
    children.push(<td className='timeLabel' key={i + 'c'}><p>{stringTime(props[i].repTime)+" of "+ recTime_today(props,i) }</p></td>) 
    //Create a parent and add it's children
    table.push(<tr key={i + 'd'}>{children}</tr>)
  }
  return table
}


function recTime_today(props, i){
  let timePerDay2 = howManyHoursToday(props, i);
  return  stringTime(timePerDay2)
}

var totalHoursPerDay = 0;
let temp = false;

function howManyHoursToday(props, i){
  var endDate = new Date(props[i].endDate)
  var todaysDate = new Date() 
  var difference_In_Time = (endDate.getTime() - todaysDate.getTime());
  var daysbetween = (difference_In_Time/(60000))*0.000694444444;
  var timePerDay = (Number(props[i].totTime)/daysbetween);
  totalHoursPerDay = totalHoursPerDay + timePerDay;
  return timePerDay;
}

function recTime(){ //Shows the recommended time of h and min for todays studies.
  let props = loadData();
  let totHours = 0;

  for (var i = 0; i < props.length; i++){
    totHours = totHours + howManyHoursToday(props, i);
  }

  return stringTime(totHours);
}

function callRepTime(){
  temp = true;
}

function stringTime(totalTime){
  var hours = Math.floor(totalTime/60);
  var minutes = (totalTime % 60);
  if(minutes === 0){
    return hours + 'h';
  }
  if(hours === 0){
    return Math.floor(minutes)+"min"
  }
  return hours + 'h '+ Math.floor(minutes) + 'min';
}

//Vår självaste sida
function DonutSite(props){
   var props = loadData();
  //New code for buttons etc
  const [menuWidth, changeMenuWidth] = useState(0);
  const [buttonWidth, changeButtonWidth] = useState(0);
  const [hideMenu, triggerHideMenu] = useState(true);
  const [hideQuestion, triggerHideQuestion] = useState(true); 
  const [questionWidth, changeQuestionWidth] = useState(0); 
  const [questionOpacity, changeQuestionOpacity] = useState("100%"); 
  const [closeQuestionOpacity, changeCloseQuestionOpacity] = useState("0%");

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

  function HandleClickMenu(){
    if(hideMenu){
      triggerHideMenu(false);
      changeMenuWidth("100%");
      changeButtonWidth("200px");
    }else{
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
    <div className="center mainBody">
      <div className="appHeader head" style={{height: "120px"}}>
        <Link to="/">
          <div className="fitText">
            <h1 className="titleDescrip">StudyUp</h1>
          </div> 
        </Link>
        <p className="h3">Study these hours<br/> daily to achieve your goal</p>
      </div>
    
    {/*Question Button*/}
      <div className="questionButton smalCirkel" onClick={handleClickQuestion}>
         <p className="question removeMargin">?</p>
      </div>

    {/*Question List*/}
      <div className="questionID" style={{width: questionWidth}}>
        {questionText()}
      </div>
     {/*Donutgeneration*/}

      <div className="bodyDonut">
        <div className="donut heightMax">
          <div className="recTime center">
            <p className="removeMargin recTimeText" style={{fontSize: "18px"}}>Study</p>
            <p className="removeMargin recTimeText"> 
            {
              recTime()
            } 
            </p>
            <p className="removeMargin recTimeText" style={{fontSize: "18px"}}>today</p>
          </div>
          <AnimatedPieHooks
            data={props}
            width={250}
            height={250}
            innerRadius={70}
            outerRadius={125}
          />
        </div>
        <div id='myData'>
          <table className="wrapperOutline tableDonut center">
          {createTable(props.data)}
          </table>
        </div>
        <Link to="/">
          <div className="nextPage_left"><p>&#60;</p></div>
        </Link>
      </div>

      {/*Footer*/}
      <div className="App-bottom">
        <p className="dots">Bottom Header</p>
      </div>
    </div>
  );
}
export default DonutSite;
