'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';
import BasicFilterInput from 'appRoot/js/components/controls/basic-filter-input';
import TextMenuItem from 'appRoot/js/components/elements/text-menu-item';

type Props = {
	dataClass: object,
    items: array
};
type State = {
	items: array
};

export default class Menu extends Component<Props, State> {
    displayName: string = 'Menu';
	
	state: State = {
		items: []
	};
	
    static defaultProps: Props = {
        dataClass: { menuListClass: 'menu-list',  menuItemClass: 'menu-item', menuItemIconClass: 'menu-item-icon' },
        items: []
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
            return <TextMenuItem item={item} key={item.id} title={item.title} className=classes(menuItemClass, item.className) dataClass={restClass} />
        }.bind(this));
        return (
            <div className={className} {...rest}>
                <BasicFilterInput filter={this.filter} />
                <nav className={menuListClass}>
                    {elements}
                </nav>
            </div>
        );
    }
};
