import { observer } from "mobx-react-lite";
import { CalendarView } from "../views/calendarView.jsx";
import { useEffect } from "react";

const Calendar = observer(function CalendarRender(props) {
    useEffect(() => {
        if (props.model.accessToken && !props.model.currentTasksPromiseState.promise) {
            props.model.getTasks();
        }
    }, [props.model.accessToken, props.model.user]);

    const state = props.model.currentTasksPromiseState;
    const flattenedTasks = state.data ? state.data.flat() : [];
    const tasksWithColors = flattenedTasks.map((task) => ({
        ...task,
        color: props.model.getCourseColor(task.listTitle),
    }));

    return (
        <CalendarView tasksData={tasksWithColors} />
    );
});

export { Calendar };
