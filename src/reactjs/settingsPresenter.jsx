import { observer } from "mobx-react-lite";
import { SettingsView } from "../views/settingsView.jsx";
import { getCourseNames } from "../utilities.js";

const Settings = observer(function SettingsRender(props) {

    return (
        <SettingsView user={props.model.user} courses={props.model.courses} />
    );
});

export { Settings };
