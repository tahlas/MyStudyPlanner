import { PieChart } from "@mui/x-charts/PieChart";
import { Button } from "@mui/material";
import "/src/style.css";
import "/src/utilities.js";
import AddTaskModal from "./components/addTaskModal.jsx";
import CompleteTaskModal from "./components/completeTaskModal.jsx";
import AddCourseModal from "./components/addCourseModal.jsx";
import { useState } from "react";

//should not be used in final version
import { taskConstants } from "../taskConstants";
import { numberOfTasksPerCourse } from "../utilities.js";

/**
 * Renders the Overview View component.
 * @returns the Overview View JSX element
 */
export function OverviewView(props) {
    const [showCompleteTaskModal, setShowCompleteTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    function onTaskSelectACB(task) {
        setSelectedTask(task);
        setShowCompleteTaskModal(true);
    }

    return (
        <div>
            <div>
                {topBar(
                    props.tasksData,
                    props.newTask,
                    props.courseNames,
                    props.newCourse,
                )}
            </div>
            <div className="flexParent">
                {todaysOverview(props.tasksData, onTaskSelectACB)}

                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            backgroundColor: "#1c8d77",
                        }}
                    >
                        {pieCharts(props.tasksData)}
                        {addTaskButton(props.newTask, props.courseNames)}
                    </div>
                    {upcomingOverview(props.tasksData, onTaskSelectACB)}
                </div>
            </div>
            {showCompleteTaskModal && (
                <CompleteTaskModal
                    task={selectedTask}
                    onClose={() => setShowCompleteTaskModal(false)}
                    onCompleteTask={props.completeTask}
                />
            )}
        </div>
    );
}

function addTaskButton(newTask, courseNames) {
    const [showTaskModal, setShowTaskModal] = useState(false);

    return (
        <>
            <button
                onClick={() => setShowTaskModal(true)}
                className="bg-white text-black px-3     py-2 rounded-md font-bold hover:bg-gray-200  transition duration-300"
            >
                Add Task
            </button>
            {showTaskModal && (
                <AddTaskModal
                    onClose={() => setShowTaskModal(false)}
                    onNewTask={newTask}
                    courseNames={courseNames}
                />
            )}
        </>
    );
}

function pieCharts(tasksData) {
    //TODO: ADD LOGIC THAT COUNTS THE NUMBER OF TASKS PER COURSE
    const data = numberOfTasksPerCourse(tasksData);

    const settings = {
        width: 150,
        height: 150,
        hideLegend: true,
    };

    return (
        <div style={{ position: "relative" }}>
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
        </div>
    );
}

function topBar(newCourse) {
    const [showCourseModal, setShowCourseModal] = useState(false);

    return (
        <div className="overviewTopBar">
            {/* This button is in the wrong position! It should be in the top bar! */}

            <button
                onClick={() => setShowCourseModal(true)}
                className="bg-violet-600 text-white px-6 py-3 rounded-md font-bold hover:bg-indigo-700"
            >
                Add Course
            </button>
            {showCourseModal && (
                <AddCourseModal
                    onClose={() => setShowCourseModal(false)}
                    onNewCourse={newCourse}
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
            <div style={{ color: "black" }}>Today</div>
            <div>
                {tasksData
                    .filter(taskIsDueTodayCB)
                    .map(renderTaskWithSelectACB)}
            </div>
        </div>
    );
}

function upcomingOverview(tasksData, onTaskSelect) {
    const overdueTasks = tasksData.filter(taskIsOverdueCB);
    const dueTodayTasks = tasksData.filter(taskIsDueTodayCB);
    const dueTomorrowTasks = tasksData.filter(taskIsDueTomorrowCB);
    const dueNextWeek = tasksData.filter(taskIsDueNextWeekAndNotTomorrowCB);
    const dueLaterTasks = tasksData.filter(taskIsDueAfterNextWeekAndLaterCB);

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
            <div style={{ color: "black" }} hidden={dueNextWeek.length === 0}>
                Due Next Week
            </div>
            {dueNextWeek.map(renderTaskWithSelectACB)}
            <div style={{ color: "black" }} hidden={dueLaterTasks.length === 0}>
                Due Later
            </div>
            {dueLaterTasks.map(renderTaskWithSelectACB)}
        </div>
    );
}

function renderTaskCB(task, onTaskSelect) {
    return (
        <div
            key={task.id}
            className="overviewTask  font-semibold"
            style={{ backgroundColor: task.color, cursor: "pointer" }}
            onClick={function () {
                onTaskSelect(task);
            }}
        >
            {task.listTitle} <br />
            {task.title} <br />
            {task.notes} <br />
            {/* {new Date(task.due).toString()} <br /> */}
        </div>
    );
}

function taskIsOverdueCB(task) {
    const currentDate = new Date();
    const taskDueDate = new Date(task.due);
    currentDate.setHours(0, 0, 0, 0);
    taskDueDate.setHours(0, 0, 0, 0);

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

//TODO: Might not work if the next week is in the next year.
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

function taskIsDueAfterNextWeekAndLaterCB(task) {
    if (
        taskIsDueTomorrowCB(task) ||
        taskIsDueNextWeekAndNotTomorrowCB(task) ||
        taskIsDueTodayCB(task) ||
        taskIsOverdueCB(task)
    ) {
        return false;
    }
    return true;
}
