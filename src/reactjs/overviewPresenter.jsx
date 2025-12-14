import { observer } from "mobx-react-lite";
import { OverviewView } from "../views/overviewView.jsx";
import { useEffect } from "react";


const Overview = observer(function OverviewRender(props) {

    useEffect(() => {
        if (props.model.accessToken && !props.model.currentTasksPromiseState.promise) {
            props.model.getTasks();
        }
    }, [props.model.accessToken,props.model.user]);

    useEffect(() => {
        if (props.model.currentTasksPromiseState.error && props.model.currentTasksPromiseState.error.status === 401) {
            props.model.currentTasksPromiseState = {}
            window.location.hash = "#/login";
        }
    },[props.model.currentTasksPromiseState.error]);

    const state = props.model.currentTasksPromiseState;


    if (state.data) {
        // Flatten the array of arrays into a single array of tasks
        const flattenedTasks = state.data.flat();
        return <OverviewView tasksData={flattenedTasks} />;
    }

    // Temporary loading state
    return <div style={{ color: "red" }}>Loading...</div>;
});

export { Overview };
