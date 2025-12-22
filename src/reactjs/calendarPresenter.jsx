import { observer } from "mobx-react-lite";
import { CalendarView } from "../views/calendarView.jsx";
import { getCourseNames } from "../utilities.js";
import { SuspenseView } from "../views/suspenseView.jsx";
import { use401Redirect, useFetchCalendarEvents, useFetchTasks } from "../modelEffects.js";


const Calendar = observer(function CalendarRender(props) {

    use401Redirect(props.model);

    useFetchTasks(props.model);

    useFetchCalendarEvents(props.model);

    const state = props.model.currentTasksPromiseState;
    const flattenedTasks = state.data ? state.data.flat() : [];


    if(state.data && props.model.currentCalendarEventsPromiseState.data) {

    return (
        <CalendarView
            tasksData={flattenedTasks}
            eventsData={props.model.currentCalendarEventsPromiseState}
            courseNames={getCourseNames(props.model.courses)}
            newEvent={handleNewEventACB}
            deleteEvent = {handleDeleteEvent}
            repeatOptions={["Daily", "Weekly", "Monthly"]}
            eventsTrigger={Array.from(
                props.model.currentCalendarEventsPromiseState?.data ?? [],
            )}
            eventTypeOptions = {["Class", "Exam"]}
            deleteOptions={["This Event", "All events"]}
        />
    );
    }

   return  <SuspenseView
        taskPromise={state.promise}
        taskError={state.error}
        taskData={state.data}
        eventPromise={props.model.currentCalendarEventsPromiseState.promise}
        eventError={props.model.currentCalendarEventsPromiseState.error}
        eventData={props.model.currentCalendarEventsPromiseState.data}
    />


    function handleNewEventACB(event) {
        props.model.saveNewEvent(event);
    }

   function handleDeleteEvent(event, deleteOption){
        props.model.deleteEvent(event, deleteOption);
    }
});

export { Calendar };
