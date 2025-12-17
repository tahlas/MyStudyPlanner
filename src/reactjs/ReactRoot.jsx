import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";
import { Overview } from "./overviewPresenter";
import { Login } from "./loginPresenter";
import { Timer } from "./timerPresenter";
import { Sidebar } from "./sidebarPresenter.jsx";

const ReactRoot = observer(function ReactRoot(props) {
    return <RouterProvider router={makeRouter(props.model)} />;
});

function Layout(props) {
    const location = window.location.hash;
    const isLoginPage = location === "#/login" || location === "#/";
    return (
        <div className="flexParent">
            <div className="sidebarContent">
                {/* If left is true, return right, else return false */}
                {!isLoginPage && <Sidebar model={props.model} />}
            </div>
            <div className="mainContent">
                <Outlet />
            </div>
        </div>
    );
}

function makeRouter(model) {
    return createHashRouter([
        {
            element: <Layout model={model} />,
            children: [
                {
                    path: "/",
                    element: <Login model={model} />,
                },

                {
                    path: "/login",
                    element: <Login model={model} />,
                },

                {
                    path: "/overview",
                    element: <Overview model={model} />,
                },
                {
                    path: "/timer",
                    element: <Timer model={model} />,
                },
            ],
        },
    ]);
}

export { ReactRoot };
