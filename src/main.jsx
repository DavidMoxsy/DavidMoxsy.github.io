import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/components/app/App";
import { BrowserRouter } from "react-router-dom";

// styles
import "./App.scss";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
