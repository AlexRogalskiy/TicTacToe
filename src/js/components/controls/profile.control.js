'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import PropTypes from 'prop-types';

import reactMixin from 'react-mixin';
import Strategy from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';

import BasicImageControl from 'components/controls/basic-image.control';
import BasicInputControl from 'components/controls/basic-input.control';

import { isString } from 'libs/helpers.lib';

import FormsValidator from 'validators/forms.validator';
import LifeCycleMixin from 'mixins/lifecycle.mixin';

/* @flow */
type Props = {
	dataClass?: Object<any>;
    validator?: string;
};
type State = {
	validity: Object<any>;
};

class ProfileControl extends Component<Props, State> {
  displayName: string = 'ProfileControl';
  
  mixins: array = [ LifeCycleMixin ];
	
  state: State = {
	validity: {}
};

  static defaultProps: Props = {
      className: 'profile-image-container',
      dataClass: { imageClass: 'imageClass', inputClass: 'inputClass' },
      validator: 'profileControl'
  };

  constraints: object = {
      profileImage: {
        required: false
      }
  };

  constructor(props: Props): void {
    super(props);
    this.validatorTypes = FormsValidator[props.validator] || [];
    //this.state = { validity: {} };
  }

  getValidatorData(): object {
    return this.state;
  }

  chooseFile(field: string): func {
    return (event: SyntheticEvent<HTMLButtonElement>) => {
      this.getInputField(field).click();
      if (this.props.onClick) {
        this.props.onClick(event);
      }
    };
  }

  setPlaceholderImage(event: SyntheticEvent<>): func {
    let fileVal = this.getInputField('profileImage');
    fileVal = fileVal ? fileVal.value : '';

    if (!isString(fileVal) || /^\s*$/.test(fileVal)) {
      this.setState({
        profileImageData: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPCEtLSBDcmVhdGVkIHdpdGggTWV0aG9kIERyYXcgLSBodHRwOi8vZ2l0aHViLmNvbS9kdW9waXhlbC9NZXRob2QtRHJhdy8gLS0+CiA8Zz4KICA8dGl0bGU+YmFja2dyb3VuZDwvdGl0bGU+CiAgPHJlY3QgZmlsbD0iIzAwZmZmZiIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjgyIiB3aWR0aD0iODIiIHk9Ii0xIiB4PSItMSIvPgogIDxnIGRpc3BsYXk9Im5vbmUiIG92ZXJmbG93PSJ2aXNpYmxlIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiBpZD0iY2FudmFzR3JpZCI+CiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4KICA8L2c+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPGVsbGlwc2Ugcnk9IjE1IiByeD0iMTUiIGlkPSJzdmdfMSIgY3k9IjMyLjUiIGN4PSI0MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiMwMDAiIGZpbGw9IiNmZmYiLz4KICA8ZWxsaXBzZSBzdHJva2U9IiMwMDAiIHJ5PSI2MS41IiByeD0iMzguNDk5OTk4IiBpZD0ic3ZnXzIiIGN5PSIxMTIiIGN4PSIzOS41IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiNmZmYiLz4KIDwvZz4KPC9zdmc+',
      });
    }
  }

  imageLoadedHandler(field: string): void {
    return (event: SyntheticEvent<HTMLButtonElement>) => {
      const imageSize = atob(
        decodeURI(event.currentTarget.result).replace(/^.*base64,/, '')
      ).length;
      this.setState({ sizeExceeded: imageSize > 1024 * 1000 });

      Strategy.activateRule(this.validatorTypes, field);
      //const validationState = this.validateFields([this.getInputField('profileImage'), this.getInputField('profileInput')]);
      //this.setState(update(this.state, { validity: validationState }));

      this.state[field] = event.currentTarget.src;
      Strategy.activateRule(this.validatorTypes, field);
      this.setState(() => {
        this.props.handleValidation(field)(event);
      });

      if (this.state.sizeExceeded) {
        console.log('a');
        this.setPlaceholderImage();
      } else {
        console.log('b');
        this.setState({ profileImageData: event.currentTarget.result });
      }
    };
  }

  userImageUpload(field: string): void {
    return event => {
      const file = event.currentTarget.files[0];
      const reader = new FileReader();
      reader.onload = this.imageLoadedHandler(field).bind(this);
      reader.readAsDataURL(file);
      if (this.props.onChange) {
        this.props.onChange(event);
      }
    };
  }

  componentWillMount(): void {
    this.setPlaceholderImage();
  }

  render(): Node {
    const { className, dataClass, ...rest } = this.props;
    return (
      <div className={className}>
        <BasicImageControl
          name="profileImage"
          ref="profileImage"
          label="Profile Image"
          src={this.state.profileImageData}
          dataError={this.state.validity['profileImage']}
          className={dataClass.imageClass}
          {...rest}
        />
        <BasicInputControl
          name="profileInput"
          ref="profileInput"
          type="file"
          onChange={this.userImageUpload('profileInput')}
          dataError={this.state.validity['profileInput']}
          className={dataClass.inputClass}
        >
          <button onClick={this.chooseFile('profileInput')}>Upload</button>
        </BasicInputControl>
      </div>
    );
  }
};

reactMixin.onClass(ProfileControl, LifeCycleMixin);

export default Validation(Strategy)(ProfileControl);
