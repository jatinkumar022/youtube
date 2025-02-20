import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style/index.css";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/store";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
        <App />
      </div>
    </Provider>
  </BrowserRouter>
);
