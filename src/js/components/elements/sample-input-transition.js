'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
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

type Props = {};
type State = {
	name: string,
	showValidationMessage: bool,
	showValidationButton: bool
};

class SampleInputTransition extends Component<Props, State> {
  displayName: string = 'SampleInputTransition';

  state: State = {
	  name: '',
	  showValidationMessage: false,
	  showValidationButton: false
  };

  render(): Node {
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