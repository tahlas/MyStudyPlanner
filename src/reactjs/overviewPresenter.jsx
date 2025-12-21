
import { observer } from "mobx-react-lite";
import { OverviewView } from "../views/overviewView.jsx";
import { useEffect } from "react";
import { logout } from "../authModel.js";
import { SuspenseView } from "../views/suspenseView.jsx";
import { getCourseColor } from "../utilities.js";
import { getCourseNames } from "../utilities.js";

const Overview = observer(function OverviewRender(props) {
    useEffect(() => {
        if (
            props.model.user &&
            props.model.accessToken &&
            props.model.ready &&
            !props.model.currentTasksPromiseState.promise
        ) {
            props.model.getTasks();
        }
    }, [props.model.accessToken, props.model.user, props.model.ready]);

    useEffect(() => {
        if (
            props.model.currentTasksPromiseState.error &&
            props.model.currentTasksPromiseState.error.status === 401
        ) {
            logout(props.model).then(() => (window.location.hash = "#/login"));
        }
    }, [props.model.accessToken, props.model.user, props.model.ready]);

    useEffect(() => {
        if (
            props.model.accessToken &&
            !props.model.currentCalendarEventsPromiseState.promise
        ) {
            props.model.getCalendarEvents();
        }
    }, [props.model.accessToken, props.model.user]);

    const taskState = props.model.currentTasksPromiseState;
    const eventState = props.model.currentCalendarEventsPromiseState;

    if (taskState.data && eventState.data) {
        // Flatten the array of arrays into a single array of tasks
        const flattenedTasks = taskState.data.flat();
        const flattenedEvents = eventState.data.flat();

        return (
            <OverviewView
                tasksData={flattenedTasks}
                newTask={handleNewTaskACB}
                completeTask={handleCompleteTaskACB}
                newCourse={handleNewCourse}
                courseNames={getCourseNames(props.model.courses)}
                eventsData={flattenedEvents}
            />
        );
    }
    //TODO: There are two states here, we should show loading/error for both
    return <SuspenseView promise={taskState.promise} error={taskState.error} />;

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
