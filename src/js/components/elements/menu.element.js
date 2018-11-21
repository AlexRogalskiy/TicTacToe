'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';

import BasicFilterInputControl from 'app-root/components/controls/basic-filter-input.control';
import TextMenuItemElement from 'app-root/components/elements/text-menu-item.element';

// @flow
type MenuItem = {
	iconClass?: string,
	id: string,
	title: string,
	className?: string
};
type Props = {
	dataClass: Object<any>,
    items: Array<MenuItem>
};
type State = {
	items: Array<MenuItem>
};

export default class MenuElement extends Component<Props, State> {
    displayName: string = 'MenuElement';
	
	state: State = {
		items: []
	};
	
    static defaultProps: Props = {
        dataClass: { menuListClass: 'menu-list',  menuItemClass: 'menu-item', menuItemIconClass: 'menu-item-icon' }
    };
	
    constructor(props: Props): void {
        super(props);
        this.filter = this.filter.bind(this);
		this.state = { items: props.items };
    }
	
    filter(text: string): void {
        let filteredList = this.props.items.filter(item => {
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
            <div className={className} {...rest}>
                <BasicFilterInputControl filter={this.filter} />
                <nav className={menuListClass}>
                    {elements}
                </nav>
            </div>
        );
    }
};
