import React, { Component } from 'react';

import Cell from './cell';
import Button from './button';
import Flashline from './flashline';

class Board extends Component {
    render() {
        const self = this;
        return (
            <div>
                <Flashline message={this.props.message} />
                <div className="grid">
                    {
                        this.props.cells.map((value, cell) => (
                            <Cell key={cell} state={value} onPress={(evt) => {
                                self.props.onSetCell(cell, this.props.cells, this.props.player)
                            }}/>
                        ))
                    }
                </div>
                <div className="panel">
                    <Button label="Reset" onPress={(evt) => {
                        self.props.onReset()
                    }} />
                </div>
            </div>
        )
    }
}

export default Board;