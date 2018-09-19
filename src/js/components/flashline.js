import React, { Component } from 'react';

class Flashline extends Component {
    render() {
		const self = this;
        return (
            <div className="flashline">{ this.props.message }</div>
        )
    }
}

export default Flashline;