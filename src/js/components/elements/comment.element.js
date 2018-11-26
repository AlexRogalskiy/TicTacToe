'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';
import marked from 'marked';

import { Elements } from 'libs/elements.lib';

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
            <Elements.View className={className} {...rest}>
                <Elements.Text className={dataClass.commentAuthorClass}>
                    {author}
                </Elements.Text>
                <Elements.Text dangerouslySetInnerHTML={this.rawMarkup()} />
                <Elements.Text className={dataClass.commentTextClass}>
					{children}
				</Elements.Text>
            </Elements.View>
        );
    }
};
