import { observer } from "mobx-react-lite";
import { CalendarView } from "../views/calendarView.jsx";
import { useEffect } from "react";
import {getCourseNames} from "../utilities.js";

const Calendar = observer(function CalendarRender(props) {
    useEffect(() => {
        if (props.model.accessToken && !props.model.currentTasksPromiseState.promise) {
            props.model.getTasks();
        }
    }, [props.model.accessToken, props.model.user]);

    const state = props.model.currentTasksPromiseState;
    const flattenedTasks = state.data ? state.data.flat() : [];

    return (
        <CalendarView tasksData={flattenedTasks} courseNames = {getCourseNames(props.model.courses)} newEvent = {handleNewEventACB}  repeatOptions = {[ "Daily", "Weekly", "Monthly"]}
                      eventTypeOptions = {["Lecture", "Seminar", "Exam", "Lab", "Tutorial", "Presentation", "Study Session", "Group Work"]}
        />
    );

    function handleNewEventACB(event) {
        props.model.saveNewEvent(event);
    }

});



export { Calendar };
