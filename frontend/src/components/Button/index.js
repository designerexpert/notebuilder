import '../styles/index.css';
import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false,
        }
    }
    componentWillMount() {
        // width: (`${this.props.title.length - 2}em`) Styles button to have a width based on the text in it.
        this.setState({ onClick: this.props.onClick, title: this.props.title, width: (`${this.props.title.length - 2.5}em`) });
    }

    handleClicked = () => {
        this.setState({ clicked: true });
        setTimeout(() => { this.setState({ clicked: false }); this.state.onClick(); }, 150);

    }

    render() {
        return (
            <div className={this.state.clicked ? 'button--clicked' : 'button'} style={{ width: this.state.width }} onClick={this.handleClicked}>
                <div>
                    {this.state.title}
                </div>
            </ div>
        );
    }
}

export default Button;