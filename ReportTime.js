import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';
import { useState } from 'react';
import React, { Component } from 'react';


function ReportTime(){
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

  function fixObject (d, e) {

    let g = (Number(d)*60) + Number(e);

    var A = loadData();

    if(arrIndex === null){
      console.log("tyvärr ingen vald kurs");
      selectBool = false;
     // noSelect();
      console.log(selectBool);
    }
    else{
      if(d === 0 && e === 0){
        console.log("tyvärr ingen angiven tid");
        selectBool = false;
        //noSelect();
        console.log(selectBool);
        //disabled = 0;
      }
      else{
        console.log(d);
        console.log("ahaa");
        A[arrIndex].repTime = Number(A[arrIndex].repTime) + g;
        selectBool = true;
        saveData(A);
        //disabled = "blue";
        arrIndex = null;
      }
    }
  }


// addtolist kan vara en hellt onödig här 
  function addtoList(courseToAdd){
    localData.push(courseToAdd);
    setData(localData);
  }


// main component of app is always one page (depending on url path) + Menu below


  return(
    <div>
      {
      <App fixObjectEtikett={fixObject} />
      }
    </div>
  );
}

let arrIndex = null;
let selectBool = true;
//let disabled = "grey";

function courseIndex(indexOfArray){
  arrIndex = indexOfArray;
}


/*
function noSelect(){
  disabled = "red";   
}*/

//App är form
function App(props) { // props eller inte props??

  const [localData, setLocalData] = useState(loadData());
  const [name, setCoursName] = useState('');
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);
  const [dropTrigg, setDropTrigg] = useState(false);

   function loadData(){
    try {
      const storage = JSON.parse(window.localStorage.getItem("data"));
      return storage || [];
    } 
    catch (e) {
      return [];
    }
  }


  let arr = localData;


  function changeInput(event){

    if(event.target.id == "hours"){
      setHours(event.target.value);
    }
    else{
        setMin(event.target.value);
    }
  } 



   function dropMenu(){
    console.log("Dropdown open");
    //console.log(localData);
    //callDropMenu();

    if(dropTrigg){
        setDropTrigg(false);
    }
    else{
      setDropTrigg(true);
    }
    RenderMenu(localData);
  }

  function RenderMenu(arr){
    return(
      arr.map((c, i) => (<MenuContent key={c.id} arrData={c} index={i} />))
    );
  }

function MenuContent(arrData){
  //console.log(arrData);
  //console.log(arrData.index);  //skicka detta till funktionen
   let menuList = arrData.arrData;
   let arrayIndex = arrData.index;
   var menuListContent = [];
   return(
    <div style={{backgroundColor: menuList.color, width: "100%", height: "100px", display: "inline-block", position: "flex", zIndex: "300"}}>
      <button onClick={() => selectedCourse(arrayIndex)}>{menuList.id}</button>
    </div>

    );
}


function selectedCourse(sentIndex){
  //console.log("hahahahahhej");
  console.log("FUNKAR DETA DÅÅRÅÅÅÅÅ");
  console.log(sentIndex);

  courseIndex(sentIndex);


}

/*
function redirectIf(){
  if(selectBool === true){
    return(
       <Link to="/BarSite.js"/>
      );
  }
  else{
    console.log("no");

  }
}*/


  return (

    <div className="center">
      <div className="appHeader">
        <h1>Report Time</h1>  
       
        </div>
         
         {/*Home Button*/}
      <Link to="/BarSite.js">
      <div className="smalCirkel home">
      <i className="fa fa-home fa-2x"></i>
       {/*<img src="https://img.icons8.com/windows/32/000000/home-page.png" alt="Home pic" width="32" height="32" className="question removeMargin"/>*/}
      </div>
      </Link>


        {/*wrapper */}
        <div className ="wrapperMain">

          <div>
            <p className ="reportTimeText"> Activity </p>
            <div className ="border" id ="activitySetTime" onClick={dropMenu}>
              <p className="arrow">&#9660;</p>
             
            </div>
             {
                dropTrigg ? (RenderMenu(arr)) : (null)
              }
          </div>
          <p className ="reportTimeText" id="TimeStudied">Time studied</p>
          <div className ="border">
            <div className="wrapperAddTime" id="centerDiv">

              {/*textfält */}
               <input className="timeBox" id="hours" type="text" placeholder="hh" onChange={changeInput}/>
               <p className="timeIndicator" id="hh">h</p>
               <input className="timeBox" id="minutes" type="text" placeholder="mm" onChange={changeInput}/>
               <p className="timeIndicator" id="mm" >m</p>
            </div>


          </div>

          </div>

        
        
         <Link to="/BarSite.js">
          <button onClick={() => {props.fixObjectEtikett(hours,min);}} className="reportButtonText" >
              <p className = "buttonText">Report</p>
          </button>
      </Link>
      

      </div>
    
  );

}

export default ReportTime;//ska det vara parent eller app här?