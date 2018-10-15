'use strict';
/**
 * Module dependencies
 */
import { connect } from 'react-redux';

const resetButton = ({ dispatch }) => {
    <Button label="Reset" className="button button-reset" onPress={dispatch} />
};

connect()(resetButton);

export default resetButton;
