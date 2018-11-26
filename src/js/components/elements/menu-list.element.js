'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import { CSSTransitionGroup } from 'react-transition-group/CSSTransitionGroup';
// import update     from 'react-addons-update';
//import { ClassNames } from 'classnames/bind';
// import Logger from 'mixins/logger';
import BlockElement from 'components/elements/block.element';
import MenuItemElement from 'components/elements/menu-item.element';
import BasicListControl from 'components/controls/basic-list.control';
//import { BasicMenuStyle } from 'css/components/elements/basicMenu';
import { Elements } from 'libs/elements.lib';
//let Styles = ClassNames.bind(BasicMenuStyle);

const defaultTransition = (transitionName: string = 'popoveranim',
						   transitionEnterTimeout: number = 350,
						   transitionLeaveTimeout: number = 350) => {
	transitionName,
	transitionEnterTimeout,
	transitionLeaveTimeout
};

/* @flow */
type MenuItem = {
	iconClass?: string;
	id: string;
	data?: Object<any>;
	className: string;
	title: string;
	transition?: Object<any>;
};
type Props = {
	 dataClass?: Object<any>;
     transition?: Object<any>;
};
type State = {
	activeMenu: string;
	items: Array<MenuItem>;
};

export default class MenuListElement extends Component<Props, State> {
    displayName: string = 'MenuListElement';
	
	state: State = {
		activeMenu: null,
		items: []
	};

  view: ?HTMLElement;
  
    static defaultProps: Props = {
		className: 'menu-list'
        dataClass: { itemClass: 'menu-item', itemIconClass: 'menu-item-icon' },
        transition: {}
    };
	
	constructor(props: Props): void {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
    }
	
    toggleMenu(id: string): void {
        this.setState({ activeMenu: this.state.activeMenu === id ? null : id });
    }
	
    render(): Node {
        const { className, dataClass, transition, ...rest } = this.props;
        const { itemClass, itemIconClass, ...restClass } = dataClass;
        const elements = this.state.items.map(item => {
			const mergedTransition = { ...defaultTransition(), ...transition };
			restClass.iconClass = classes(
			  itemIconClass,
			  item.iconClass
			);
            let elems = {this.state.activeMenu === item.id ? 
                        <BlockElement key={item.id}>
                            {item.data}
                        </BlockElement>
                        : []
                    };
            return (
                    <MenuItemElement item={item} key={item.id} className=classes(itemClass, item.className) dataClass={restClass}>
                        <Elements.Label>{item.title}</Elements>
                        <BasicListControl items={elems} transition={item.transition ? item.transition : transition} />
                        <CSSTransitionGroup {...mergedTransition}>
                            {this.state.activeMenu === item.id ? 
                                <BlockElement key={item.id}>
                                    {item.data}
                                </BlockElement>
                                : []
                            }
                        </CSSTransitionGroup>
                    </MenuItemElement>
                );
        }
        return (
                <Elements.View className={className} ref={view => (this.view = view)} {...rest}>
                    <Elements.Navigation>
                        <Elements.List>
                            {elements}
                        </Elements.List>
                    </Elements.Navigation>
                </Elements.View>
        );
    }
};