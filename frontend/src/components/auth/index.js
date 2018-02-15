import '../styles/index.css';
import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Button from '../Button';

class Auth extends Component {
    constructor() {
        super();
        this.state = {
            JWT: '',
            welcome: ['Please Sign Up', 'Please Sign In'],
            signIn: false,
        }
    }
    componentDidMount() {

    }
    handleSwitch = () => {
        let oldSign = this.state.signIn;
        this.setState({ signIn: !oldSign });
    }


    render() {
        if (this.state.signIn) {
            return (
                <div className='vertContainer'>
                    <div className='authHeader'>{this.state.welcome[1]}</div>
                    <SignIn />
                    <div className='vertContainer'>
                        <div className='authNotification'>Don't have an account?</div>
                        <div className='buttonsRow'>
                            <Button onClick={this.handleSwitch} title={'Click Here'} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='vertContainer'>
                    <div className='authHeader'>{this.state.welcome[0]}</div>
                    <SignUp />
                    <div className='vertContainer'>
                        <div className='authNotification'>Already have an account?</div>
                        <div className='buttonsRow'>
                            <Button onClick={this.handleSwitch} title={'Click Here'} />
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Auth;