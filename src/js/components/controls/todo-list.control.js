'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
// import update     from 'react-addons-update';
//import { ClassNames } from 'classnames/bind';
// import Logger from 'appRoot/js/mixins/logger';

import BasicButtonControl from 'appRoot/components/controls/basic-button.control';
import BasicListControl from 'appRoot/js/components/controls/basic-list.control';
//import { BasicTodoListStyle } from 'app-root/components/controls/basicTodoListControl';
//let Styles = ClassNames.bind(BasicTodoListStyle);

type Props = {
	dataClass?: object,
	isDisabled?: bool,
	items?: array
};
type State = {
	items: array
};

export default class TodoListControl extends Component<Props, State> {
  displayName: string = 'TodoListControl';

	state: State = {
		items: []
	};

  static defaultProps: Props = {
    dataClass: { buttonClass: 'button', listClass: 'list', itemClass: 'list-item' },
    transition: {
      component: "span",
      name: "todoGroup",
      enterTimeout: { 500 },
      leaveTimeout: { 300 }
    },
    items: []
  };

  constructor(props: Props): void {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = { items: props.items };
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
    const { classNamem, dataClass, isDisabled, items, ...rest } = this.props;
    const { buttonClass, listClass, itemClass, ...restClass } = dataClass;
    const elements = this.state.items.map((item, i) => (
      <div key={item} name={item.name} onClick={() => this.removeItem(i)} className=classes(itemClass, item.className)>
        {item.content}
      </div>
    ));

    return (
      <div className={className}>
        <BasicButtonControl message="Add Item" onClick={this.addItem} className={buttonClass} isDisabled={isDisabled} />
        <BasicListControl items={elements} className={listClass} dataClass={restClass} {...rest} />
      </div>
    );
  }
};