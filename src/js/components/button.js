import React, { Component } from 'react';

class Button extends Component {
    render() {
        return (
            <div onClick={this.props.onPress} className="button">{ this.props.label }</div>
        )
    }
}

export default Button;