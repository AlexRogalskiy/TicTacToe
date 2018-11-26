'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';

import IconElement from 'components/elements/icon.element';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	dataClass?: Object<any>;
	children?: Node;
};

export default class MenuItemElement extends Component<Props> {
    displayName: string = 'MenuItemElement';
	
    static defaultProps = {
		className: 'menu-item',
        dataClass: { iconClass: 'menu-item-icon' }
    };
	
    constructor(props: Props): void {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
	
  onClick(field: string): func {
    return (event: SyntheticEvent<HTMLElement>) => {
      this.setState({ field: event.currentTarget.src });
      if (this.props.onClick) {
        this.props.onClick(event);
      }
    };
  }
  
    render(): Node {
    	const { className, dataClass, onClick, children, ...rest } = this.props;
        const { iconClass, ...restClass } = dataClass;
        return (
            <Elements.ListItem key={key} className={className} onClick={this.onClick(this.props.name)} {...rest}>
				<IconElement className={iconClass} />
				{ children }
			</Elements.ListItem>
        );
    }
};
