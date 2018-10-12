/*"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';

import Logger     from 'appRoot/js/mixins/logger';
import BasicSubmitButtonControl from 'appRoot/js/components/controls/basicSubmitButtonControl';
import BasicTextControl from 'appRoot/js/components/controls/basicTextControl';

let Types = React.PropTypes;

export default class BasicForm extends React.Component {
  displayName: 'BasicForm'
  static propTypes: {
    dataClass: Types.object,
    formButtonSubmitMessage: Types.string,
    fields: Types.array,
    item: Types.object
  }
  static defaultProps = {
    dataClass: { formFieldClass: 'field', formButtonSubmitClass: 'btn btnSubmit' },
    formButtonSubmitMessage: 'Send',
    fields: [],
    item: {}
  }
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      dataClass: props.dataClass,
      formButtonSubmitMessage: props.formButtonSubmitMessage;
      fields: props.fields,
      item: props.item
    };
  }
  onChange(field) {
        // const value = e.target.value;
        // this.setState({fields[e.target.name]: value});
        // this.refs[field].onChange(e);
        return event => {
            const state = { fields[field]: event.target.value };
            //state[field] = event.target.value;
            //let target = e.target.name.substring(1);
            this.setState(state);
            this.refs[field].onChange(event);
        };
  }
  onSubmit(e) {
    e.preventDefault();
    Logger.debug("Fields: " + this.state.fields.inspect);
    if(this.props.onSubmit) {
      this.props.onSubmit(e);
    }
  }
  render() {
    const { dataClass, item, fields, onSubmit, formButtonSubmitMessage, ...rest } = this.props;
    const { formFieldClass, formButtonSubmitClass, ...restClass } = dataClass;
    return (
      <form onSubmit={this.onSubmit} {...rest}>
          <div>
            fields.map(function(item) {
              return <BasicTextControl item={item} key={item.id} label={item.label} onChange={this.onChange(item.name)} className={item.className ? item.className : formFieldClass} dataClass={restClass} />
            }.bind(this));
          </div>
          <BasicSubmitButtonControl message={formButtonSubmitMessage} className={formButtonSubmitClass} />
      </form>
    );
  }
}*/