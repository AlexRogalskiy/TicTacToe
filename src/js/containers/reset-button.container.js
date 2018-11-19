'use strict';

/**
 * Module dependencies
 */
import { connect } from 'react-redux';

const ResetButtonContainer = ({ dispatch }) => {
    <Button label='Reset' className='button button-reset' onPress={dispatch} />
};

connect()(ResetButtonContainer);

export default ResetButtonContainer;
