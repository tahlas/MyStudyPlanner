// TODO make a reactive model (application state), pass it as prop to the components used
import {createRoot} from "react-dom/client";
const mountedApp= createRoot(document.getElementById('root'))
mountedApp.render(<div>hello world!</div>);  