import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import theme from "./theme";
import { resetInMemoryData } from "./mocks/data-storage/inMemoryData";

const prepare = () => {
  // Setup mock server before rendering React components
  if (process.env.NODE_ENV === "development") {
    const { worker } = require("./mocks/env/browser");
    return worker.start().then(() => resetInMemoryData());
  }
  return Promise.resolve();
};

prepare().then(() => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <App />
    </ThemeProvider>,
    document.querySelector("#root")
  );
});
