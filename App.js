import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Container, Button, Link, lightColors, darkColors} from 'react-floating-action-button'



// fake array to test stuff
const activity = new Array('TNA003', '100', '50');


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
      </div>
{/*<Activity name='tnm040' progress=´95%´ />*/}
{/*new array activities = ['Swe', 'Den', 'Fin'];*/}

{/*activities.*/}

 <Container className="QuestionButton">
    <Button 
     styles={{backgroundColor: darkColors.lighterRed, color: lightColors.black, height: 40, width: 40}}
     />
</Container>
      <div className="MainBody">
        {/*här ska vi köra ActivityInfo, för att skriva ut kursinfo*/}
        <ActivityInfo />
      </div>

  <Container className="MenuButton">
    <Button 
     styles={{backgroundColor: darkColors.lighterRed, color: lightColors.white}}
     />
</Container>

      <div className="App-bottom">
      <p className="Dots">Bottom Header</p>
      </div>


    </div>
  );
}

export default App;
