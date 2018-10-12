"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import marked from 'marked';

let Types = React.PropTypes;

export default class BasicCommentItem extends React.Component {
    displayName: 'BasicCommentItem'
	static propTypes: {
        dataClass: Types.object,
        item: Types.object
    }
    static defaultProps = {
        dataClass: { commentAuthorClass: 'commentAuthor', commentTextClass: 'commentText' },
        className: '',
        item: {}
    }
    constructor(props) {
        super(props);
        this.state = {
            dataClass: props.dataClass,
            className: props.className,
            item: props.item
        };
    }
    rawMarkup() {
        const rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return {__html: rawMarkup};
    }
    render() {
    	const { dataClass, item, author, ...rest } = this.props;
        const { commentAuthorClass, commentTextClass, ...restClass } = dataClass;
        return (
            <div {...rest}>
                <h2 className={commentAuthorClass}>
                    {author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
                <span className={commentTextClass}>{rest.children}</span>
            </div>
        );
    }
}