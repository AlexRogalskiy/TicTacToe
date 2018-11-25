'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

const ItemView = ({ match }): Node => <h3>Requested Param: {match.params.id}</h3>

export default ItemView;