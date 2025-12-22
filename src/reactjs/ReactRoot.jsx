import { observer } from "mobx-react-lite";
import { createHashRouter, Outlet, RouterProvider, useLocation } from "react-router-dom";
import { Overview } from "./overviewPresenter";
import { Login } from "./loginPresenter";
import { Timer } from "./timerPresenter";
import { Sidebar } from "./sidebarPresenter.jsx";
import { Calendar } from "./calendarPresenter.jsx";
import { Settings } from "./settingsPresenter.jsx";
import { Statistics } from "./statisticsPresenter.jsx";

const ReactRoot = observer(function ReactRoot(props) {
    return <RouterProvider router={makeRouter(props.model)} />;
});

function Layout(props) {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login" || location.pathname === "/";
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
                    element: <Login model={model} />
                },

                {
                    path: "/login",
                    element: <Login model={model} />
                },

                {
                    path: "/overview",
                    element: <Overview model={model} />
                },
                {
                    path: "/timer",
                    element: <Timer model={model} />
                },
                {
                    path: "/calendar",
                    element: <Calendar model={model} />
                },
                {
                    path: "/statistics",
                    element: <Statistics model={model} />
                },
                {
                    path: "/settings",
                    element: <Settings model={model} />
                }
            ]
        }
    ]);
}

export { ReactRoot };
