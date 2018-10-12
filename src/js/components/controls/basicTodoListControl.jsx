"use strict";
/**
 * Module dependencies
 */
import { React } from 'react';
import { CSSTransitionGroup } from 'react-transition-group/CSSTransitionGroup';
// import update     from 'react-addons-update';
import { ClassNames } from 'classnames/bind';
// import Logger from 'appRoot/js/mixins/logger';
import { BasicButtonControl } from 'appRoot/js/components/controls/basicButtonControl';
import { BasicTodoListStyle } from 'appRoot/css/components/controls/basicTodoListControl';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicTodoListStyle);

export default class BasicTodoListControl extends React.Component {
  displayName: 'BasicTodoListControl'
  static propTypes: {
    dataClass: Types.object,
    transition: Types.object,
    items: Types.array,
    item: Types.object
  }
  static defaultProps = {
    dataClass: { btnClass: 'buttonControl', listClass: 'listControl', itemClass: 'listItem' },
    transition: {
      component: "span",
      name: "todoGroup",
      enterTimeout: { 500 },
      leaveTimeout: { 300 }
    },
    items: [],
    item: {}
  }
  constructor(props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      items: ['hello', 'world', 'click', 'me']
    };
  }
  addItem() {
    const newItems = this.state.items.concat([
      prompt('Enter some text')
    ]);
    this.setState({items: newItems});
  }
  removeItem(index) {
    let newItems = this.state.items.slice();
    newItems.splice(index, 1);
    this.setState({items: newItems});
  }
  render() {
    const { dataClass, className, items, item, ...rest } = this.props;
    const { btnClass, listClass, itemClass, ...restClass } = dataClass;
    const elements = this.state.items.map((item, i) => (
      <div key={item} onClick={() => this.handleRemove(i)} className={item.className ? item.className : itemClass}>
        {item}
      </div>
    ));

    return (
      <div className={className}>
        <BasicButtonControl message="Add Item" onClick={this.addItem} className={Styles(btnClass)} />
        <BasicListControl items={elements} className={Styles(listClass)} dataClass={restClass} {...rest} />
      </div>
    );
  }
}