import { PieChart, pieArcClasses } from "@mui/x-charts/PieChart";
import { Button } from "@mui/material";
import "/src/style.css";
import "/src/utilities.js";
import AddTaskModal from "./components/addTaskModal.jsx";
import CompleteTaskModal from "./components/completeTaskModal.jsx";
import AddCourseModal from "./components/addCourseModal.jsx";
import { useState } from "react";

//TODO:
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
            <div>{addCourse(props.newCourse)}</div>
            <div className="flexParent">
                <div>
                    <div style={{ backgroundColor: "#1e2939" }}>
                        {pieCharts(
                            props.tasksData.filter(taskIsDueTodayCB),
                            "Today",
                        )}
                    </div>
                    {todaysOverview(props.tasksData, onTaskSelectACB)}
                </div>

                <div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            backgroundColor: "#1e2939",
                        }}
                    >
                        {pieCharts(props.tasksData, "All Tasks")}
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
                className="bg-white text-black px-3 py-2 rounded-md font-bold filter hover:brightness-80  transition duration-300"
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

function pieCharts(tasksData, label) {
    const data = numberOfTasksPerCourse(tasksData);

    const settings = {
        width: 150,
        height: 150,
        hideLegend: true,
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div style={{ color: "white", marginBottom: "5px" }}>{label}</div>
            <div
                style={{
                    position: "relative",
                    width: "150px",
                    height: "150px",
                }}
            >
                <PieChart
                    series={[
                        {
                            innerRadius: 50,
                            outerRadius: 55,
                            data,
                        },
                    ]}
                    // TODO: Understand how this works...
                    sx={{
                        [`& .${pieArcClasses.root}`]: {
                            stroke: "none",
                        },
                    }}
                    {...settings}
                />
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontSize: "60px",
                    }}
                >
                    {tasksData.length}
                </div>
            </div>
        </div>
    );
}

function addCourse(newCourse) {
    const [showCourseModal, setShowCourseModal] = useState(false);

    return (
        <div>
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
        <div style={{ marginLeft: "10px" }}>
            <div style={{ color: "white" }}>Today</div>
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
            <div style={{ color: "white" }} hidden={dueNextWeek.length === 0}>
                Due Next Week
            </div>
            {dueNextWeek.map(renderTaskWithSelectACB)}
            <div style={{ color: "white" }} hidden={dueLaterTasks.length === 0}>
                Due Later
            </div>
            {dueLaterTasks.map(renderTaskWithSelectACB)}
        </div>
    );
}

function renderTaskCB(task, onTaskSelect) {
    const dueDateDay = new Date(task.due).getDate();
    const dueDateMonth = new Date(task.due).toLocaleString("default", {
        month: "short",
    });
    const notesExist = task.notes ? true : false;

    return (
        <div
            key={task.id}
            className="overviewTask pl-1 pr-1 pb-1 pt-1 mb-2"
            style={{ backgroundColor: task.color, cursor: "pointer", display:"flex", flexDirection:"row", justifyContent:"space-between" }}
            onClick={function () {
                onTaskSelect(task);
            }}
        >
            <div>
                <span className="font-semibold">{task.listTitle}</span>
                <br />
                <span className="font-medium">{task.title}</span> <br />
                {task.notes && (
                    <>
                        <span>{task.notes}</span> <br />
                    </>
                )}
            </div>
            <div className="pr-1">{dueDateMonth + " " + dueDateDay}</div>
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
