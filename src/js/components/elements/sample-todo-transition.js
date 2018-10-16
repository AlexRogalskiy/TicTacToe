'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import {
  Grid,
  ListGroup,
  ListGroupItem,
  Button,
} from 'react-bootstrap';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import uuid from 'uuid';

import './todo-styles.css';

type Props = {};
type State = {
	items: array
};

class SampleTodoTransition extends Component<Props, State> {	
  displayName: string = 'SampleTodoTransition';

  state: State = 
	items: [
		  { id: uuid(), text: 'Buy eggs' },
		  { id: uuid(), text: 'Pay bills' },
		  { id: uuid(), text: 'Invite friends over' },
		  { id: uuid(), text: 'Fix the TV' },
		]
  };

  render(): Node {
    const { items } = this.state;
    return (
      <Grid>
        <ListGroup>
          <TransitionGroup className="todo-list">
            {items.map(({ id, text }) => (
              <CSSTransition
                key={id}
                timeout={500}
                classNames="fade"
              >
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    type="button"
                    bsStyle="danger"
                    bsSize="xs"
                    onClick={() => {
                      this.setState(state => ({
                        items: state.items.filter(
                          item => item.id !== id
                        ),
                      }));
                    }}
                  >
                    &times;
                  </Button>
                  {text}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
        <Button
          type="button"
          onClick={() => {
            const text = prompt('Enter some text');
            if (text) {
              this.setState(state => ({
                items: [
                  ...state.items,
                  { id: uuid(), text },
                ],
              }));
            }
          }}
        >
          Add Item
        </Button>
      </Grid>
    );
  }
}

export default SampleTodoTransition;
