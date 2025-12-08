import { observer } from "mobx-react-lite";
import { OverviewView } from "../views/overviewView.jsx";

const Overview = observer(function OverviewRender(props) {
    const state = props.model.currentTasksPromiseState;
    const promiseIsResolvedWithoutErrors = state.data && !state.error;
    if (promiseIsResolvedWithoutErrors) {
        // Flatten the array of arrays into a single array of tasks
        const flattenedTasks = state.data.flat();
        return <OverviewView tasksData={flattenedTasks} />;
    }
    // Temporary loading state
    return <div style={{ color: "red" }}>Loading...</div>;
});

export { Overview };
