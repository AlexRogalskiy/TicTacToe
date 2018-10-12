"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames/bind';
import BasicCardItem from 'appRoot/js/components/elements/basicCardItem';

let Types = React.PropTypes;

export default class BasicCardItemList extends React.Component {
    displayName: 'BasicCardItemList'
	static propTypes = {
        dataClass: Types.object,
        items: Types.array,
        item: Types.object
    }
    static defaultProps = {
        dataClass: {},
        className: 'deck-component',
        items: [],
        item: {}
    }
    constructor(props) {
        super(props);
        this.state = {
            dataClass: props.dataClass,
            items: props.items,
            item: props.item
        };
    }
	render() {
        const { dataClass, items, item, ...rest } = this.props;
        const { cardClass, cardFrontClass, cardBackClass, cardInnerClass, ...restClass } = dataClass;
        const elements = items.map(function(item) {
            restClass.cardFrontClass = item.cardFrontClass ? item.cardFrontClass : cardFrontClass;
            restClass.cardBackClass = item.cardBackClass ? item.cardBackClass : cardBackClass;
            restClass.cardInnerClass = item.cardInnerClass ? item.cardInnerClass : cardInnerClass;
            return (
                <BasicCardItem item={item} key={item.id} className={item.className ? item.className : cardClass} dataClass={restClass}>
                    {item.data}
                </BasicCardItem>
            );
        }.bind(this));
		return (
            <div {...rest}>{elements}</div>
        );
	}
};