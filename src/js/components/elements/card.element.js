'use strict"'

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
// import update     from 'react-addons-update';
//import ClassNames from 'classnames/bind';
//import BasicCardItemStyle from 'css/components/elements/basicCardItem';
import { Elements } from 'libs/elements.lib';
//let Styles = ClassNames.bind(BasicCardItemStyle);

/* @flow */
type Props = {
	 dataClass?: Object<any>;
	 onClick?: func;
	 children?: Node;
};
type State = {
	flipped: boolean;
};

export default class CardElement extends Component<Props, State> {
    displayName: string = 'CardElement';
	
	state: State = {
		flipped: false
	};

    static defaultProps: Props = {
        className: 'card',
		dataClass: { cardFrontClass: 'card-front', cardBackClass: 'card-back', cardInnerClass: 'card-inner' }
    };
	
    constructor(props: Props): void {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event: SyntheticEvent<HTMLElement>): void {
        this.flip();
        if(this.props.onClick) {
            this.props.onClick(event);
        }
    }
	
    flip(): void {
        this.setState({ flipped: !this.state.flipped });
    }
	
	render(): Node {
        const { className, dataClass, onClick, children, ...rest } = this.props;
        const elementClassName = classes(
			className,
			flipped && this.state.flipped
		);
		return (
            <Elements.View className={elementClassName} onClick={this.onClick} {...rest}>
                <Elements.View className={dataClass.cardFrontClass}>
                    <Elements.View className={dataClass.cardInnerClass}>{children}</Elements.View>
                </Elements.View>
                <Elements.View className={dataClass.cardBackClass}>&nbsp;</Elements.View>
            </Elements.View>
        );
	}
};