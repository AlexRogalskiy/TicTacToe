'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
//import ClassNames from 'classnames/bind';

import BasicInputControl from 'app-root/components/controls/basic-input.control';
import BasicListControl from 'app-root/components/controls/basic-list.control';

//import BasicFilterListStyle from 'appRoot/css/components/controls/basicFilterListControl';
//let Styles = ClassNames.bind(BasicFilterListStyle);

type Props = {
    dataClass?: object,
	onChange?: func
};
type State = {
	filter?: string,
	height?: number,
	items: Array<{
		title: string,
		data: object,
		key: string,
		className: string
	}>
};

export default class BasicFilterListControl extends Component<Props, State> {
    displayName: string = 'BasicFilterListControl';
	
	state: State = {
		filter: null,
		height: 0,
		items: []
	};
	
    static defaultProps: Props = {
		className: 'basic-filter-list',
        dataClass: { inputClass: 'search', listClass: 'list', itemClass: 'list-item' },
    };
	
    componentDidMount(): void {
        this.setState({
            height: ReactDOM.findDOMNode(this).querySelector('li').clientHeight
        });
    }
  
  onChange(field: string): func {
    return (event: SyntheticEvent<HTMLInputElement>) => {
      let state = { filter: event.currentTarget.value }; //ReactDOM.findDOMNode(this.refs.search).value
	  this.setState(state);
      if (this.props.onChange) {
        this.props.onChange(event);
      }
    };
  }
	
    render(): Node {
        const { className, dataClass, ...rest } = this.props;
        const { inputClass, listClass, itemClass, ...restClass } = dataClass;
        const elements = this.state.items.map((item, idx) => {
            return { title: item.title, data: item.data, key: item.key };
        }).filter(item => {
            return (this.state.filter ? item.title.toLowerCase().indexOf(this.state.filter) !== -1 : true);
        }.bind(this)).map((item, idx) => {
            return (
                <li key={item.key} data-item={item.data} className=classes(itemClass, item.className}>{item.title}</li>
            );
        }.bind(this));

        return (
            <div className={className}>
                <BasicInputControl ref="search" name="search" label="search" type="text" onChange={this.onChange('search')} className={inputClass} />
                <BasicListControl items={elements} className={listClass} dataClass={restClass} {...rest} />
            </div>
        );
    }
};
