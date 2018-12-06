import React, { Component } from "react";
import { render } from "react-dom";
const JediContext = React.createContext();

class JediProvider extends Component {
  state = {
    name: "Vader",
    side: "dark"
  };
  render() {
    return (
      <JediContext.Provider
        value={{
          state: this.state,
          turnGood: () =>
            this.setState({
              side: "good"
            })
        }}
      >
        {this.props.children}
      </JediContext.Provider>
    );
  }
}

class App extends Component {
  render() {
    return (
      <JediProvider>
        <Vader />
      </JediProvider>
    );
  }
}

const Vader = props => {
  return <Luke />;
};
const Luke = props => {
  return <KyloRen />;
};

const KyloRen = props => {
  return (
    <JediContext.Consumer>
      {context => (
        <React.Fragment>
          <p>My grandfather is {context.state.name} </p>
          <p>He belonged to the {context.state.side} side</p>
          <button onClick={context.turnGood}>Turn</button>
        </React.Fragment>
      )}
    </JediContext.Consumer>
  );
};

render(<App />, document.getElementById("root"));
