'use strict';

/**
 * Module dependencies
 */
import Logger from 'libs/logger.lib';

/* @flow */
type Props ={
	intervals: Array<func>
};

export default class IntervalMixin<Props> {
  displayName: string = 'IntervalMixin';

  state: State = {
	  intervals: null
  };
  
  componentWillMount(): void {
    this.intervals = [];
  }

  setInterval(): void {
    this.intervals.push(setInterval.apply(null, arguments));
  }

  componentWillUnmount(): void {
    this.intervals.forEach(clearInterval);
  }
};
