import { observer } from "mobx-react-lite";
import { TimerView } from "../views/timerView.jsx";
import { useEffect } from "react";

const Timer = observer(function RenderTimer(props) {
    useEffect(() => {
            if (props.model.accessToken && !props.model.currentTasksPromiseState.promise) {
                props.model.getTasks();
            }
    }, [props.model.accessToken,props.model.user]);
    
    const state = props.model.currentTasksPromiseState;
    const flattenedTasks = state.data ? state.data.flat() : [];
    

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
