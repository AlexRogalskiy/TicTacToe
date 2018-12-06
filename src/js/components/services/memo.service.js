import React, { useMemo } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function computeExpensiveValue() {
  // do expensive computing
}
function App({ a, b }) {
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  return <span>{memoizedValue}</span>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
