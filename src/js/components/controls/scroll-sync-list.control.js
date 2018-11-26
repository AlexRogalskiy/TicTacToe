'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import loremIpsum from 'lorem-ipsum';
import { List, AutoSizer, ScrollSync } from 'react-virtualized';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	dataClass?: Object<any>;
	isDisabled?: boolean;
	logo?: string;
	rowCount?: number;
	rowHeight?: number;
	children?: Node;
};
type State = {
	isDisabled: boolean;
};

export default class ScrollSyncListControl extends Component<Props, State> {
	displayName: string = 'ScrollSyncListControl';
	
	view: ?HTMLElement;
	
	static defaultProps: Props = {
      className: 'App',
	  dataClass: {
        headerClass: 'App-header',
        imageClass: 'App-logo',
        titleClass: 'App-title',
		listViewClass: 'list',
		leftSideViewClass: 'leftSide',
		rowClass: 'row',
		rowImageClass: 'image',
		rowContentClass: 'content',
		columnClass: 'row',
		columnContentClass: 'content'
      },
	  logo: '../images/logo.jpg',
	  isDisabled: false,
	  rowCount: 1000,
	  rowHeight: 50
	};

	state: State = {
		isDisabled: this.props.isDisabled
	};
	
	constructor(props: Props): void {
		super(props);
		this.renderRow = this.renderRow.bind(this);
		this.renderColumn = this.renderColumn.bind(this);
		//this.state = { isDisabled: props.isDisabled };
		this.list = Array(props.rowCount).fill().map((val, idx) => {
			return {
				id: idx, 
				name: 'John Doe',
				image: 'http://via.placeholder.com/40',
				text: loremIpsum({
					count: 1, 
					units: 'sentences',
					sentenceLowerBound: 4,
					sentenceUpperBound: 8 
				})
			};
		});
	}

	renderColumn({ index, key, style }): Node {
		const { columnClass, columnContentClass } = this.props.dataClass;
		return (
			  <Elements.View key={key} style={style} className={columnClass}>
				<Elements.View className={columnContentClass}>
				  <Elements.View>{ this.list[index].id }</Elements.View>
				</Elements.View>
			  </Elements.View>
		);
	}
  
	renderRow({ index, key, style }): Node {
		const { rowClass, rowImageClass, rowContentClass } = this.props.dataClass;
		return (
		  <Elements.View key={key} style={style} className={rowClass}>
			<Elements.View className={rowImageClass}>
			  <img src={this.list[index].image} alt="" />
			</Elements.View>
			<Elements.View className={rowContentClass}>
			  <Elements.View>{ this.list[index].name }</Elements.View>
			  <Elements.View>{ this.list[index].text }</Elements.View>
			</Elements.View>
		  </Elements.View>
		);
	}
	
	render(): Node {
		const { className, dataClass, isDisabled, logo, rowCount, rowHeight, children, ...rest } = this.props;
		const { headerClass, imageClass, titleClass, listViewClass, leftSideViewClass, ...restClass } = dataClass;
		return (
		  <Elements.View className={className} ref={view => (this.view = view)} disabled={this.state.isDisabled} {...rest}>
			<Elements.Header className={headerClass}>
			  <Elements.Image src={logo} className={imageClass} alt="logo" />
			  <Elements.Head_1 className={titleClass}>Welcome to React</Elements.Head_1>
			</Elements.Header>
			  <ScrollSync>
				{({ onScroll, scrollTop, scrollLeft }) => (
				  <Elements.View className={listViewClass}>
					<span>{scrollTop} - {scrollLeft}</span>
					<AutoSizer disableWidth>
					{
					  ({ height }) => {
						return (
						  <Elements.View>
							<Elements.View 
							  style={{
								position: 'absolute',
								top: 0,
								left: 0,
							  }}>
								<List
								  className={leftSideViewClass}
								  width={50}
								  height={height}
								  rowHeight={rowHeight}
								  scrollTop={scrollTop}
								  rowRenderer={this.renderColumn}
								  rowCount={this.list.length}
								  overscanRowCount={3} />
							</Elements.View>
							<Elements.View
							  style={{
								position: 'absolute',
								top: 0,
								left: 50,
							  }}>
								<List
								  width={800}
								  height={height}
								  rowHeight={rowHeight}
								  onScroll={onScroll}
								  rowRenderer={this.renderRow}
								  rowCount={this.list.length}
								  overscanRowCount={3} />
							</Elements.View>
						  </Elements.View>
						)
					  }
					}
					</AutoSizer>
				  </Elements.View>
				)
			  }
			  </ScrollSync>
		  </Elements.View>
		);
	}
};