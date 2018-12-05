'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import LoaderService from 'components/services/loader.service';
//react-loadable-visibility

/*Loadable.Map({
  loader: {
    Component: () => import('./my-component'),
    translations: () => fetch('./foo-translations.json').then(res => res.json()),
  },
  render(loaded, props) {
    let Component = loaded.Component.default;
    let translations = loaded.translations;
    return <Component {...props} translations={translations}/>;
  }
});*/

/* @flow */
type Props = {
	timedOut?: boolean;
	pastDelay?: boolean;
};
type State = {
	visible: boolean;
};

export default function LoadableWrapper<Props: {}>(SourceComponent: string, LoadingComponent: React.ComponentType<Props>): React.ComponentType<{}> {
	
  const LoadableComponent = LoaderService(SourceComponent, LoadingComponent);
  //const LoadableComponent = DefaultLoaderService({loader: () => import(SourceComponent)});
	
  return class extends Component<{}, State> {
	displayName: string = 'LoadableWrapper';
	
	state: State = {
		visible: true
	};

    render(): Node {
      return (
        (this.state.visible && <LoadableComponent ref={c => (this.component = c)} {...this.props} />)
      );
    }
  };
};

/*const LoadableMyComponent = Loadable({
  loader: () => import('./MyComponent'),
  loading: MyLoadingComponent,
});

class App extends React.Component {
  state = { showComponent: false };

  onClick = () => {
    this.setState({ showComponent: true });
  };

  onMouseOver = () => {
    LoadableMyComponent.preload();
  };

  render() {
    return (
      <div>
        <button onClick={this.onClick} onMouseOver={this.onMouseOver}>
          Show loadable component
        </button>
        {this.state.showComponent && <LoadableMyComponent/>}
      </div>
    )
  }
}*/