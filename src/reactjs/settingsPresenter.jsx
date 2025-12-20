import { observer } from "mobx-react-lite";
import { SettingsView } from "../views/settingsView.jsx";
import { getCourseNames } from "../utilities.js";
import { SuspenseView } from "../views/suspenseView.jsx";

const Settings = observer(function SettingsRender(props) {
    if (!props.model.user || !props.model.ready) {
        return <SuspenseView />;
    }

    return (
        <SettingsView user={props.model.user} courses={props.model.courses} />
    );
});

export { Settings };
