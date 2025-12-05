import { PieChart } from "@mui/x-charts/PieChart";
import "/src/style.css";
import "/src/utilities.js";

//should not be used in final version
import { taskConstants } from "../taskConstants";

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
    //TODO: ADD LOGIC THAT COUNTS THE NUMBER OF TASKS PER COURSE 
    // AND DISPLAYS IT IN THE DONUT CHART
    const data = [
        { label: "Group A", value: 400, color: "#0088FE" },
        { label: "Group B", value: 300, color: "#00C49F" },
        { label: "Group C", value: 300, color: "#FFBB28" },
        { label: "Group D", value: 200, color: "#FF8042" },
    ];

    const settings = {
        margin: { right: 5 },
        width: 200,
        height: 200,
        hideLegend: true,
    };

    return (
        <div className="overviewTopBar">
            <PieChart
                series={[
                    {
                        innerRadius: 50,
                        outerRadius: 55,
                        data,
                    },
                ]}
                {...settings}
            />
            <div className="textInDonut">{taskConstants.length}</div>
        </div>
    );
}

function todaysOverview() {
    return (
        <div>
            <div style={{ color: "white" }}>Today</div>
            <div>
                {taskConstants.filter(taskIsDueTodayCB).map(renderTaskCB)}
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
    if (taskIsDueTomorrowCB(task)) {
        return false;
    }
    return taskDueWeek === currentWeek + 1;
}
