"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

class ChatRoom extends Component {
	
	get displayName() {
		return 'ChatRoom';
	}
	
	static get propTypes() {
		return {
			dataClass: PropTypes.object
		};
	}
	
	static get defaultProps() {
		return {
        	className: 'cell',
			dataClass: { chatPageClass: 'chat page', chatAreaClass: 'chatArea', chatMessagesClass: 'messages', chatMessageInputClass: 'inputMessage', chatLoginPage: 'login page', chatNameInputClass: 'usernameInput' }
        };
    }
	
	constructor(props) {
		super(props);
	}

    render() {
		const { className, dataClass, ...rest } = this.props;
        return (
			<ul className={className}>
				<li className={dataClass.chatPageClass}>
					<div class={dataClass.chatAreaClass}>
						<ul class={dataClass.chatMessagesClass}></ul>
					</div>
					<input class={dataClass.chatMessageInputClass} placeholder="Type here..."/>
				</li>
				<li class={dataClass.chatLoginPage}>
					<div class="form">
						<h3 class="title">What's your nickname?</h3>
						<input class={dataClass.chatNameInputClass} type="text" maxlength="14" />
					</div>
				</li>
			</ul>
        )
    }
}

export default ChatRoom;