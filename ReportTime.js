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

    // Här behöver vi veta vilken slot i arrayen som kursen som ska raporteras är
    /*
    A[0].repTime = Number(A[0].repTime) + g;

    saveData(A);
    */

  }


// addtolist kan vara en hellt onödig här 
  function addtoList(courseToAdd){
    localData.push(courseToAdd);
    setData(localData);
  }
/*
  function routerApp(){
    return(
      
      <Router>
        <div>
          <li>
            <Link to="/Child">Child</Link>
          </li>
        </div>
        <Switch>
          <Route path="/Child" component={Child} />
        </Switch>
      </Router>
    );
  }
*/



// main component of app is always one page (depending on url path) + Menu below


  return(
    <div>
      

      {
      <App fixObjectEtikett={fixObject} />
      }
     
      
    </div>
  );
}


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

    /*
    if(event.target.id === "name"){
        setCoursName(event.target.value);
      }
    else if(event.target.id == "startDate"){
      setStartDate(event.target.value);
    }
    else if(event.target.id == "endDate"){
    setEndDate(event.target.value);
    }

    */



    if(event.target.id == "hours"){
      setHours(event.target.value);
    }
    else{
        setMin(event.target.value);
    }
  } 



   function dropMenu(){
    console.log("funkar`?");
    console.log(localData);
    //callDropMenu();
if(dropTrigg){
    setDropTrigg(false);
}
  else{
    setDropTrigg(true);
  }
    console.log(dropTrigg);
    RenderMenu(localData);
  }

  function RenderMenu(arr){
  console.log("orkar inte");
  return(
    arr.map(c=> (<MenuContent key={c.id} arrData={c} />))
    );
  }

function MenuContent(arrData){
   let menuList = arrData.arrData;
   console.log("fjksadkf");
   return(
    <div style={{backgroundColor: menuList.color, width: "100%", height: "100px"}}>
      <p>{menuList.id}</p>
    </div>

    );
}



  return (

    <div className="center">
      <div className="appHeader">
        <h1>Report Time</h1>  
        </div>
         
         {/*Home Button*/}
      <Link to="/BarSite.js">
      <div className="smalCirkel home">
      <i class="fa fa-home fa-2x"></i>
       {/*<img src="https://img.icons8.com/windows/32/000000/home-page.png" alt="Home pic" width="32" height="32" className="question removeMargin"/>*/}
      </div>
      </Link>

        {/*wrapper */}
        <div className ="wrapperMain">

          <div>
          <p className ="reportTimeText"> Activity </p>
          <div className ="border" id ="activitySetTime" onClick={dropMenu}>
          <p class="arrow">&#9660;</p>
          {
            dropTrigg ? (RenderMenu(arr)) : (null)
          }
          </div>
          </div>

          <p className ="reportTimeText" id="TimeStudied">Time studied</p>
          

          <div className ="border">

            <div className="wrapperAddTime" id="centerDiv">

              {/*textfält */}
               <input className="timeBox" id="hh" type="text" placeholder="hh" onChange={changeInput}/>
               <p className="timeIndicator" id="hours">h</p>
               <input className="timeBox" id="mm" type="text" placeholder="mm" onChange={changeInput}/>
               <p className="timeIndicator" id="minutes" >m</p>
            </div>


          </div>

          </div>
           <Link to="/BarSite.js">
          <button onClick={() => {props.fixObjectEtikett(hours,min);}} className="reportButtonText">
              <p className = "buttonText">Report</p>
          </button>
         </Link>

      </div>
    
  );

}

export default ReportTime;//ska det vara parent eller app här?