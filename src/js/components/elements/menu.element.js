'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';

import BasicFilterInputControl from 'components/controls/basic-filter-input.control';
import TextMenuItemElement from 'components/elements/text-menu-item.element';

import { Elements } from 'libs/elements.lib';

/* @flow */
type MenuItem = {
	iconClass?: string;
	id: string;
	title: string;
	className?: string;
};
type Props = {
	dataClass: Object<any>;
    items: Array<MenuItem>;
};
type State = {
	items: Array<MenuItem>;
};

export default class MenuElement extends Component<Props, State> {
    displayName: string = 'MenuElement';
	
	state: State = {
		items: this.props.items
	};
	
    static defaultProps: Props = {
        dataClass: { menuListClass: 'menu-list',  menuItemClass: 'menu-item', menuItemIconClass: 'menu-item-icon' }
    };
	
    constructor(props: Props): void {
        super(props);
        this.filter = this.filter.bind(this);
		//this.state = { items: props.items };
    }
	
    filter(text: string): void {
        let filteredList = this.state.items.filter(item => {
            return item.title.toLowerCase().search(text.toLowerCase()) !== -1;
        }); 
        this.setState({ items: filteredList });
    }
	
    render(): Node {
        const { className, dataClass, items, ...rest } = this.props;
        const { menuListClass, menuItemClass, menuItemIconClass, ...restClass } = dataClass;
        const elements = this.state.items.map(item => {
            restClass.iconClass = classes(menuItemIconClass, item.iconClass);
            return <TextMenuItemElement item={item} key={item.id} title={item.title} className=classes(menuItemClass, item.className) dataClass={restClass} />
        }.bind(this));
        return (
            <Elements.View className={className} {...rest}>
                <BasicFilterInputControl filter={this.filter} />
                <Elements.Navigation className={menuListClass}>
                    {elements}
                </Elements.Navigation>
            </Elements.View>
        );
    }
};
