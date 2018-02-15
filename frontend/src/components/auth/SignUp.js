import '../styles/index.css';
import React, { Component } from 'react';
import axios from 'axios';
import Button from '../Button';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            password: '',
            password2: '',
            email: '',
        }
    }
    componentDidMount() {

    }

    checkPasswords = () => {

    }

    handleSubmit = () => {
        console.log('submit was clicked')
    }

    render() {
        return (
            <div className='vertContainer auth'>
                <div className='inputHeader'>Email</div>
                <input type='email' className='authInput' />
                <div className='inputHeader'>Password</div>
                <input type='password' className='authInput' />
                <div className='inputHeader'>Verify Password</div>
                <input type='password' className='authInput' />
                <div className='inputHeader inputHeader'>Passwords Must Match</div>
                <div className='buttonsRow'>
                    <Button title={'Sign Up'} onClick={this.handleSubmit} />
                </div>
            </div>
        );
    }
}

export default SignUp;