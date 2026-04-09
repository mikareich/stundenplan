import { StrictMode } from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

const container = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
