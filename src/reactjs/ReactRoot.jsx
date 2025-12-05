import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { OverviewView } from "../views/overviewView";
import { Login } from "./loginPresenter";

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
            element: <OverviewView />,
        },
        {
            path: "/timer",
            element: <TimerView model={model} />,
        }
    ]);
}

export { ReactRoot };
