'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';
import marked from 'marked';

/* @flow */
type Props = {
	dataClass?: Object<any>;
	children?: Node;
};

export default class CommentElement extends Component<Props> {
    displayName: string = 'CommentElement';
	
    static defaultProps: Props = {
		className: 'comment',
        dataClass: { commentAuthorClass: 'commentAuthor', commentTextClass: 'commentText' }
    };
	
    rawMarkup(): object {
        const rawMarkup = marked(this.props.children.toString(), { sanitize: true });
        return { __html: rawMarkup };
    }
	
    render(): Node {
    	const { className, dataClass, author, children, ...rest } = this.props;
        return (
            <div className={className} {...rest}>
                <span className={dataClass.commentAuthorClass}>
                    {author}
                </span>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                <span className={dataClass.commentTextClass}>
					{children}
				</span>
            </div>
        );
    }
};
