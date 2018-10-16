'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
//import ClassNames from 'classnames/bind';

import BasicText from 'appRoot/js/components/controls/basic-text';
import BasicList from 'appRoot/js/components/controls/basic-list';

//import BasicFilterListStyle from 'appRoot/css/components/controls/basicFilterListControl';
//let Styles = ClassNames.bind(BasicFilterListStyle);

type Props = {
    dataClass?: object,
    items: array
};
type State = {
	filter?: string,
	height?: number
};

export default class BasicFilterList extends Component<Props, State> {
    displayName: string = 'BasicFilterList';
	
	state: State = {
		filter: null
	};
	
    static defaultProps: Props = {
		className: 'basic-filter-list',
        dataClass: { inputClass: 'search', listClass: 'list', itemClass: 'list-item' },
        filter: '',
        items: []
    };
	
    componentDidMount(): void {
        this.setState({
            height: ReactDOM.findDOMNode(this).querySelector('li').clientHeight
        });
    }

  onChange(field: string): func {
    return (event: SyntheticEvent<HTMLInputElement>) => {
      let state = { filter: event.currentTarget.value }; //ReactDOM.findDOMNode(this.refs.search).value
      if (this.props.onChange) {
        this.props.onChange(event);
      }
    };
  }
	
    render(): Node {
        const { className, dataClass, filter, items, item, ...rest } = this.props;
        const { inputClass, listClass, itemClass, ...restClass } = dataClass;
        const elements = items.map((item, idx) => {
            return { title: item.title, data: item.data, key: item.key };
        }).filter(item => {
            return (filter ? item.title.toLowerCase().indexOf(filter) !== -1 : true);
        }.bind(this)).map((item, idx) => {
            return (
                <li key={item.key} data-item={item.data} className=classes(itemClass, item.className}>{item.title}</li>
            );
        }.bind(this));

        return (
            <div className={className}>
                <BasicText ref="search" name="search" label="search" type="text" onChange={this.onChange('search')} className={inputClass} />
                <BasicList items={elements} className={listClass} dataClass={restClass} {...rest} />
            </div>
        );
    }
};
