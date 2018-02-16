import '../styles/index.css';
import React, { Component } from 'react';
import axios from 'axios';
import Button from '../Button';
const url = 'http://localhost:5000';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            password: null,
            password2: null,
            email: null,
            pwMatch: true,
            validEmail: true,
            activeField: null,
        }
    }
    componentDidMount() {

    }

    handleText = (e) => {
        this.setState({ [e.target.id]: e.target.value });
        //console.log(e.target.id, this.state[e.target.id])
    }

    handleEnter = (e) => {
        if (e.keyCode === 13) {
            this.handleSubmit();
        }
    }



    checkPasswords = () => {
        //console.log(this.state.password, '  ', this.state.password2)
        if (this.state.password === this.state.password2 && this.state.password !== null) {
            this.setState({ pwMatch: true });
            return true;
        } else {
            this.setState({ pwMatch: false });
            return false;
        }

    }
    handleFocus = (e) => {
        let id = e.target.id;
        this.setState({ activeField: id });
    }

    checkEmail = () => {
        let regVar = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regVar.test(this.state.email)) {
            this.setState({ validEmail: true });
            return true;
        } else {
            this.setState({ validEmail: false });
            return false;
        }
    }

    handleSubmit = () => {
        this.checkPasswords()
        this.checkEmail()
        if (this.state.pwMatch && this.state.validEmail) {
            axios.post(`${url}/register`,
                {
                    email: this.state.email,
                    password: this.state.password
                }
            )
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log('There was an error registering', err.message)
                })
        } else {
            this.setState({})
        }
        //console.log('submit was clicked')
        //console.log('After Click ', this.state.password, '  ', this.state.password2)
    }

    render() {
        return (
            <div className='vertContainer auth'>
                <div className={this.state.validEmail ? 'inputHeader' : 'inputHeader inputHeader--fail'}>
                    {this.state.validEmail ? 'Email' : '* The email provided is invalid'}
                </div>
                <input
                    id='email'
                    type='email'
                    className={this.state.activeField === 'email' ? 'authInput' : 'authInput--active'}
                    onChange={this.handleText}
                    onFocus={this.handleFocus} />
                <div className={this.state.pwMatch ? 'inputHeader' : 'inputHeader inputHeader--fail'}>
                    {this.state.pwMatch ? 'Password' : '* The Passwords do not Match'}
                </div>
                <input
                    id='password'
                    type='password'
                    className={this.state.activeField === 'password' ? 'authInput' : 'authInput--active'}
                    onChange={this.handleText}
                    onFocus={this.handleFocus} />
                <div className={this.state.pwMatch ? 'inputHeader' : 'inputHeader inputHeader--fail'}>
                    {this.state.pwMatch ? 'Verify Password' : '* The Passwords do not Match'}
                </div>
                <input
                    id='password2'
                    type='password'
                    className={this.state.activeField === 'password2' ? 'authInput' : 'authInput--active'}
                    onChange={this.handleText}
                    onKeyDown={this.handleText}
                    onFocus={this.handleFocus} />
                <div className='formDivider'></div>
                <div className='buttonsRow'>
                    <Button title={'Sign Up'} onClick={this.handleSubmit} />
                </div>
            </div>
        );
    }
}

export default SignUp;