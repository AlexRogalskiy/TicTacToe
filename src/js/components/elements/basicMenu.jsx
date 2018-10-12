"use strict";
/**
 * Module dependencies
 */
import { React } from 'react';
import { CSSTransitionGroup } from 'react-transition-group/CSSTransitionGroup';
// import update     from 'react-addons-update';
import { ClassNames } from 'classnames/bind';
// import Logger from 'appRoot/js/mixins/logger';
import { BasicContent2 } from 'appRoot/js/components/elements/basicContent2';
import { BasicMenuItem2 } from 'appRoot/js/components/elements/basicMenuItem2';
import { BasicListControl } from 'appRoot/js/components/controls/basicListControl';
import { BasicMenuStyle } from 'appRoot/css/components/elements/basicMenu';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicMenuStyle);

export default class BasicMenu extends React.Component{
    displayName: 'BasicMenu'
	static propTypes: {
        dataClass: Types.object,
        className: Types.string,
        transition: Types.object,
        items: Types.array,
		item: Types.object
	}
    static defaultProps = {
        dataClass: { itemClass: 'menuItem', itemIconClass: 'menuItemIcon' },
        className: 'navMenu'
        transition: {
            component: "span",
            name: "popoveranim",
            enterTimeout: { 350 },
            leaveTimeout: { 350 }
        },
        items: [],
        item: {}
    }
	constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            dataClass: props.dataClass,
            className: props.className,
            transition: props.transition,
            items: props.items,
            item: props.item
        };
    }
    toggleMenu(id) {
        this.setState({'activeMenu': this.state.activeMenu === id ? null : id});
    }
    render() {
        const { dataClass, className, transition, items, item, ...rest } = this.props;
        const { itemClass, itemIconClass, ...restClass } = dataClass;
        const elements = this.state.items.map(function(item) {
            restClass.iconClass = item.iconClass ? item.iconClass : itemIconClass;
            elems = {this.state.activeMenu === item.id ? 
                        <BasicContent2 key={item.id}>
                            {item.data}
                        </BasicContent2>
                        : []
                    };
            return (
                    <BasicMenuItem2 item={item} key={item.id} className={item.className ? item.className : itemClass} dataClass={restClass}>
                        <label>{item.title}</label>
                        <BasicListControl items={elems} transition={item.transition ? item.transition : transition} />
                        <CSSTransitionGroup 
                            transitionName={item.transition.name ? item.transition.name : 'popoveranim'}
                            transitionEnterTimeout={item.transition.enterTimeout ? item.transition.enterTimeout : 350}
                            transitionLeaveTimeout={item.transition.leaveTimeout ? item.transition.leaveTimeout : 350}>
                            {this.state.activeMenu === item.id ? 
                                <BasicContent2 key={item.id}>
                                    {item.data}
                                </BasicContent2>
                                : []
                            }
                        </CSSTransitionGroup>
                    </BasicMenuItem2>
                );
        }
        return (
                <div className={Styles(className)}>
                    <nav>
                        <ul>
                            {elements}
                        </ul>
                    </nav>
                </div>
        );
    }
}