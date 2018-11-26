'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import * as Database from 'components/services/db';

import { Elements } from 'libs/elements.lib';

class HeroInsert extends Component {
    state = {
        name: '',
        color: ''
    }
    subs = []

    addHero = async (event) => {
        event.preventDefault()
        const {name, color} = this.state;
        const db = await Database.get();
        db.heroes.insert({name, color});
        this.setState({name: '', color: ''});
    }
    handleNameChange = (event) => {
        this.setState({name: event.target.value});
    }
    handleColorChange = (event) => {
        this.setState({color: event.target.value});
    }

    render() {
        return (
            <Elements.View id="insert-box" className="box">
                <Elements.Head_3>Add Hero</Elements.Head_3>
                <Elements.Form onSubmit={this.addHero}>
                    <Elements.Control type="text" placeholder="Name" value={this.state.name} onChange={this.handleNameChange} />
                    <Elements.Control type="text" placeholder="Color" value={this.state.color} onChange={this.handleColorChange}/>
                    <Elements.Button type="submit">Insert a Hero</Elements.Button>
                </Elements.Form>
            </Elements.View>
        );
    }
}

export default HeroInsert;