import { createElement, Fragment } from "react";
import { createRoot } from "react-dom/client";
import { reactiveModel } from "../mobxReactiveModel";
import { ReactRoot } from "./ReactRoot";

window.React = { createElement: createElement, Fragment: Fragment }; // needed in the lab because it works with both React and Vue

<ReactRoot>model= {reactiveModel}</ReactRoot>;

// mount the app in the browser page. Test at http://localhost:8080/react.html
createRoot(document.getElementById("root")).render(
    <ReactRoot model={reactiveModel} />
);
