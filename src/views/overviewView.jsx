import { PieChart } from "@mui/x-charts/PieChart";
import { Button } from "@mui/material";
import "/src/style.css";
import "/src/utilities.js";

//should not be used in final version
import { taskConstants } from "../taskConstants";

/**
 * Renders the Overview View component.
 * @returns the Overview View JSX element
 */
export function OverviewView(props) {
    return (
        <div>
            <div>{topBar(props.tasksData)}</div>
            <div className="flexParent">
                {todaysOverview(props.tasksData)}
                {upcomingOverview(props.tasksData)}
            </div>
        </div>
    );
}

function topBar(tasksData) {
    //TODO: ADD LOGIC THAT COUNTS THE NUMBER OF TASKS PER COURSE 
    // AND DISPLAYS IT IN THE DONUT CHART
    const data = [
        { label: "Group A", value: 400, color: "#0088FE" },
        { label: "Group B", value: 300, color: "#00C49F" },
        { label: "Group C", value: 300, color: "#FFBB28" },
        { label: "Group D", value: 200, color: "#FF8042" },
    ];

    const settings = {
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
            <div className="textInDonut">{tasksData.length}</div>
            {/* This button is in the wrong position! It should be in the top bar! */}
            {/* <Button variant="contained">Add Task</Button> */}
        </div>
    );
}

function todaysOverview(tasksData) {
    return (
        <div>
            <div style={{ color: "white" }}>Today</div>
            <div>
                {tasksData.filter(taskIsDueTodayCB).map(renderTaskCB)}
            </div>
        </div>
    );
}

function upcomingOverview(tasksData) {
    const overdueTasks = tasksData.filter(taskIsOverdueCB);
    const dueTodayTasks = tasksData.filter(taskIsDueTodayCB);
    const dueTomorrowTasks = tasksData.filter(taskIsDueTomorrowCB);
    const dueNextWeek = tasksData.filter(taskIsDueNextWeekAndNotTomorrowCB);

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
            {new Date(task.due).toString()} <br />
        </div>
    );
}

function taskIsOverdueCB(task) {
    const currentDate = new Date();
    const taskDueDate = new Date(task.due);
    // console.log("Current Date: ", currentDate);
    // console.log("Task Due Date: ", taskDueDate);
    //Getting/setting the due time is not supported by the Google Tasks API :(
    // console.log("Current Date Time: ", currentDate.getTime());
    // console.log("Task Due Date Time: ", taskDueDate.getTime());

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
