import { observer } from "mobx-react-lite";
import { OverviewView } from "../views/overviewView.jsx";

const Overview = observer(function OverviewRender(props) {
    const state = props.model.currentTasksPromiseState;
    const promiseIsResolvedWithoutErrors = state.data && !state.error;
    if (promiseIsResolvedWithoutErrors) {
        return <OverviewView tasksData={state.data} />;
    }
});

export { Overview };
