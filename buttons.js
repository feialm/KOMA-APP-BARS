import React, { useState, useEffect } from "react";

 
 /*meny lista typ*/
  const [menuWidth, changeMenuWidth] = useState(0);     
  const [buttonWidth, changeButtonWidth] = useState(0);
  const [hideMenu, triggerHideMenu] = useState(true);
  const [hideQuestion, triggerHideQuestion] = useState(true); 
  const [questionWidth, changeQuestionWidth] = useState(0); 
  const [questionOpacity, changeQuestionOpacity] = useState("100%"); 
  const [closeQuestionOpacity, changeCloseQuestionOpacity] = useState("0%");

const Buttons = {
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

}
export default Button 

 