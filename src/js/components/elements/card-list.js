'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames/bind';
import Card from 'appRoot/js/components/elements/card';

type Props = {
    dataClass: object,
    items: array
};

export default class CardList extends Component<Props> {
    displayName: string = 'CardList';

    static defaultProps: Props = {
		className: 'card-list',
        dataClass: {},
        items: []
    };

	render(): Node {
        const { className, dataClass, items, ...rest } = this.props;
        const { cardClass, cardFrontClass, cardBackClass, cardInnerClass, ...restClass } = dataClass;
        const elements = items.map(item => {
            restClass.cardFrontClass = classes(cardFrontClass, item.cardFrontClass);
			restClass.cardBackClass = classes(cardBackClass, item.cardBackClass);
            restClass.cardInnerClass = classes(cardInnerClass, item.cardInnerClass);
            return (
                <Card item={item} key={item.id} className=classes(cardClass, item.className) dataClass={restClass}>
                    {item.data}
                </Card>
            );
        }.bind(this));
		return (
            <div className={className} {...rest}>{elements}</div>
        );
	}
};