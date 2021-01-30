import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import theme from "./theme";
import { resetMockDataStore } from "./mock-server/data-storage/mockDataStore";

const prepare = () => {
  // Setup mock server before rendering React components
  if (process.env.NODE_ENV === "development") {
    const { worker } = require("./mock-server/env/browser");
    return worker.start();
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
