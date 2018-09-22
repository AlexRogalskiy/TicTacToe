"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import { style, classes } from 'typestyle';

import BasicImage from './basic-image';
import BasicInput from './basic-input';

import reactMixin from 'react-mixin';
import Strategy   from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';
import update from 'react-addons-update';

import Forms from '../validators/forms';
import Fields from '../mixins/fields';
import LifeCycle from '../mixins/lifecycle';

//@reactMixin.decorate(Fields)
class ProfileControl extends Component {
	displayName: 'ProfileControl'
	
	propTypes: {
		dataClass: React.PropTypes.object,
		validator: React.PropTypes.string
	}
	
	constraints: {
		'profileImage': {
			required: false
		}
	}
	
	constructor(props) {
        super(props);
		this.validatorTypes = Forms[props.validator] || [];
		//this.state = { validity: {} };
	}
	
	static get defaultProps() {
		return {
        	className: 'profile-image-container',
			dataClass: { imageClass: 'imageClass', inputClass: 'inputClass'},
			validator: 'profileControl'
        };
    }
	
	chooseFile() {
		this.getInputEle('profileImage').click();
	}
	
	setPlaceholderImage(e) {
		let fileVal = this.getInputField('profileImage');
		fileVal = fileVal ? fileVal.value : '';
		
		if (!typeof fileVal === 'string' || /^\s*$/.test(fileVal)) {
			this.setState({
				'profileImageData': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogPCEtLSBDcmVhdGVkIHdpdGggTWV0aG9kIERyYXcgLSBodHRwOi8vZ2l0aHViLmNvbS9kdW9waXhlbC9NZXRob2QtRHJhdy8gLS0+CiA8Zz4KICA8dGl0bGU+YmFja2dyb3VuZDwvdGl0bGU+CiAgPHJlY3QgZmlsbD0iIzAwZmZmZiIgaWQ9ImNhbnZhc19iYWNrZ3JvdW5kIiBoZWlnaHQ9IjgyIiB3aWR0aD0iODIiIHk9Ii0xIiB4PSItMSIvPgogIDxnIGRpc3BsYXk9Im5vbmUiIG92ZXJmbG93PSJ2aXNpYmxlIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIiBpZD0iY2FudmFzR3JpZCI+CiAgIDxyZWN0IGZpbGw9InVybCgjZ3JpZHBhdHRlcm4pIiBzdHJva2Utd2lkdGg9IjAiIHk9IjAiIHg9IjAiIGhlaWdodD0iMTAwJSIgd2lkdGg9IjEwMCUiLz4KICA8L2c+CiA8L2c+CiA8Zz4KICA8dGl0bGU+TGF5ZXIgMTwvdGl0bGU+CiAgPGVsbGlwc2Ugcnk9IjE1IiByeD0iMTUiIGlkPSJzdmdfMSIgY3k9IjMyLjUiIGN4PSI0MCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiMwMDAiIGZpbGw9IiNmZmYiLz4KICA8ZWxsaXBzZSBzdHJva2U9IiMwMDAiIHJ5PSI2MS41IiByeD0iMzguNDk5OTk4IiBpZD0ic3ZnXzIiIGN5PSIxMTIiIGN4PSIzOS41IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiNmZmYiLz4KIDwvZz4KPC9zdmc+'
			});
		}
	}
	
	imageLoadedHandler(e) {
		const imageSize = atob(decodeURI(e.target.result).replace(/^.*base64,/, '')).length;
		this.setState(update(this.state, { sizeExceeded: imageSize > 1024 * 1000 }));
		
		
		Strategy.activateRule(this.validatorTypes, field);
		//const validationState = this.validateFields([this.getInputField('profileImage'), this.getInputField('profileInput')]);
		//this.setState(update(this.state, { validity: validationState }));
		
	      	this.state[field] = e.target.src;
	      	Strategy.activateRule(this.validatorTypes, field);
	      	this.setState(update(this.state, () => {
				this.props.handleValidation(field)(e);
			}));
			
		if (this.state.sizeExceeded) {
			this.setPlaceholderImage();
		} else {
			this.setState(update(this.state, { profileImageData: e.target.result }));
		}
	}
	
	userImageUpload(e) {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.onload = this.imageLoadedHandler;
		reader.readAsDataURL(file);
	}
	
	componentWillMount() {
		this.setPlaceholderImage();
	}
	
    render() {
		const { className, dataClass, ...rest } = this.props;
        return (
            <div className={className}>
				<BasicImage name="profileImage" ref="profileImage" label="Profile Image" src={this.state.profileImageData} dataError={this.state.validity.profileImage} className={dataClass.imageClass} {...rest} />
				<BasicInput name="profileInput" ref="profileInput" type="file" onChange={this.userImageUpload} dataError={this.state.validity.profileInput} className={dataClass.inputClass}>
					<Button onClick={this.chooseFile}>Upload</Button>
				</BasicInput>
			</div>
        )
    }
}

reactMixin.onClass(ProfileControl, LifeCycle);
reactMixin.onClass(ProfileControl, Fields);
export default Validation(Strategy)(ProfileControl);