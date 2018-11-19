'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';
import { Icon } from 'appRoot/js/components/elements/icon';

type Props = {
	dataClass?: object,
	children?: React.Node
};

export default class MenuItem extends Component<Props> {
    displayName: string = 'MenuItem';
	
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
            <li key={key} className={className} onClick={this.onClick(this.props.name)} {...rest}>
				<Icon className={iconClass} />
				{children}
			</li>
        );
    }
};
