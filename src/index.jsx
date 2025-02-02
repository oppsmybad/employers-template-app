import { createRoot } from "react-dom/client";
import App from "./components/app/app";

// import scss file
// WARNING! download sass module to use scss
import "./index.scss";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
