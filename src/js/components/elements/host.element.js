'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Elements, Stylesheets } from 'app-root/libs/elements.lib';

// @flow
type Props = {
	style?: Object<any>,
	code?: string,
	children?: Node
};
type State = {
	html?: string,
	error?: string
};

export default class HostElement extends Component<Props, State> {
  displayName: string = 'HostElement';

  view: ?HTMLElement;

  state: State = {
    html: null,
	error: null
  };
	
  static defaultProps: Props = {
	className: 'simulator',
	code: null
  };
   
  componentDidMount(): void {
    this.evalCode();
  }

  componentDidUpdate(prevProps: object): void {
    if (prevProps.code !== this.props.code) {
      this.evalCode();
    }
  }

  evalCode(): void {
	let code = this.props.code || '';
	let className = code.match(/class ([A-Z]\w+) extends React/);
	try {
	  className = className && className[1];
	  if (!className) {
		throw new Error(
		  'Could not find React component. Make sure your code has\n\n' +
		  'class Example extends React.Component'
		);
	  }
	  code += `\nReact.renderToStaticMarkup(<${className} />);`
	  //code = JSXTransformer.transform(code).code;
	  this.setState({
		html: code,
		error: null,
	  });
	} catch(error) {
	  this.setState({error: error});
	}
  }

  render(): Node {
	if (!this.state.error) {
      return (
        <Elements.View
		  ref={view => (this.view = view)}
          className="display"
          
          dangerouslySetInnerHTML={{__html: this.state.html}}
        />
      )
    }
    return (
      <Elements.View
	    ref={view => (this.view = view)}
        className="error"
        style={[styles.takeAllSpace, styles.error, this.props.style]}>
        {this.state.error.message}
      </Elements.View>
	);
  }
};

const styles = Stylesheets.create({
  innerFrame: {
    paddingTop: 20
  },
  takeAllSpace: {
    display: 'flex',
    flex: 1
  },
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    color: 'red',
    whiteSpace: 'pre-wrap'
  }
});