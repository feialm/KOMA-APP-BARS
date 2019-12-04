import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import * as d3 from "d3";
import AnimatedPieHooks from './doughnut.js';

  /*createTable() {
      return this.state.myData.map((value, index) => {
         const { id, label, value, color } = value //destructuring
         return (
            <tr key={id}>
               <td>{id}</td>
               <td>{label}</td>
               <td>{value}</td>
               <td>{color}</td>
            </tr>
         )
      })
    }*/



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
function createTable(props) {
  console.log(props.courses)
        let table = [];

        console.log(props)

        //Outertable to create parent
        for(let i = 0; i < props.length; i++){
          console.log(props[i].id)
          let children = []
          //Inner loop to create children // 
            children.push(
              <td className='color'>
              <div className="box" style={{backgroundColor:props[i].color}}>
               
              </div></td>)
            children.push(<td className='idLabel'>{props[i].label}</td>)
            children.push(<td className='timeLabel'>{stringTime(props[i].addedTime)+" of "+ recTime_today(props,i) }</td>)  //myData[i].value+'h'
          
          //Create a parent and add it's children
          table.push(<tr className='rowsLabel'>{children}</tr>)
        }
        return table
}

function recTime_today(props, i){
    var endDate = new Date(props[i].endDate)
    console.log(endDate+'endDate')
    var todaysDate = new Date() 
    console.log(todaysDate+'todaysDate')
    var difference_In_Time = endDate.getTime() - todaysDate.getTime()
    difference_In_Time = difference_In_Time/(1000*3600*24)
    console.log(difference_In_Time+'difference_In_Time')
    return  stringTime(difference_In_Time)
}

function recTime(props){ //Shows the recommended time of h and min for todays studies.
  var recTime = 0;
  var courseTime = 0;
  var difference_In_Time = 0;
  var difference_In_Days = 0; 

  for(var i = 0; i < props.length; i++){

    var startDate = new Date(props[i].startDate)
    var endDate = new Date(props[i].endDate)
    var todaysDate = new Date()

    difference_In_Time = endDate.getTime() - todaysDate.getTime();
    console.log(difference_In_Time)
    difference_In_Days = difference_In_Time / (1000 * 3600 * 24); 
    console.log(difference_In_Days)
    courseTime = ((props[i].value)-(props[i].addedTime));

    recTime = recTime + (courseTime/difference_In_Days);
  }

  return stringTime(recTime);
}

function stringTime(value){
console.log(value+"Invalue")
 /* Data js. const date = new Date(value*60*1000);
  console.log(date.getHours()+"getHours")
  console.log(value+"Value")

  var min = value-(date.getHours()*60);
  console.log(min+"Min")

  var text = date.getHours()+"h and";*/

  var hours= Math.floor(value/60);
  console.log(hours+"Hours")
  var minutes = (value % 60);
  console.log(minutes+"min")
  
  if(minutes === 0){
    return hours+'h';
  }
  if(hours === 0){
    return Math.floor(minutes)+"min"
  }

  return hours+'h '+ Math.floor(minutes)+'min';
}

//Vår självaste sida
function DonutSite(props){
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
          <div className="App-header">
          <h1 className="title">HELP<br/></h1>
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
    console.log("aahahahaah tönt");
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
 //End of button functions


    return (
      <div className="App">
        {/*<div>
          <button onClick={changeData}>Transform</button>
        </div>*/}
        <div className="App-header">
          <h1>APPNAME</h1>
          <h3>To achive your goal, study these hours</h3>
        </div>
        {/*Question Button*/}
        <div className="QuestionButton" onClick={handleClickQuestion}>
           <p className="question">?</p>

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
        <div className="reportButton" style={{width: buttonWidth}}>{reportTime()}</div>
        <div className="addButton" style={{width: buttonWidth}}>{addActivity()}</div>
        <div className="deleteButton" style={{width: buttonWidth}}>{deleteActivity()}</div>
        </div>
        {/*Question List*/}
      <div className="questionID" style={{width: questionWidth}}>
        {questionText()}
      </div>
       

        <div className="donut">
          <div className="recTime">
          <p className="recTimeText">Study</p>
            {recTime(props)}
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
          <table >
            {createTable(props)}
          </table>
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