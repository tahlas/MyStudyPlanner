import { observer } from "mobx-react-lite";
import { TestView } from "../views/Testview";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { OverviewView } from "../views/overviewView";
import { LoginView } from "../views/loginView";
const ReactRoot = observer(function ReactRoot(props) {
    return <RouterProvider router={makeRouter()} />;
});

function makeRouter() {
    return createHashRouter([
        {
            path: "/login",
            element: <LoginView />,
            //element: <OverviewView />,
            //element: <TestView></TestView>
        },
        {
            path: "/overview",
            element: <OverviewView />,
        },
    ]);
}

export { ReactRoot };
