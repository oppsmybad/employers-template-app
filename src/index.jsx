import { createRoot } from "react-dom/client";
import App from "./components/app/app";

// import scss file
// WARNING! download sass module to use scss
import "./index.scss";

// import styled-css (from app.jsx)
// import { Button } from "./components/app/app";
import styled from "styled-components";

// if you want change styles for your button:

// changed css styles (styled-css)
// const BigButton = styled(Button)`
//     /* BigButton inherits (Button) from app.jsx*/
//     margin: 25px auto 0 auto;
//     width: 245px;
//     height: 45px;
// `;

// const BigButtonLink = styled(BigButton)`
//     /* BigButtonLink inherits (BigButton) */
//     text-align: center;
// `;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <>
        <App />
        {/* // use our BigButton with special styles */}
        {/* <BigButton>+++</BigButton> */}
        {/* // also we can change tag for BigButtonLink < as = "a" > */}
        {/* <BigButtonLink as="a">Отправить Отчет</BigButtonLink> */}
    </>
);
