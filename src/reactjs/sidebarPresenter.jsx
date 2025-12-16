import { observer } from "mobx-react-lite";
import { SidebarView } from "../views/sidebarView.jsx";
import { logout } from "../authModel.js";

const Sidebar = observer(function SidebarRender(props) {
    function handleLogoutACB() {
        logout(props.model).then(() => {
            window.location.hash = "#/login";
        });
    }

    return <SidebarView onLogout={handleLogoutACB} />;
});

export { Sidebar };