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
// import Logger from 'appRoot/js/mixins/logger';
import { Block } from 'appRoot/js/components/elements/block';
import { MenuItem } from 'appRoot/js/components/elements/menu-item';
import { BasicListControl } from 'appRoot/js/components/controls/basicListControl';
//import { BasicMenuStyle } from 'appRoot/css/components/elements/basicMenu';

//let Styles = ClassNames.bind(BasicMenuStyle);

const defaultTransition = (transitionName: string = 'popoveranim',
						   transitionEnterTimeout: number = 350,
						   transitionLeaveTimeout: number = 350) => {
	transitionName,
	transitionEnterTimeout,
	transitionLeaveTimeout
};

type Props = {
	 dataClass?: object,
     transition?: object,
     items: array
};
type State = {
	activeMenu: string
};

export default class MenuList extends Component<Props, State> {
    displayName: string = 'MenuList';
	
	state: State = {
		activeMenu: null
	};
	
    static defaultProps: Props = {
		className: 'menu-list'
        dataClass: { itemClass: 'menu-item', itemIconClass: 'menu-item-icon' },
        transition: {},
        items: []
    };
	
	constructor(props: Props): void {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
    }
	
    toggleMenu(id: string): void {
        this.setState({ activeMenu: this.state.activeMenu === id ? null : id });
    }
	
    render(): Node {
        const { className, dataClass, transition, items, ...rest } = this.props;
        const { itemClass, itemIconClass, ...restClass } = dataClass;
        const elements = this.state.items.map(item => {
			const mergedTransition = { ...defaultTransition(), ...transition };
			restClass.iconClass = classes(
			  itemIconClass,
			  item.iconClass
			);
            elems = {this.state.activeMenu === item.id ? 
                        <Block key={item.id}>
                            {item.data}
                        </Block>
                        : []
                    };
            return (
                    <MenuItem item={item} key={item.id} className=classes(itemClass, item.className) dataClass={restClass}>
                        <label>{item.title}</label>
                        <BasicListControl items={elems} transition={item.transition ? item.transition : transition} />
                        <CSSTransitionGroup {...mergedTransition}>
                            {this.state.activeMenu === item.id ? 
                                <Block key={item.id}>
                                    {item.data}
                                </Block>
                                : []
                            }
                        </CSSTransitionGroup>
                    </MenuItem>
                );
        }
        return (
                <div className={className} {...rest}>
                    <nav>
                        <ul>
                            {elements}
                        </ul>
                    </nav>
                </div>
        );
    }
}