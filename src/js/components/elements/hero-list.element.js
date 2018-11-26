'use strict';

/**
 * Module dependencies
 */
import React, { Component, Nodev } from 'react';
import * as Database from 'components/services/db';

import { Elements } from 'libs/elements.lib';

class HeroList extends Component {
    state = {
        heroes: [],
        loading: true
    };
    subs = [];

    async componentDidMount() {
        const db = await Database.get();

        const sub = db.heroes.find().sort({name: 1}).$.subscribe(heroes => {
            if (!heroes) {
                return;
            }
            console.log('reload heroes-list ');
            console.dir(heroes);
            this.setState({heroes, loading: false});
        });
        this.subs.push(sub);
    }

    componentWillUnmount() {
        this.subs.forEach(sub => sub.unsubscribe());
    }

    deleteHero = async (hero) => {
        console.log('delete hero:');
        console.dir(hero);
    }

    editHero = async (hero) => {
        console.log('edit hero:');
        console.dir(hero);
    }

    renderActions = (): Node => {
        // TODO
        // return (
        //     <Elements.View className="actions">
        //         <i className="fa fa-pencil-square-o" aria-hidden="true" onClick={() => this.editHero(hero)}></i>
        //         <i className="fa fa-trash-o" aria-hidden="true" onClick={() => this.deleteHero(hero)}></i>
        //     </Elements.View>
        // )
        return null
    }

    render(): Node {
        const { heroes, loading } = this.state
        return (
            <Elements.View id="list-box" className="box">
                <Elements.Head_3>Heroes</Elements.Head_3>
                <Elements.List id="heroes-list">
                    {loading && <Elements.Text>Loading...</Elements.Text>}
                    {!loading && heroes.length === 0 && <Elements.Text>No heroes</Elements.Text>}
                    {heroes.map(hero => {
                        return (
                            <Elements.ListItem key={hero.name}>
                                <Elements.View className="color-box" style={{
                                    background: hero.color
                                }}></Elements.View>
                                <Elements.Text className="name">
                                    {hero.name}
                                </Elements.Text>
                                {this.renderActions()}
                            </Elements.ListItem>
                        );
                    })}
                </Elements.List>
            </Elements.View>
        );
    }
}

export default HeroList;