import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Exercise(props) {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0-10)}</td>
            <td>
                <Link to={'/edit/'+props.exercise._id}>Edit</Link> | <a href='#' onClick={ () => props.deleteExercise(props.exercise._id) }>Delete</a>
            </td>
        </tr>
    );
}

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exercises: []
        }
        this.deleteExercise = this.deleteExercise.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8080/exercises/')
        .then(response => {
            // set the response from the database to the array exercises
            this.setState( { exercises: response.data } ) // no need to use map since we want every property
        })
        .catch((err) => {
            console.log(err);
        })
    }

    deleteExercise(id) {
        axios.delete('http://localhost:8080/exercises/' + id)
        .then(response => console.log(response.data));
        // when an exercise have been deleted
        // the page need to be re-render by react
        // when a state changes react will re-render the page
        this.setState({
            // whenever the id in the exercises array does not equal to the id that is being deleted will be pass back to the array
            exercises: this.state.exercises.filter(exercise => exercise._id !== id)
        })
    }

    // this method will return the row of the table
    exerciseList() {
        // for every element in the array will return a component
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.exerciseList() }
                    </tbody>
                </table>
            </div>
        );
    }
}