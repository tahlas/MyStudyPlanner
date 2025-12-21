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

    useEffect(() => {
       if (props.model.accessToken && !props.model.currentCalendarEventsPromiseState.promise) {
           console.log("Calling getCalendarEvents");
            props.model.getCalendarEvents();
        }
    }, [props.model.accessToken, props.model.user ]);


    const state = props.model.currentTasksPromiseState;
    const flattenedTasks = state.data ? state.data.flat() : [];




    return (
        <CalendarView tasksData={flattenedTasks}  eventsData={props.model.currentCalendarEventsPromiseState} courseNames = {getCourseNames(props.model.courses)} newEvent = {handleNewEventACB}  repeatOptions = {[ "Daily", "Weekly", "Monthly"]}
                      eventsTrigger={Array.from(props.model.currentCalendarEventsPromiseState?.data ?? [])}
        />
    );

    function handleNewEventACB(event) {
        props.model.saveNewEvent(event);
    }

});



export { Calendar };
