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
    console.log(d);
    console.log(e);


    let g = (Number(d)*60) + Number(e);
    console.log(g);
    //let g = String(0); //reptime
    //let f = String(TotTime);

    //const Course = {repTime: g };
     
    //addtoList(Course);
   // console.log(Course);

   var A = loadData();
   console.log("Snart mat");
   console.log(A);
   console.log("Pizza");
  
   A[0].repTime = g;
   
   console.log(A);

  }



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
//redirect === false && 

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

  const [name, setCoursName] = useState({name: ''});
  const [startDate, setStartDate] = useState({startDate: 0});
  const [endDate, setEndDate] = useState({endDate: 0});
  const [hours, setHours] = useState(0);
  const [min, setMin] = useState(0);


  function changeInput(event){
    /*
    if(event.target.id == "name"){
        setCoursName(event.target.value);
        console.log("name in event");
      }
    else if(event.target.id == "startDate"){
      setStartDate(event.target.value);
      console.log("startDate in event");
    }
    else if(event.target.id == "endDate"){
      console.log("endDate in event");
    setEndDate(event.target.value);
    }
    else if(event.target.id == "hours"){
      console.log("Hours in event");
      setHours(event.target.value);
    }*/

      if(event.target.id == "hours"){
        setHours(event.target.value);
        console.log("Hours in event");
      }
    else{
      console.log("min in event");
        setMin(event.target.value);
    }
  } 

  return (

    <div className="center">
      <div className="appHeader">
        <h1>Report Time</h1>  
        </div>
         

        {/*wrapper */}
        <div className ="wrapperMain">

          <div>
          <p className ="reportTimeText"> Activity </p>
              <div className ="border" id ="activitySetTime">
              </div>
          </div>

          <p className ="reportTimeText" id="TimeStudied">Time studied</p>
          

          <div className ="border">

            <div className="wrapperAddTime" id="centerDiv">

              {/*textfält */}
               <input className="timeBox" id="hours" type="text" placeholder="hh" onChange={changeInput}/>
               <p className="timeIndicator" id="hh">h</p>
               <input className="timeBox" id="min" type="text" placeholder="mm" onChange={changeInput}/>
               <p className="timeIndicator" id="mm" >m</p>
            </div>


          </div>

          </div>

          <button onClick={() => {props.fixObjectEtikett(hours,min)}} className="reportButtonText">
              <p className = "buttonText">Report Time</p>
          </button>

      </div>
    
  );
}

export default ReportTime;//ska det vara parent eller app här?