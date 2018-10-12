"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
import ClassNames from 'classnames/bind';

import BasicCardItemStyle from 'appRoot/css/components/elements/basicCardItem';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicCardItemStyle);

export default class BasicCardItem extends React.Component {
    displayName: 'BasicCardItem'
	static propTypes = {
        dataClass: Types.object,
        item: Types.object
    }
    static defaultProps = {
        dataClass: { cardFrontClass: 'front', cardBackClass: 'back', cardInnerClass: 'inner' },
        className: 'card-component',
        item: {}
    }
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            dataClass: props.dataClass,
            className: props.className,
            item: props.item
        };
    }
    onClick(e) {
        this.flip();
        if(this.props.onClick) {
            this.props.onClick(e);
        }
    }
    flip() {
        this.setState({flipped: !this.state.flipped});
    }
	render() {
        const { dataClass, item, onClick, ...rest } = this.props;
        const { cardFrontClass, cardBackClass, cardInnerClass, ...restClass } = dataClass;
        rest.className = Styles(rest.className, {
            flipped: this.state.flipped
        });
		return (
            <div onClick={this.onClick} {...rest}>
                <div className={cardFrontClass}>
                    <div className={cardInnerClass}>{rest.children}</div>
                </div>
                <div className={cardBackClass}>&nbsp;</div>
            </div>
        );
	}
};