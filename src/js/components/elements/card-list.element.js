'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames/bind';
import CardElement from 'components/elements/card.element';

/* @flow */
type ListItem = {
	id: string;
	className: string;
	cardFrontClass: string;
	cardBackClass: string;
	cardInnerClass: string;
	data: Object<any>;
};
type Props = {
    dataClass?: Object<any>;
};
type State = {
    items: Array<ListItem>;
};

export default class CardListElement extends Component<Props, State> {
    displayName: string = 'CardListElement';

	state: State = {
		items: []
	};
	
    static defaultProps: Props = {
		className: 'card-list',
        dataClass: {}
    };

	render(): Node {
        const { className, dataClass, ...rest } = this.props;
        const { cardClass, cardFrontClass, cardBackClass, cardInnerClass, ...restClass } = dataClass;
        const elements = this.state.items.map(item => {
            restClass.cardFrontClass = classes(cardFrontClass, item.cardFrontClass);
			restClass.cardBackClass = classes(cardBackClass, item.cardBackClass);
            restClass.cardInnerClass = classes(cardInnerClass, item.cardInnerClass);
            return (
                <CardElement item={item} key={item.id} className=classes(cardClass, item.className) dataClass={restClass}>
                    {item.data}
                </CardElement>
            );
        }.bind(this));
		return (
            <div className={className} {...rest}>{ elements }</div>
        );
	}
};