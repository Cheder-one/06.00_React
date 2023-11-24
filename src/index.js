import { createRoot } from "react-dom/client";

import "./styles/styles.scss";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
