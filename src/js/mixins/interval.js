'use strict';

export default class Interval {
  componentWillMount() {
    this.intervals = [];
  }

  setInterval() {
    this.intervals.push(setInterval.apply(null, arguments));
  }

  componentWillUnmount() {
    this.intervals.forEach(clearInterval);
  }
};
