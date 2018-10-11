'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import {
  Grid,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';

import './input-styles.css';

class SampleInputTransition extends Component {
  get displayName() {
    return 'SampleInputTransition';
  }

  constructor(props) {
	  super(props);
	  this.state = { name: null, showValidationMessage: false, showValidationButton: false };
  }

  render() {
    const {
      name,
      showValidationMessage,
      showValidationButton,
    } = this.state;
    return (
      <Grid style={{ paddingTop: '2rem' }}>
        <form style={{ marginTop: '1rem' }}>
          <FormGroup
            validationState={
              showValidationMessage ? 'success' : null
            }
          >
            <ControlLabel>Your name</ControlLabel>
            <FormControl
              type="text"
              value={name}
              onFocus={() => {
                this.setState({
                  showValidationMessage: false,
                });
              }}
              onChange={event => {
                this.setState({
                  name: event.target.value,
                  showValidationButton: true,
                });
              }}
            />
            <CSSTransition
              in={showValidationMessage}
              timeout={300}
              classNames="message"
              unmountOnExit
              onExited={() => {
                this.setState({
                  showValidationButton: true,
                });
              }}
            >
              {state => (
                <HelpBlock>
                  Your name rocks!
                  <CSSTransition
                    in={state === 'entered'}
                    timeout={300}
                    classNames="star"
                    unmountOnExit
                  >
                    <div className="star">⭐</div>
                  </CSSTransition>
                </HelpBlock>
              )}
            </CSSTransition>
          </FormGroup>
        </form>
        {showValidationButton ? (
          <Button
            onClick={() => {
              this.setState(state => ({
                showValidationButton: false,
                showValidationMessage: true,
              }));
            }}
          >
            Validate form
          </Button>
        ) : null}
      </Grid>
    );
  }
}

export default SampleInputTransition;