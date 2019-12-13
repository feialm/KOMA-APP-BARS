import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
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
  console.log('hej du klickade rätt typ');
}

function handleClickQuestion(e) {
  e.preventDefault();
  console.log('hej du klickade rätt typ igen');
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
              <div className="box" style={{backgroundColor:props[i].color}}>
               
              </div></td>) 
            children.push(<td className='idLabel' key={i + 'b'}><p>{props[i].id}</p></td>)
            children.push(<td className='timeLabel' key={i + 'c'}><p>{stringTime(props[i].repTime)+" of "+ recTime_today(props,i) }</p></td>)  //myData[i].value+'h'
          

          //Create a parent and add it's children
          table.push(<tr key={i + 'd'}>{children}</tr>)
        }
        return table
}

//days = 13

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

  let difference_In_Time1 = difference_In_Time/(60000);

  let daysbetween = difference_In_Time1*0.000694444444;
  let timePerDay = (Number(props[i].totTime)/daysbetween);
  totalHoursPerDay = totalHoursPerDay + timePerDay;
  console.log(totalHoursPerDay);

  return timePerDay;
}


function recTime(){ //Shows the recommended time of h and min for todays studies.
   let props = loadData();
   let totHours = 0;
   for (var i = 0; i < props.length; i++){
     totHours = totHours + howManyHoursToday(props, i);
   }

console.log(totHours);


//console.log(Number(totHours));
console.log("K");
  return stringTime(totHours);
  //return stringTime(10);
}

function callRepTime(){
  temp = true;
}

function stringTime(totalTime){
  console.log(totalTime);
  var hours = Math.floor(totalTime/60);
 console.log(hours);
  var minutes = (totalTime % 60);
console.log(minutes);
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
      console.log('hej du klickade på frågetecknet');
  }

  function questionText(){
    if(hideQuestion === false){
      return(
        <div className="questionWrapper">
          <div className="appHeader">
          <h1 className="title">HELP<br/></h1>
          </div>
          <div className="questionText center">
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
  /*
    function handleClickReport() {
    console.log(' du klickade på Report');
     setRedirect(true);
  }
  */
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
  console.log(props.data);

    return (
      <div className="center mainBody">
        {/*<div>
          <button onClick={changeData}>Transform</button>
        </div>*/}
        <div className="appHeader head">
          <Link to="/">
            <div className="fitText">
              <h1>StudyUp</h1>
            </div> 
          </Link>
          <p className="h3">To achieve your goal, <br/>study these hours daily</p>
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
        <div className="donut heightMax">
          <div className="recTime center">
          <p className="removeMargin recTimeText">Study</p>
            <p className="removeMargin recTimeText"> 
            {
              recTime()
            } 
            </p>
          </div>
          <AnimatedPieHooks
            data={props}
            width={300}
            height={300}
            innerRadius={80}
            outerRadius={150}
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

        {/*Footer*/}
      <div className="App-bottom">
      <p className="dots">Bottom Header</p>
      </div>
      </div>
    );
  
}
export default DonutSite;

/*var myData = [
    {
        "id": "TNA004",
        "label": "Analys2",
        "value": 576, //rec min
        "addedTime": 10, //gjort min idag
        "totAddedTime":10, //gjort totalt
        "color": "#f92672",
        "startDate":"11/27/2019", //MM/DD/ÅÅÅÅ  30dar skillnad
        "endDate":"12/27/2019"
    },
    {
        "id": "TNA001",
        "label": "Grunken",
        "value": 360,
        "addedTime": 10,
        "totAddedTime":20, //gjort totalt
        "color": "#66D9EF",
        "startDate":"11/27/2019", //MM/DD/ÅÅÅÅ
        "endDate":"12/27/2019"
    },
    {
        "id": "TNG033",
        "label": "Programmering i c++",
        "value": 560,
        "addedTime": 24,
        "totAddedTime":24, //gjort totalt
        "color": "#A6E22E",
        "startDate":"11/27/2019", //MM/DD/ÅÅÅÅ
        "endDate":"12/27/2019"
    },
    {
        "id": "TND002",
        "label": "Objektorienterad Programmering",
        "value": 310,
        "addedTime": 240,
        "totAddedTime":300, //gjort totalt
        "color": "#AE81FF",
        "startDate":"11/27/2019", //MM/DD/ÅÅÅÅ
        "endDate":"11/28/2020"
    },
     {
        "id": "TNM088",
        "label": "Digitala medier",
        "value": 436,
        "addedTime": 120,
        "totAddedTime":130, //gjort totalt
        "color": "#FFE792",
        "startDate":"11/27/2019", //MM/DD/ÅÅÅÅ
        "endDate":"12/27/2019"
    },

    {
        "id": "TNA005",
        "label": "Tilmp mat i teknik",
        "value": 354,
        "addedTime": 20,
        "totAddedTime":20, //gjort totalt
        "color": "#FD971F",
        "startDate":"11/27/2019", //MM/DD/ÅÅÅÅ
        "endDate":"01/27/2020"
    }
];*/