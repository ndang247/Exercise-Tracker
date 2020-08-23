import React, { Component } from 'react';
// use axios to send http request to the back-end
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // the property of the state that correspond to the field of the database
            username: ''
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    // this function is use when user submit a form
    onSubmit(e) {
        // this will prevent the default HTML form submit behaviour from taking place
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        console.log(user);

        // send user object to our back-end to add to database
        // make sure the back-end is running
        axios.post('http://localhost:8080/users/add/', user)
        .then(res => console.log(res.data));

        // reset the value after a user has been added
        this.setState({
            username: ''
        });
    }

    render() {
        return (
            <div>
                <h3>Create a new user</h3>
                <form onSubmit={this.onSubmit}>
                    <div className='form-group'>
                        <label>Username: </label>
                        <input type='text' required className='form-control'
                        value={this.state.username} onChange={this.onChangeUsername}/>                    
                    </div>
                    <div className='form-group'>
                        <input type='submit' value='Create a user' className='btn btn-primary'/>                 
                    </div>
                </form>
            </div>
        );
    }
}