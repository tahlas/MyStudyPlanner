import { observer } from "mobx-react-lite";
import { TimerView } from "../views/timerView.jsx";
import { useEffect } from "react";
import { SuspenseView } from "../views/suspenseView.jsx";
import { use401Redirect, useFetchTasks } from "../modelEffects.js";

const Timer = observer(function RenderTimer(props) {

    use401Redirect(props.model);

    useFetchTasks(props.model);

    const state = props.model.currentTasksPromiseState;
    const flattenedTasks = state.data ? state.data.flat() : [];


if(state.data) {
    return (
        <TimerView
            playingStatus={props.model.playingStatus}
            breakStatus={props.model.isBreak}
            timeLeftInSeconds={props.model.timeLeftInSeconds}
            defaultBreakTime={props.model.defaultBreakTimeInSeconds}
            defaultPomodoroSessionTimeInSeconds={props.model.defaultPomodoroSessionTimeInSeconds}
            onStatusChange={setPlayingStatusACB}
            onSkip={handleSkipACB}

            tasksData={flattenedTasks}

            selectedTask={props.model.selectedTask}
            onTaskSelect={handleTaskSelectACB}
            getTaskTimeSpent={getTaskTimeSpentACB}

        />
    );
}


    return <SuspenseView
        taskPromise={state.promise}
        taskError={state.error}
        taskData={state.data}
        // no events are used here
        eventPromise={true}
        eventError={false}
        eventData={true}
    />

    function handleSkipACB() {
        props.model.skipTimer();
    }

    function setPlayingStatusACB(status) {
        props.model.setPlayingStatus(status);
    }

    function handleTaskSelectACB(task) {
        props.model.selectTask(task);
    }

    function getTaskTimeSpentACB(taskId) {
        return props.model.getTaskTimeSpent(taskId);
    }
});

export { Timer };
