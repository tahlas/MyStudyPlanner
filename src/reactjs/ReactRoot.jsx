import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Overview } from "./overviewPresenter";
import { Login } from "./loginPresenter";
import { Timer } from "./timerPresenter";

const ReactRoot = observer(function ReactRoot(props) {
    return <RouterProvider router={makeRouter(props.model)} />;
});

function makeRouter(model){
    return createHashRouter([
        {
            path: "/",
            element: <Login model = {model}/>,
        },
        
        {
            path: "/login",
            element: <Login model = {model}/>,
        },

        {
            path: "/overview",
            element: <Overview model = {model}/>,
        },
        {
            path: "/timer",
            element: <Timer model={model} />,
        }
    ]);
}

export { ReactRoot };
