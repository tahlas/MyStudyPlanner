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

    return (
        <CalendarView tasksData={flattenedTasks} />
    );
});

export { Calendar };
