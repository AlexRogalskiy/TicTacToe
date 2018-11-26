'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';
import CommentElement from 'components/elements/comment.element';

import { Elements } from 'libs/elements.lib';

/* @flow */
type ListItem = {
	id: string;
	author: string;
	className: string;
	data: Object<any>;
};
type Props = {
	 dataClass?: Object<any>;
};
type State = {
     items: Array<ListItem>;
};

export default class CommentListElement extends Component<Props, State> {
    displayName: string = 'CommentListElement';

	state: State = {
		items: []
	};
  
    static defaultProps: Props = {
		className: 'comment-list',
        dataClass: {}
    };

    render(): Node {
    	const { className, dataClass, ...rest } = this.props;
        const { commentClass, ...restClass } = dataClass;
        const elems = this.state.items.map(item => {
            return (
                <CommentElement item={item} key={item.id} author={item.author} className=classes(commentClass, item.className) dataClass={restClass}>
                    {item.data}
                </CommentElement>
            );
        }.bind(this));
        return (
            <Elements.View className={className} {...rest}>
                { elems }
            </Elements.View>
        );
    }
}