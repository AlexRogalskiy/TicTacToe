'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

@withStyles(theme => ({
    root: {
        ...theme.list,
        backgroundColor: 'red',
    },
}))
@connect((state, props) => ({ }))
export default class Grid2 extends Component {
  get displayName() {
    return 'Grid2';
  }
  
  static get propTypes() {
    return {
		dataClass: PropTypes.object,
        dispatch: PropTypes.func.isRequired
    };
  }

  static get defaultProps() {
    return {
      className: 'grid',
      dataClass: { innerGridClass: 'inner-grid' },
	  dispatch: Function.prototype
    };
  }

    onClick(pathname) {
		return () => {
			const { dispatch } = this.props;
			dispatch(push(pathname));
		};
	}

    render() {
        const { dispatch, children, ...rest } = this.props;
        return (
            <Grid container={true} justify={'center'} alignContent={'center'} alignItems={'center'} wrap={'wrap'}>
                <Grid item={true} xs={12}>
                    {children}
                </Grid>

                <Grid item={true} xs={12}>
                    <Button raised={true} onClick={this.onClick('/')}>move to home</Button>
                </Grid>
            </Grid>
        );
    }
};
