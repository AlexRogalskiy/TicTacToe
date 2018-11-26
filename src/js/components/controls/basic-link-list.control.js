'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import { Link }  from 'react-router-dom';

import { Elements } from 'libs/elements.lib';
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

export default class BasicLinkListControl extends Component<Props> {
    displayName: string = 'BasicLinkListControl';

	state: State = {
		items: []
	};
	
    static defaultProps: Props = {
		className: 'basic-link-list',
        dataClass: { groupClass: 'link-group', itemClass: 'link-item' },
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
            <Elements.View className={className} {...rest}>
                <Elements.Navigation className={dataClass.groupClass} aria-label="breadcrumbs">
                    this.state.items.map((item: object) => {
                        return <Link item={item} key={item.id} to={item.path} onClick={this.onClick(item.name)} className=classes(dataClass.itemClass, item.className)>{item.content}</Link>
                    }.bind(this));
                </Elements.Navigation>
            </Elements.View>
        );
    }
};
