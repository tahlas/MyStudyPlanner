import { observer } from "mobx-react-lite";
import { WeeklyTimeView } from "../views/statisticsView.jsx";
import { useEffect } from "react";
import { SuspenseView } from "../views/suspenseView.jsx";

const Statistics = observer(function StatisticsRender(props) {
    useEffect(() => {
        if (props.model.accessToken && !props.model.currentTasksPromiseState.promise) {
            props.model.getTasks();
        }
    }, [props.model.accessToken, props.model.user]);

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