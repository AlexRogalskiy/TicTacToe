"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import ClassNames from 'classnames/bind';
// import Logger from 'appRoot/js/mixins/logger';
// import BasicBubbleStyle from 'appRoot/css/components/elements/basicBubble';

let Types = React.PropTypes;

export default class BasicBubble extends React.Component {
	displayName: 'BasicBubble'
	static propTypes: {
        item: Types.object
	}
	static defaultProps = {
		className: 'bubble',
		inline: true,
        item: {}
    }
	constructor(props) {
        super(props);
        this.state = {
        	className: props.className,
        	inline: props.inline,
            item: props.item
        };
    }
	render() {
		const { item, ...rest } = this.props;
		return (
			<blockquote {...rest}>
				{rest.children}
			</blockquote>
		);
	}
};

