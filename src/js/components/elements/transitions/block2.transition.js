'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { Grid, Button, Well } from 'react-bootstrap';
import { Transition } from 'react-transition-group';

// @flow
type State = {
	show: boolean,
	entered: boolean
};

export default class Block2Transition extends Component<{}, State> {
  displayName: string = 'Block2Transition';

  state: State = {
	show: false,
	entered: false
  };
  
  constructor(props: Props): void {
	  super(props);
	  this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(defaultState: object): void {
    this.setState(({ state = defaultState }) => ({
      show: !state.show
    }))
  }
  
  render(): Node {
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
};