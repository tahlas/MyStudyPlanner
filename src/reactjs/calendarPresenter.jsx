import { observer } from "mobx-react-lite";
import { CalendarView } from "../views/calendarView.jsx";

const Calendar = observer(function CalendarRender(props) {
    const state = props.model.currentTasksPromiseState;
    const promiseIsResolvedWithoutErrors = state.data && !state.error;
    //if (promiseIsResolvedWithoutErrors)
    return (
        <CalendarView tasksData={props.model.currentTasksPromiseState.data} />
    );
});
