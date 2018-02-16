import '../styles/index.css';
import React, { Component } from 'react';
import axios from 'axios';
import Button from '../Button';
const url = 'http://localhost:5000';

class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            success: true,
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

    handleFocus = (e) => {
        let id = e.target.id;
        this.setState({ activeField: id });
    }

    handleSubmit = () => {
        axios.post(`${url}/login`,
            {
                email: this.state.email,
                password: this.state.password
            }
        )
            .then(res => {
                if (!res.data.token) {
                    this.setState({ success: false });
                    setTimeout(() => {
                        this.setState({ success: true })
                    }, 3000);
                    return;
                }
                this.setState({ jwt: res.data.token });
            })
            .catch(err => {
                console.log('There was an error registering', err.message)
            })
    }

    render() {
        return (
            <div className='vertContainer auth'>
                <div className='inputHeader'>Email</div>
                <input id='email' type='email' className={this.state.activeField === 'email' ? 'authInput' : 'authInput--active'} onChange={this.handleText} onFocus={this.handleFocus} />
                <div className='inputHeader'>Password</div>
                <input id='password' type='password' className={this.state.activeField === 'password' ? 'authInput' : 'authInput--active'} onChange={this.handleText} onFocus={this.handleFocus} />
                <div className={this.state.sucess ? 'inputHeader' : 'inputHeader inputHeader--fail'}>
                    {this.state.success ? '' : 'Sign In Error: Please try again.'}
                </div>
                <div className='formDivider'></div>
                <div className='buttonsRow'>
                    <Button title={'Sign In'} onClick={this.handleSubmit} />
                </div>
            </div>
        );
    }
}

export default SignIn;