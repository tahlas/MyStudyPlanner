import { observer } from "mobx-react-lite";
import { SettingsView } from "../views/settingsView.jsx";
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
            newCourse={handleNewCourse}
            editCourse={handleEditCourse}
            deleteCourse={handleDeleteCourse}
            // onUpdateCourseName={handleUpdateCourseNameACB}
        />
    );

    function handleLogoutACB() {
        logout(props.model).then(() => {
            window.location.hash = "#/login";
        });
    }

    function handleNewCourse(course) {
        props.model.newCourse(course);
    }

    function handleEditCourse(oldName, newName, newColor) {
        props.model.updateCourse(oldName, newName, newColor);
    }

    function handleDeleteCourse(courseName) {
        props.model.deleteCourse(courseName);
    }
});

export { Settings };
