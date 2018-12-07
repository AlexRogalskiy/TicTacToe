'use strict';

/* @flow */
type Props = {
	worker: Object<any>;
};

export default class WorkerService<Props> {
  displayName: string = 'WorkerService';
  
  static defaultProps: Props = {
      storage: {}
  };
  
	constructor(worker: Props): Object<any> {
		const code = worker.toString();
		const blob = new Blob(['('+code+')()']);
		return new Worker(URL.createObjectURL(blob));
	}
};

/*
	componentDidMount = () => {
		this.worker = new WebWorker(worker);

	}
*/