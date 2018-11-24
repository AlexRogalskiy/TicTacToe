'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import loremIpsum from 'lorem-ipsum';
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	dataClass?: Object<any>;
	isDisabled: boolean;
	logo?: string;
	rowCount?: number;
	children?: Node;
};
type State = {
	isDisabled: boolean;
};

export default class DynamicRowListControl extends Component<Props, State> {
	displayName: string = 'DynamicRowListControl';
	
	view: ?HTMLElement;
	
	static defaultProps: Props = {
      className: 'App',
	  dataClass: {
        headerClass: 'App-header',
        imageClass: 'App-logo',
        titleClass: 'App-title',
		listViewClass: 'list',
		rowClass: 'row',
		rowImageClass: 'image',
		rowContentClass: 'content'
      },
	  logo: '../images/logo.jpg',
	  isDisabled: false,
	  rowCount: 1000
	};

	state: State = {
		isDisabled: false
	};
	
	constructor(props: Props): void {
		super(props);
		this.renderRow = this.renderRow.bind(this);
		//this.state = { isDisabled: props.isDisabled };
		this.list = Array(props.rowCount).fill().map((val, idx) => {
			return {
				id: idx, 
				name: 'John Doe',
				image: 'http://via.placeholder.com/40',
				text: loremIpsum({
					count: 2, 
					units: 'sentences',
					sentenceLowerBound: 10,
					sentenceUpperBound: 100 
				})
			};
		});
		this.cache = new CellMeasurerCache({
			fixedWidth: true,
			defaultHeight: 100
		});
	}

	renderRow({ index, key, style, parent }): Node {
		const { rowClass, rowImageClass, rowContentClass } = this.props.dataClass;
		return (
		  <CellMeasurer 
			key={key}
			cache={this.cache}
			parent={parent}
			columnIndex={0}
			rowIndex={index}>
			  <Elements.View style={style} className={rowClass}>
				<Elements.View className={rowImageClass}>
				  <Elements.Image src={this.list[index].image} alt="" />
				</Elements.View>
				<Elements.View className={rowContentClass}>
				  <Elements.View>{ this.list[index].name }</Elements.View>
				  <Elements.View>{ this.list[index].text }</Elements.View>
				</Elements.View>
			  </Elements.View>
		  </CellMeasurer>
		);
	}
	
	render(): Node {
		const { className, dataClass, isDisabled, logo, rowCount, children, ...rest } = this.props;
		const { headerClass, imageClass, titleClass, listViewClass, ...restClass } = dataClass;
		return (
			  <Elements.View className={className} ref={view => (this.view = view)} disabled={this.state.isDisabled} {...rest}>
				<Elements.Header className={headerClass}>
				  <Elements.Image src={logo} className={imageClass} alt="logo" />
				  <Elements.Head_1 className={titleClass}>Welcome to React</Elements.Head_1>
				</Elements.Header>
				<Elements.View className={listViewClass}>
				  <AutoSizer>
				  {
					({ width, height }) => {
					  return <List
						width={width}
						height={height}
						deferredMeasurementCache={this.cache}
						rowHeight={this.cache.rowHeight}
						rowRenderer={this.renderRow}
						rowCount={this.list.length}
						overscanRowCount={3} />
					}
				  }
				  </AutoSizer>
				</Elements.View>
			  </Elements.View>
		);
	}
};