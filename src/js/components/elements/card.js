'use strict"'

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
// import update     from 'react-addons-update';
//import ClassNames from 'classnames/bind';
//import BasicCardItemStyle from 'appRoot/css/components/elements/basicCardItem';

//let Styles = ClassNames.bind(BasicCardItemStyle);

type Props = {
	 dataClass?: object
};
type State = {
	flipped: bool
};

export default class Card extends Component<Props, State> {
    displayName: string = 'Card';
	
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

    onClick(e: SyntheticEvent<HTMLElement>): void {
        this.flip();
        if(this.props.onClick) {
            this.props.onClick(e);
        }
    }
	
    flip(): void {
        this.setState({ flipped: !this.state.flipped });
    }
	
	render(): Node {
        const { className, dataClass, onClick, ...rest } = this.props;
        const elementClassName = classes(
			className,
			flipped && this.state.flipped
		);
		return (
            <div className={elementClassName} onClick={this.onClick} {...rest}>
                <div className={dataClass.cardFrontClass}>
                    <div className={dataClass.cardInnerClass}>{rest.children}</div>
                </div>
                <div className={dataClass.cardBackClass}>&nbsp;</div>
            </div>
        );
	}
};