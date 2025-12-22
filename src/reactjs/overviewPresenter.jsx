import { observer } from "mobx-react-lite";
import { OverviewView } from "../views/overviewView.jsx";
import { useEffect } from "react";
import { logout } from "../authModel.js";
import { SuspenseView } from "../views/suspenseView.jsx";
import { getCourseNames } from "../utilities.js";
import { use401Redirect, useFetchCalendarEvents, useFetchTasks } from "../modelEffects.js";

const Overview = observer(function OverviewRender(props) {

    use401Redirect(props.model);

    useFetchTasks(props.model);

    useFetchCalendarEvents(props.model);


    useEffect(() => {
        if (
            props.model.currentTasksPromiseState.error &&
            props.model.currentTasksPromiseState.error.status === 401
        ) {
            logout(props.model).then(() => (window.location.hash = "#/login"));
        }
    }, [props.model.accessToken, props.model.user, props.model.ready]);


    const taskState = props.model.currentTasksPromiseState;
    const eventState = props.model.currentCalendarEventsPromiseState;

    if (taskState.data && eventState.data) {
        // Flatten the array of arrays into a single array of tasks
        const flattenedTasks = taskState.data.flat();

        return (
            <OverviewView
                tasksData={flattenedTasks}
                newTask={handleNewTaskACB}
                completeTask={handleCompleteTaskACB}
                newCourse={handleNewCourse}
                courseNames={getCourseNames(props.model.courses)}
                eventsData={eventState.data}
            />
        );
    }


    return <SuspenseView
        taskPromise={taskState.promise}
        taskError={taskState.error}
        taskData={taskState.data}
        eventPromise={eventState.promise}
        eventError={eventState.error}
        eventData={eventState.data}
    />;

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
