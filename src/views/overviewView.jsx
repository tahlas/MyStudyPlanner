import { PieChart } from "@mui/x-charts/PieChart";
import { Button } from "@mui/material";
import "/src/style.css";
import "/src/utilities.js";
import AddTaskModal from "./components/addTaskModal.jsx";
import CompleteTaskModal from "./components/completeTaskModal.jsx";
import { useState } from 'react';

//should not be used in final version
import { taskConstants } from "../taskConstants";
import { numberOfTasksPerList } from "../utilities.js";

/**
 * Renders the Overview View component.
 * @returns the Overview View JSX element
 */
export function OverviewView(props) {
    const [showCompleteTaskModal, setShowCompleteTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    function  onTaskSelectACB(task) {
        setSelectedTask(task);
        setShowCompleteTaskModal(true);
    }

    return (
        <div>
            <div>{topBar(props.tasksData, props.newTask, props.newCourse)}</div>
            <div className="flexParent">
                {todaysOverview(props.tasksData,onTaskSelectACB)}
                {upcomingOverview(props.tasksData,onTaskSelectACB)}
            </div>
            {showCompleteTaskModal && (
                <CompleteTaskModal
                    task={selectedTask}
                    onClose={() => setShowCompleteTaskModal(false)}
                    onCompleteTask = {props.completeTask}
                />
            )}
        </div>
    );
}

function topBar(tasksData,newTask,newCourse) {
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showCourseModal, setShowCourseModal] = useState(false);
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
            <button
                onClick={() => setShowTaskModal(true)}
                className="bg-violet-600 text-white px-6 py-3 rounded-md font-bold hover:bg-indigo-700">
                Add Task
            </button>
            {showTaskModal && (
                <AddTaskModal
                    onClose={() => setShowTaskModal(false)}
                    onNewTask = {newTask}
                />
            )}

            <button
                onClick={() => setShowCourseModal(true)}
                className="bg-violet-600 text-white px-6 py-3 rounded-md font-bold hover:bg-indigo-700">
                Add Course
            </button>
            {showCourseModal && (
                <AddCourseModal
                    onClose={() => setShowCourseModal(false)}
                    onNewCourse = {newCourse}
                />
            )}

        </div>
    );
}

function todaysOverview(tasksData, onTaskSelect) {

    function renderTaskWithSelectACB(task) {
        return renderTaskCB(task, onTaskSelect);
    }

    return (
        <div>
            <div style={{ color: "white" }}>Today</div>
            <div>
                {tasksData.filter(taskIsDueTodayCB).map(renderTaskWithSelectACB)}
            </div>
        </div>
    );
}

function upcomingOverview(tasksData, onTaskSelect) {
    const overdueTasks = tasksData.filter(taskIsOverdueCB);
    const dueTodayTasks = tasksData.filter(taskIsDueTodayCB);
    const dueTomorrowTasks = tasksData.filter(taskIsDueTomorrowCB);
    const dueNextWeek = tasksData.filter(taskIsDueNextWeekAndNotTomorrowCB);

    function renderTaskWithSelectACB(task) {
        return renderTaskCB(task, onTaskSelect);
    }

    return (
        <div>
            <div hidden={overdueTasks.length === 0} style={{ color: "red" }}>
                Overdue
            </div>
            {overdueTasks.map(renderTaskWithSelectACB)}
            <div
                hidden={dueTodayTasks.length === 0}
                style={{ color: "orange" }}
            >
                Due Today
            </div>
            {dueTodayTasks.map(renderTaskWithSelectACB)}
            <div
                hidden={dueTomorrowTasks.length === 0}
                style={{ color: "yellow" }}
            >
                Due Tomorrow
            </div>
            {dueTomorrowTasks.map(renderTaskWithSelectACB)}
            <div style={{ color: "white" }} hidden={dueNextWeek.length === 0}>
                Due Next Week
            </div>
            {dueNextWeek.map(renderTaskWithSelectACB)}
        </div>
    );
}

function renderTaskCB(task, onTaskSelect) {
    return (
        <div
            key={task.id}
            className="overviewTask  font-semibold"
            style={{ backgroundColor: "#4bbfe3", cursor: "pointer" }}
            onClick={function() { onTaskSelect(task); }}
        >
            {task.listTitle} <br />
            {task.title} <br />
            {task.notes} <br />

            {/* {new Date(task.due).toString()} <br /> */}
        </div>
    );
}

//TODO: DUPLICATED CODE?
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
