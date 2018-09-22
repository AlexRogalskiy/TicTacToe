"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

class Redirect extends Component {
	displayName: 'Redirect'
	
	propTypes: {
		path: React.PropTypes.string
	}
	
	static get defaultProps() {
		return {
        	path: './'
        };
    }
	
    render() {
		return <Redirect to={`/${this.props.path}/${this.props.match.params}`} />;
    }
}

export default Redirect;