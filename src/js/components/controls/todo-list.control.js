'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
// import update     from 'react-addons-update';
//import { ClassNames } from 'classnames/bind';
// import Logger from 'mixins/logger';

import BasicButtonControl from 'components/controls/basic-button.control';
import BasicListControl from 'components/controls/basic-list.control';

import { Elements } from 'libs/elements.lib';
//import { BasicTodoListStyle } from 'components/controls/basicTodoListControl';
//let Styles = ClassNames.bind(BasicTodoListStyle);

/* @flow */
type TodoItem = {
	name: string;
	className: string;
	content: Object<any>;
};
type Props = {
	dataClass?: Object<any>;
	isDisabled?: boolean;
	transition: Object<any>;
};
type State = {
	items: Array<TodoItem>;
};

export default class TodoListControl extends Component<Props, State> {
  displayName: string = 'TodoListControl';

  state: State = {
	  items: this.props.items
  };

  static defaultProps: Props = {
    dataClass: { buttonClass: 'button', listClass: 'list', itemClass: 'list-item' },
	isDisabled: false,
    transition: {
      component: "span",
      name: "todoGroup",
      enterTimeout: { 500 },
      leaveTimeout: { 300 }
    }
  };

  constructor(props: Props): void {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    //this.state = { items: props.items };
  }

  addItem(): void {
    const newItems = this.state.items.concat([
		prompt('Enter some text')
    ]);
    this.setState({ items: newItems });
  }

  removeItem(index: number): void {
    let newItems = this.state.items.slice();
    newItems.splice(index, 1);
    this.setState({ items: newItems });
  }

  render(): Node {
    const { className, dataClass, isDisabled, ...rest } = this.props;
    const { buttonClass, listClass, itemClass, ...restClass } = dataClass;
    const elements = this.state.items.map((item, i) => (
      <Elements.View key={item} name={item.name} onClick={() => this.removeItem(i)} className=classes(itemClass, item.className)>
        {item.content}
      </Elements.View>
    ));

    return (
      <Elements.View className={className}>
        <BasicButtonControl message="Add Item" onClick={this.addItem} className={buttonClass} isDisabled={isDisabled} />
        <BasicListControl items={elements} className={listClass} dataClass={restClass} {...rest} />
      </Elements.View>
    );
  }
};
