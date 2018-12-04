'use strict';

/**
 * Module dependencies
 */
import { connect } from 'react-redux';
//import { Dispatch } from 'redux';

import { Dispatch } from 'types/tictactoe.type';
import { Elements } from 'libs/elements.lib';

const ResetButton = ({ dispatch }: Dispatch): Node => {
    <Elements.Button label='Reset' className='button button-reset' onPress={dispatch} />
};

const ResetButtonContainer = connect()(ResetButton);

export default ResetButtonContainer;
