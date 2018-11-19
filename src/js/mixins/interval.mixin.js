'use strict';

export default class IntervalMixin {
  displayName: string = 'IntervalMixin';
  
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
