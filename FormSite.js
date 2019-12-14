import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom";
//import Child from "./Child.js"


//vårt nästa sak är att vi vill försöka skicka vårt course till vårt child så att dem får en props
function Parent(){
  const [localData, setLocalData] = useState(loadData());
  const [redirect, setRedirect] = useState(false);


  function saveData(a){
    window.localStorage.setItem("data", JSON.stringify(a));
    setRedirect(true);
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

  function setData(data){
    setLocalData(data);
    saveData(data);
  }


  function colour(){
    var props = loadData();
    let arrayFromStorage = JSON.parse(localStorage.getItem("data"));
    var colorCounter = props.length;
    var mod = colorCounter % 5;
    let colour1 = "white";
    
    if (mod === 0){
      colour1 = "#f92672"; //rosa
    }
     else if (mod === 1){
      colour1 = "#a6e22e"; //grön #33c474
    }
     else if (mod === 2){
       colour1 = "#66d9ef" //blå #4ac3ff
    }
     else if (mod === 3){
       colour1 = "#ae81ff"; //lila #ca45ff
    }
     else if (mod === 4){
      colour1 = "#fd971f"; //orange
    }
    else
      colour1="yellow";

    colorCounter= colorCounter+1;

    return colour1;
  }

  function fixObject (a, b, c, d, e) {
    if (a === ""){
      a = "Unnamed"
    }
    if(b == ""){
      b = "12/11/2019"
    }
    if(c == ""){
      c = "12/24/2019"
    }
    if(d == 0){
      d = 10;
    }
    if(e == 0){
      e = 10;
    }

    let TotTime = (Number(d)*60) + Number(e);
    let g = String(); //reptime
    let f = String(TotTime);

    const Course = {id: a, startDate: b, endDate: c, totTime: f, repTime: g, repTodayTime: "0", color: colour()};
     
    addtoList(Course);
  }

  function addtoList(courseToAdd){
    localData.push(courseToAdd);
    setData(localData);
  }

  return(
    <div>
      <App fixObjectEtikett={fixObject} />
    </div>
  );
}



//App är form
function App(props) { // props eller inte props??

  /*QuestionButtonandList*/
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
   /*QuestionButtonandList End*/

  const [name, setCoursName] = useState('');
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);


  function changeInput(event){
    if(event.target.id === "name"){
        setCoursName(event.target.value);
      }
    else if(event.target.id == "startDate"){
      setStartDate(event.target.value);
    }
    else if(event.target.id == "endDate"){
    setEndDate(event.target.value);
    }
    else if(event.target.id == "hours"){
      setHours(event.target.value);
    }
    else{
        setMin(event.target.value);
    }
  } 
    
	/*Main render for FormSite*/	
  return (
    <div className="center">
      <div className="appHeader head">
        <Link to="/">
          <div className="fitText">
            <h1 className="titleDescrip">StudyUp</h1>
          </div> 
        </Link>
        <p className="h3">Add course details</p>
      </div>

      {/*Question Button*/}
      <div className="questionButton smalCirkel" onClick={handleClickQuestion}>
       <p className="question removeMargin">?</p>
      </div>
      <div className="mainBody">

      {/*Question List*/}
      <div className="questionID" style={{width: questionWidth}}>
      {questionText()}
      </div>
      <div className="wrapperOutline fitText">
        <div className="wrapperAddName">
          <p className="addActivityText" id="activityName">Course name</p>
          <input className="textBox" id="name" type="text" placeholder="Name" onChange={changeInput}/>
        </div>
        <div className="wrapperDate">
          <div className="wrapperStartDate"> 
          <div className="dateText">
            <p className="addActivityText" id="dateText">Start Date:</p> 
          </div>
          <input className="dateBox" id="startDate" type="text" placeholder="mm/dd/yyyy" onChange={changeInput}/>
          </div>
          <div className="wrapperEndDate">
            <div className="dateText">
              <p className="addActivityText" id="dateText">End Date:</p>
            </div>
            <input className="dateBox" id="endDate" type="text" placeholder="mm/dd/yyyy" onChange={changeInput}/>
          </div>
        </div>
        <div className="wrapperAddTime">
          <p className="addActivityTime">Set time:</p>
          <div className="time">
            <input className="timeBox"  type="text" id="hours" placeholder="h" onChange={changeInput}/>
            <p className="timeIndicator">h</p>
            <input className="timeBox"  type="text" id="min" placeholder="m" onChange={changeInput}/>
            <p className="timeIndicator">m</p>
          </div>
        </div> 
      </div>
      <div className="addActivityButton fitText">
        <Link to="/">
          <button onClick={() => props.fixObjectEtikett(name,startDate,endDate,hours,min)} className="greenButton center" id="formSaveButton">
            <p className="buttonText pBlack">Save</p>
          </button>
        </Link>
        <Link to="/">
          <button className="redButton" id="formCancelButton">
            <p className="buttonText pBlack">Cancel</p>
          </button>
        </Link>
      </div>

      {/*Footer*/}
      <div className="App-bottom">
        <p className="dots">Bottom Header</p>
      </div>
      </div>
    </div>
  );
}

export default Parent;//ska det vara parent eller app här?