'use strict"'

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import { NavLink }  from 'react-router-dom';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames/bind';
//import Logger from 'mixins/logger';

/* @flow */
type LinkItem = {
	id: string;
	path: string;
	name: string;
	className: string;
	content: Object<any>;
};
type Props = {
   dataClass?: Object<any>;
   onClick?: func;
};
type State = {
   items?: Array<LinkItem>;
};
 
export default class BasicNavLinkListControl extends Component<Props, State> {
    displayName: string = 'BasicNavLinkListControl';

	state: State = {
		items: []
	};
  
    static defaultProps: Props = {
		className: 'basic-nav-link-list',
        dataClass: { groupClass: 'nav-link-group', itemClass: 'nav-link-item' },
    };

	constructor(props: Props): void {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

	onClick(field: string): func {
		return (event: SyntheticEvent<HTMLLinkElement>) => {
			//Logger.debug(ReactDOM.findDOMNode(this).id + 'clicked', e.target);
		  this.setState(( field: event.currentTarget.src ));
		  if (this.props.onClick) {
			this.props.onClick(event);
		  }
		};
	}

    render(): Node {
        const { className, dataClass, onClick, ...rest } = this.props;
        return (
            <div className={className} {...rest}>
                <nav className={dataClass.groupClass} aria-label="breadcrumbs">
                    this.state.items.map((item: object) {
						return <NavLink item={item} key={item.id} to={item.path} onClick={this.onClick(item.name)} className=classes(dataClass.itemClass, item.className)>{item.content}</NavLink>
                    }.bind(this));
                </nav>
            <div>
        );
    }
};
