'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Well } from 'react-bootstrap';
import { Transition } from 'react-transition-group';

class SampleBlockTransition extends Component {
  get displayName() {
    return 'SampleBlockTransition';
  }
  
  constructor(props) {
	  super(props);
	  this.handleToggle = this.handleToggle.bind(this);
	  this.state = { show: false, entered: false };
  }

  handleToggle(defaultState) {
    this.setState(({ state = defaultState }) => ({
      show: !state.show
    }))
  }
  
  render() {
    const { show } = this.state;
	return (
      <Grid style={{ paddingTop: '2rem' }}>
        <Button onClick={ () => this.handleToggle(this.state) }>
          Toggle
        </Button>
        <Well style={{ marginTop: '1rem' }}>
          <Transition
            in={show}
            timeout={1000}
            unmountOnExit>
            {(state) => {
              switch (state) {
                case 'entering':
                  return 'Entering…';
                case 'entered':
                  return 'Entered!';
                case 'exiting':
                  return 'Exiting…';
                case 'exited':
                  return 'Exited!';
              }
            }}
          </Transition>
        </Well>
      </Grid>
    );
  }
}

export default SampleBlockTransition;