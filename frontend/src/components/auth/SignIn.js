import '../styles/index.css';
import React, { Component } from 'react';
import axios from 'axios';
import Button from '../Button';

class SignIn extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentDidMount() {

    }
    handleSubmit = () => {

    }

    render() {
        return (
            <div className='vertContainer auth'>
                <div className='inputHeader'>Email</div>
                <input type='email' className='authInput' />
                <div className='inputHeader'>Password</div>
                <input type='password' className='authInput' />
                <div className='inputHeader inputHeader'></div>
                <div className='buttonsRow'>
                    <Button title={'Sign In'} onClick={this.handleSubmit} />
                </div>
            </div>
        );
    }
}

export default SignIn;