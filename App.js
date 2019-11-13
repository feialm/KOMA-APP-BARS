import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Container, Button, Link, lightColors, darkColors} from 'react-floating-action-button'



// fake array to test stuff
/*const activity = new Array('TNA003', '100', '50');
constructor activityarray(string a, int b int c){
  string name = a;
  int total = b;
  int part = c;
}*/


function timeCalc(total, part){
  var percentage = part/total;
  return percentage;
}



function ActivityInfo(){
return(
  <div className="WrapperActivity">

{/*Här ska vi försöka skriva ut arrayen med dess namn och tid */}
          <p className="ActivityName">activity[0]</p>
          <div className="ActivityDetails">
            <p className="ActivityPercentage">percent</p>
            <p className="ActivityMoreDetails">More details</p>
            </div>

          <div className="ActivityBar">
          </div>
          <div className="ActivityProgress">
          </div>
        </div>
        )
}



function App() {
  return (
    <div className="App">
      <div className="App-header">

        <h1>APPNAME</h1>
 <div className="QuestionButton">
    <p className="question">?</p>
</div>
      </div>

{/*<Activity name='tnm040' progress=´95%´ />*/}
{/*new array activities = ['Swe', 'Den', 'Fin'];*/}

{/*activities.*/}

 
      <div className="MainBody">
        {/*här ska vi köra ActivityInfo, för att skriva ut kursinfo*/}
        <ActivityInfo />
      </div>

  <div className="MenuButton">
  <div className="MenuIcon">
   <div className="menu"></div>
   <div className="menu"></div>
   <div className="menu"></div>
   </div>
</div>


      <div className="App-bottom">
      <p className="Dots">Bottom Header</p>
      </div>


    </div>
  );
}

export default App;
