import { observer } from "mobx-react-lite";
import { TestView } from "../views/Testview";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { OverviewView } from "../views/overviewView";
import { Login } from "./loginPresenter";

function makeRouter(model){
    return createHashRouter([
        {
            path: "/",
            element: <Login model = {model}/>,
            //element: <OverviewView />,
            //element: <TestView></TestView>
        },
    ]);
}


const ReactRoot = observer(function ReactRoot(props) {
    return <RouterProvider router={makeRouter(props.model)} />;
});


export { ReactRoot };
