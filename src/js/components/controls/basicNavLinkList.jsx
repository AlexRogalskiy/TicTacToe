"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import { NavLink, BrowserRouter }  from 'react-router-dom';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames/bind';
import Logger from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;
 
export default class BasicNavLinkList extends React.Component{
    displayName: 'BasicNavLinkList'
	static propTypes: {
        dataClass: Types.object,
        items: Types.array,
		item: Types.object
	}
    static defaultProps = {
        dataClass: { navigationClass: 'breadcrumbs', itemClass: 'navigation-link' },
        items: [],
        item: {}
    }
	constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
            dataClass: props.dataClass,
            items: props.items,
            item: props.item
        };
    }
    onClick(e) {
        Logger.debug(ReactDOM.findDOMNode(this).id + 'clicked', e.target);
        if(this.props.onClick) {
            this.props.onClick(e);
        }
    }
    render() {
        const { dataClass, items, item, onClick, ...rest } = this.props;
        const { itemClass, navigationClass, ...restClass } = dataClass;
        return (
            <div {...rest}>
                <nav className={navigationClass} aria-label="breadcrumbs">
                    items.map(function(item) {
                        return <NavLink item={item} key={item.id} to={item.path} onClick={this.onClick} className={item.className ? item.className : itemClass}>{item.title}</NavLink>
                    }.bind(this));
                </nav>
            <div>
        );
    }
}