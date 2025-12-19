import { observer } from "mobx-react-lite";
import { OverviewView } from "../views/overviewView.jsx";
import { useEffect } from "react";
import { logout } from "../authModel.js";
import { SuspenseView } from "../views/suspenseView.jsx";

const Overview = observer(function OverviewRender(props) {
    useEffect(() => {
        if (
            props.model.accessToken &&
            !props.model.currentTasksPromiseState.promise
        ) {
            props.model.getTasks();
        }
    }, [props.model.accessToken, props.model.user]);

    useEffect(() => {
        if (
            props.model.currentTasksPromiseState.error &&
            props.model.currentTasksPromiseState.error.status === 401
        ) {
            logout(props.model).then(() => (window.location.hash = "#/login"));
        }
    }, [props.model.currentTasksPromiseState.error]);

    const state = props.model.currentTasksPromiseState;

    if (state.data) {
        // Flatten the array of arrays into a single array of tasks
        const flattenedTasks = state.data.flat();
        const tasksWithColors = flattenedTasks.map((task) => ({
            ...task,
            color: props.model.getCourseColor(task.listTitle),
        }));
        return (
            <OverviewView
                tasksData={tasksWithColors}
                newTask={handleNewTaskACB}
                completeTask={handleCompleteTaskACB}
                newCourse={handleNewCourse}
                courseNames={props.model.getCourseNames()}
            />
        );
    }

    return <SuspenseView promise={state.promise} error={state.error} />;

    function handleNewTaskACB(taskInfo) {
        props.model.saveNewTask(taskInfo);
    }

    function handleCompleteTaskACB(task) {
        props.model.markTaskAsCompleted(task);
    }

    function handleNewCourse(course) {
        props.model.newCourse(course);
    }
});

export { Overview };
