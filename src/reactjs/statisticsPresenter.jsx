import { observer } from "mobx-react-lite";
import { WeeklyTimeView } from "../views/statisticsView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import { use401Redirect, useFetchTasks } from "../modelEffects.js";

const Statistics = observer(function StatisticsRender(props) {

    use401Redirect(props.model);

    useFetchTasks(props.model);

    const state = props.model.currentTasksPromiseState;

    if (!state.data) {
        return <SuspenseView promise={state.promise} error={state.error} />;
    }

    const flattenedTasks = state.data.flat();

    return (
        <WeeklyTimeView
            tasksData={flattenedTasks}
            taskTimeByDate={props.model.taskTimeByDate}
        />
    );
});

export { Statistics };