import { observer } from "mobx-react-lite";
import { OverviewView } from "../views/overviewView.jsx";

const Overview = observer(function OverviewRender(props) {
    // Only fetch tasks if model is ready and we haven't already fetched
    if (props.model.ready && !props.model.currentTasksPromiseState.promise) {
        props.model.getTasks();
    }
    
    const state = props.model.currentTasksPromiseState;
    
    if (state.error) {
        return <div style={{ color: "red" }}>Error: {state.error.message}</div>;
    }
    
    if (state.data) {
        // Flatten the array of arrays into a single array of tasks
        const flattenedTasks = state.data.flat();
        return <OverviewView tasksData={flattenedTasks} />;
    }
    
    // Temporary loading state
    return <div style={{ color: "red" }}>Loading...</div>;
});

export { Overview };
