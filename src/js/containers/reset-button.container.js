'use strict';

/**
 * Module dependencies
 */
import { connect } from 'react-redux';
import { Elements } from 'libs/elements.lib';

const ResetButtonContainer = ({ dispatch }): Node => {
    <Elements.Button label='Reset' className='button button-reset' onPress={dispatch} />
};

connect()(ResetButtonContainer);

export default ResetButtonContainer;
