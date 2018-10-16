'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';
import Comment from 'appRoot/js/components/elements/comment';

type Props = {
	 dataClass?: object,
     items: array
};

export default class CommentList extends Component<Props> {
    displayName: string = 'CommentList';

    static defaultProps: Props = {
		className: 'comment-list',
        dataClass: {},
        items: []
    };

    render(): Node {
    	const { className, dataClass, items, ...rest } = this.props;
        const { commentClass, ...restClass } = dataClass;
        const elements = items.map(item => {
            return (
                <Comment item={item} key={item.id} author={item.author} className=classes(commentClass, item.className) dataClass={restClass}>
                    {item.data}
                </Comment>
            );
        }.bind(this));
        return (
            <div className={className} {...rest}>
                {elements}
            </div>
        );
    }
}