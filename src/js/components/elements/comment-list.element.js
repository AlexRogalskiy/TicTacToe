'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';
import CommentElement from 'app-root/components/elements/comment.element';

type Props = {
	 dataClass?: object,
     items: array
};

export default class CommentListElement extends Component<Props> {
    displayName: string = 'CommentListElement';

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
                <CommentElement item={item} key={item.id} author={item.author} className=classes(commentClass, item.className) dataClass={restClass}>
                    {item.data}
                </CommentElement>
            );
        }.bind(this));
        return (
            <div className={className} {...rest}>
                {elements}
            </div>
        );
    }
}