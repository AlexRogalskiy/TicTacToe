/*import { createServer } from "http";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

import AppRouter from 'routers/app.router';

createServer((req, res) => {
  const context = {};

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url
    });
    res.end();
  } else {
    res.write(`
      <!doctype html>
      <div id="app">${html}</div>
    `);
    res.end();
  }
}).listen(3000);


const context = {};
const serverRender = (MainComponent: React.ComponentType<{}>, { url, context }): void =>
	ReactDOMServer.renderToString(
		<StaticRouter location={url} context={context}>
			<MainComponent />
		</StaticRouter>
	);
);
serverRender(AppRouter, { url: req.url, context });
if (context.url) {
  redirect(301, context.url);
  redirect(context.status, context.url);
} else {
}


import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);*/