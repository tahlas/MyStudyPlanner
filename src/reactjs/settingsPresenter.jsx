import { observer } from "mobx-react-lite";
import { SettingsView } from "../views/settingsView.jsx";
import { getCourseNames } from "../utilities.js";
import { SuspenseView } from "../views/suspenseView.jsx";
import { logout } from "../authModel.js";

const Settings = observer(function SettingsRender(props) {
    if (!props.model.user || !props.model.ready) {
        return <SuspenseView />;
    }

    return (
        <SettingsView
            user={props.model.user}
            courses={props.model.courses}
            onLogout={handleLogoutACB}
            // onUpdateCourseName={handleUpdateCourseNameACB}
        />
    );

    function handleLogoutACB() {
        logout(props.model).then(() => {
            window.location.hash = "#/login";
        });
    }

    // function handleUpdateCourseNameACB(oldName, newName) {
    //     props.model.updateCourseName(oldName, newName);
    // }
});

export { Settings };
