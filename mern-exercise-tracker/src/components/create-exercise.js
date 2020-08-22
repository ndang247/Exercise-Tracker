import React, { Component } from 'react';
// import the date picker
// the date picker will pop up a calendar for the user to pick date
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// this class is going to let user add exercises into the database
export default class CreateExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // the property of the state that correspond to the field of the database
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            // this will be shown in a dropdown menu all the users in the database
            users: []
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration= this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    // this lifecycle method will be call before render
    // this method will add users into the dropdown menu before it is render
    componentDidMount() {
        this.setState({
            users: ['test user'],
            username: 'test user'
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    // this function is use when user submit a form

    onSubmit(e) {
        // this will prevent the default HTML form submit behaviour from taking place
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        // after user submit take the user back to homepage
        window.location = '/';
    }


    render() {
        return (
            <div>
                <h3>Create a new exercise log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <select ref='userInput' required className='form-control' 
                        value={this.state.username} onChange={this.onChangeUsername}>
                            {
                                // show each user in the users array
                                this.state.users.map(function(user) {
                                    return <option key={user} value={user}> {user} </option>;
                                })
                            }
                        </select>
                    </div>

                    <div className='form-group'>
                        <label>Description: </label>
                        <input type='text' required className='form-control'
                        value={this.state.description} onChange={this.onChangeDescription}/>
                    </div>
                    <div className='form-group'>
                        <label>Duration (in minutes): </label>
                        <input type='text' className='form-control'
                        value={this.state.duration} onChange={this.onChangeDuration}/>
                    </div>
                    <div className='form-group'>
                        <label>Date: </label>
                        <div>
                            <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                        </div>
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Create an exercise log' className='btn btn-primary'/>
                    </div>
                </form>
            </div>
        );
    }
}