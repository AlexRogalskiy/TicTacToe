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
	title?: string;
};

export default class TextMenuItemElement extends Component<Props> {
    displayName: string = 'TextMenuItemElement';

    static defaultProps: Props = {
		className: 'text-menu-item',
        dataClass: { iconClass: 'menu-item-icon' },
        title: null
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
    	const { className, dataClass, title, onClick, ...rest } = this.props;
        const { iconClass, ...restClass } = dataClass;
        return (
            <Elements.ListItem key={key} className={className} onClick={this.onClick(this.props.name)} {...rest}>
				<IconElement className={iconClass} />
				{title}
			</Elements.ListItem>
        );
    }
};
