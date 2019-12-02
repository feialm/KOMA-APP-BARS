import React from 'react';
import './App.css';
import { useState } from 'react';


// fake array to test stuff
var a1 = {name:"TNA001", totTime:"100", repTime:"70", trash:"du"};
var a2 = {name:"TNG032", totTime:"100", repTime:"30", trol:"react"};
var a3 = {name:"TNG033", totTime:"100", repTime:"30"};
var a4 = {name:"TNA004", totTime:"100", repTime:"70"};
var a5 = {name:"TNG035", totTime:"100", repTime:"66"};
var a6 = {name:"TNG036", totTime:"100", repTime:"30"};
var a7 = {name:"HEJjosefin", totTime:"100", repTime:"100"};
var a8 = {name:"AWESOMENESS of Sofie", totTime:"100", repTime:"100"};

var activityArray = [a1, a2, a3, a4, a5, a6, a7, a8]; //aktiviteter utan färger

var activityColor = []; //aktiviteter med färger 

let i = 0; //färg

function incrementID(){  //färg
  i++;
}

function colour(i){  //färg 
 
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

function timeCalc(total, part){       //beräknar barProgress samt procent
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
  console.log('hej du klickade på kursen');
}


/*Funktion som ger innehåll genom att skicka in array av objekt*/
function ActivityInfo(props) {

  const a = props.a;
  let barProgress = timeCalc(a.totTime, a.repTime)+"%";
  var same = colour(i);

  var oneActivity = [a];

  oneActivity.push(same);
  activityColor.push(oneActivity);

  console.log(a);

  return(
    <div className="WrapperActivity" onClick={handleClickActivity}>  

      {/*Här ska vi försöka skriva ut arrayen med dess namn och tid */}
      <p className="ActivityName">{a.name}</p>
      <div className="ActivityDetails">      {/* info i aktivitets-rutan */}
          <p className="ActivityPercentage">{timeCalc(a.totTime, a.repTime)}% done</p>
          <p className="ActivityMoreDetails">More details</p>
      </div>
      
      <div className="ActivityBar" style={{backgroundColor: same, opacity: 0.3}}></div>
      <div className="ActivityProgress" style={{width: barProgress, backgroundColor: same, opacity: 0.8}}></div>
    
    </div>
  )
}


/*renderar sidelementen typ*/
function App(props) {
  i = 0; /* Här så nollställer vi i så kurserna kommer i rätt ordning och färg ????? :)     */

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
    console.log('hej du klickade på frågetecknet');
  }

  function questionText(){
    if(hideQuestion === false){
      return(
        <div className="questionWrapper">
          <div className="App-header">
          <h1 className="help">HELP<br/></h1>
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
    <div className="App">
 
      {/*Header*/}
      <div className="App-header">
        <h1>APPNAME</h1>
        <p className="description">My Activities</p>
      </div>

      {/*Question Button*/}
      <div className="QuestionButton" onClick={handleClickQuestion}>
         <p className="question" style={{opacity: questionOpacity}}>?</p>
         <p className="closeQuestion" style={{opacity: closeQuestionOpacity}}>x</p>
      </div>

      {/*Main body*/}
      <div className="MainBody">
        {renderActivities()}  {/*här körs ActivityInfo för att skriva ut kursinfo*/}
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
      <div className="reportButton" style={{width: buttonWidth}}>{reportTime()}</div>
      <div className="addButton" style={{width: buttonWidth}}>{addActivity()}</div>
      <div className="deleteButton" style={{width: buttonWidth}}>{deleteActivity()}</div>
      </div>
      {/*Question List*/}
      <div className="questionID" style={{width: questionWidth}}>
        {questionText()}
      </div>

    </div>
  );
}

export default App;
