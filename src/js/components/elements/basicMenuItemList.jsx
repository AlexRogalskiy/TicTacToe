"use strict";
/**
 * Module dependencies
 */
import React from 'react';
import SearchPlugin from 'appRoot/js/components/plugins/searchPlugin';
import BasicMenuItem from 'appRoot/js/components/elements/basicMenuItem';

let Types = React.PropTypes;

export default class BasicMenuItemList extends React.Component {
    displayName: 'BasicMenuItemList'
    static propTypes: {
        dataClass: Types.object,
        items: Types.array,
        item: Types.object
    }
    static defaultProps = {
        dataClass: {},
        items: [],
        item: {}
    }
    constructor(props){
        super(props);
        this.filter = this.filter.bind(this);
        this.state = {
            dataClass: props.dataClass,
            items: props.items,
            item: props.item
        };
    }
    filter(text) {
        let filteredList = this.props.items.filter(function(item) {
            return item.title.toLowerCase().search(text.toLowerCase()) !== -1;
        }); 
        this.setState({items: filteredList});
    }
    render() {
        const { dataClass, items, item, ...rest } = this.props;
        const { itemClass, itemIconClass, ...restClass } = dataClass;
        const elements = this.state.items.map(function(item) {
            restClass.iconClass = item.iconClass ? item.iconClass : itemIconClass;
            return <BasicMenuItem item={item} key={item.id} title={item.title} className={item.className ? item.className : itemClass} dataClass={restClass} />
        }.bind(this));
        return (
            <div {...rest}>
                <SearchPlugin filter={this.filter} />
                <nav>
                    {elements}
                </nav>
            </div>
        );
    }
}