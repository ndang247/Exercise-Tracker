import React from 'react';
// react router allows matching a specific route to a specific component for that page
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import the component from a separated file
import Navbar from "./components/navbar";
import ExercisesList from "./components/excercises-list";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";



// react will render the component based on the path/route specified
function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar/>
        <br/>
        <Route path='/' component={ExercisesList}/>
        <Route path='/edit/:id' component={EditExercise}/>
        <Route path='/create' component={CreateExercise}/>
        <Route path='/user' component={CreateUser}/>
      </div>
    </Router> 
  );
}

export default App;
