import React, { Component } from 'react';

class Button extends Component {
    render() {
		const self = this;
        return (
            <div onClick={this.props.onPress} className="button">{ this.props.label }</div>
        )
    }
}

export default Button;