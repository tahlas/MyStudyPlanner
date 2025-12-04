import Button from "@mui/material/Button";
import "/src/style.css";
//should not be used in final version
import { taskConstants } from "../taskConstants";
import "/src/utilities.js";

/**
 * Renders the Overview View component.
 * @returns the Overview View JSX element
 */
export function OverviewView() {
    return (
        <div>
            <div>{topBar()}</div>
            <div className="flexParent">
                {todaysOverview()}
                {upcomingOverview()}
            </div>
        </div>
    );
}

function topBar() {
    return <div className="overviewTopBar"></div>;
}

function todaysOverview() {
    return (
        <div>
            <div style={{ color: "white" }}>Today</div>
            <div>
                {taskConstants.filter(taskIsDueTodayCB).map(renderTaskCB)}
                {/* {taskConstants.map(renderTaskCB)} */}
            </div>
        </div>
    );
}

function upcomingOverview() {
    const overdueTasks = taskConstants.filter(taskIsOverdueCB);
    const dueTodayTasks = taskConstants.filter(taskIsDueTodayCB);
    const dueTomorrowTasks = taskConstants.filter(taskIsDueTomorrowCB);
    const dueNextWeek = taskConstants.filter(taskIsDueNextWeekAndNotTomorrowCB);

    return (
        <div>
            <div hidden={overdueTasks.length === 0} style={{ color: "red" }}>
                Overdue
            </div>
            {overdueTasks.map(renderTaskCB)}
            <div
                hidden={dueTodayTasks.length === 0}
                style={{ color: "orange" }}
            >
                Due Today
            </div>
            {dueTodayTasks.map(renderTaskCB)}
            <div
                hidden={dueTomorrowTasks.length === 0}
                style={{ color: "yellow" }}
            >
                Due Tomorrow
            </div>
            {dueTomorrowTasks.map(renderTaskCB)}
            <div style={{ color: "white" }} hidden={dueNextWeek.length === 0}>
                Due Next Week
            </div>
            {dueNextWeek.map(renderTaskCB)}
        </div>
    );
}

function renderTaskCB(task) {
    return (
        <div
            key={task.id}
            className="overviewTask"
            style={{ backgroundColor: "#4bbfe3" }}
        >
            Course Name <br />
            {task.title} <br />
            {task.description} <br />
        </div>
    );
}

function taskIsOverdueCB(task) {
    const currentDate = new Date();
    const taskDueDate = new Date(task.due);
    return taskDueDate < currentDate;
}

function taskIsDueTodayCB(task) {
    const currentDate = new Date();
    const taskDueDate = new Date(task.due);
    return (
        taskDueDate.getFullYear() === currentDate.getFullYear() &&
        taskDueDate.getMonth() === currentDate.getMonth() &&
        taskDueDate.getDate() === currentDate.getDate()
    );
}

function taskIsDueTomorrowCB(task) {
    const currentDate = new Date();
    const taskDueDate = new Date(task.due);
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    return (
        taskDueDate.getFullYear() === tomorrowDate.getFullYear() &&
        taskDueDate.getMonth() === tomorrowDate.getMonth() &&
        taskDueDate.getDate() === tomorrowDate.getDate()
    );
}

function taskIsDueNextWeekAndNotTomorrowCB(task) {
    const currentDate = new Date();
    const taskDueDate = new Date(task.due);
    const currentWeek = currentDate.getEuropeanWeek();
    const taskDueWeek = taskDueDate.getEuropeanWeek();
    if (!taskIsDueTomorrowCB(task)) {
        return false;
    }
    return taskDueWeek === currentWeek + 1;
}
