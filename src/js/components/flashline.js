import React, { Component } from 'react';

class Flashline extends Component {
    render() {
        return (
            <div className="flashline">{ this.props.message }</div>
        )
    }
}

export default Flashline;