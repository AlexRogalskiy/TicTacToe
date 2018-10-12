"use strict";
/**
 * Module dependencies
 */
import React from 'react';
// import update     from 'react-addons-update';
import ClassNames from 'classnames/bind';
import Logger from 'appRoot/js/mixins/logger';

import BasicTextControl from 'appRoot/js/components/controls/basicTextControl';
import BasicListControl from 'appRoot/js/components/controls/basicListControl';

import BasicFilterListStyle from 'appRoot/css/components/controls/basicFilterListControl';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicFilterListStyle);

export default class BasicFilterListControl extends React.Component{
    displayName: 'BasicFilterListControl'
	static propTypes: {
        dataClass: Types.object,
        filter: Types.string,
        items: Types.array,
		item: Types.object
	}
    static defaultProps = {
        dataClass: { searchClass: 'searchControl', listClass: 'listControl', itemClass: 'listItem' },
        filter: '',
        items: [],
        item: {}
    }
	constructor(props) {
        super(props);
        // this.onClick = this.onClick.bind(this);
        this.state = {
            dataClass: props.dataClass,
            filter: props.filter,
            items: props.items,
            item: props.item
        };
    }
    componentDidMount() {
        this.setState({
            height: ReactDOM.findDOMNode(this).querySelector('li').clientHeight
        });
    }
    search() {
        this.setState({filter: ReactDOM.findDOMNode(this.refs.search).value});
    }
    render() {
        const { dataClass, className, filter, items, item, ...rest } = this.props;
        const { searchClass, listClass, itemClass, ...restClass } = dataClass;
        const elements = items.map(function (item, idx) {
            return { title: item.title, data: item.data, key: item.key };
        }).filter(function (item) {
            return (filter ? item.title.toLowerCase().indexOf(filter) !== -1 : true);
        }.bind(this)).map(function (item, idx) {
            return (
                <li key={item.key} data-item={item.data} className={item.className ? item.className : itemClass}>{item.title}</li>
            );
        }.bind(this));

        return (
            <div className={className}>
                <BasicTextControl ref="search" name="search" label="search" type="text" onChange={this.search} className={Styles(searchClass)} />
                <BasicListControl items={elements} className={Styles(listClass)} dataClass={restClass} {...rest} />
            </div>
        );
    }
}