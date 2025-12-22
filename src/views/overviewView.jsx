import { PieChart, pieArcClasses } from "@mui/x-charts/PieChart";
import { Button } from "@mui/material";
import "/src/style.css";
import "/src/utilities.js";
import AddTaskModal from "./components/addTaskModal.jsx";
import CompleteTaskModal from "./components/completeTaskModal.jsx";
import { useState } from "react";
import {
    extractSummaryWithoutCourseNameAndEventType,
    numberOfTasksPerCourse,
} from "../utilities.js";
import { getWindowDimensions } from "../utilities.js";
import { isToday } from "../utilities.js";
import ItemCard from "./components/itemCard.jsx";

//TODO: Remove A LOT of code duplication!

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
    const windowWidth = getWindowDimensions().width;

    return (
        <div>
            {/* <div className="flexParent"> */}
            <div className="flex w-full">
                <div className="w-1/3">
                    <div
                        className="overviewHeader"
                    >
                        {renderPieChart(
                            props.eventsData.filter(classIsTodayCB),
                            "Events",
                        )}
                        {renderPieChart(
                            props.tasksData.filter(taskIsDueTodayCB),
                            "Tasks",
                        )}
                    </div>
                    {todaysOverview(
                        props.tasksData,
                        props.eventsData,
                        onTaskSelectACB,
                    )}
                </div>
                <div className="w-1/3">
                    <div
                        className="overviewHeader"
                    >
                        {renderPieChart(props.tasksData, "Tasks")}
                        {addTaskButton(props.newTask, props.courseNames)}
                    </div>
                    {upcomingOverview(props.tasksData, onTaskSelectACB)}
                </div>
                <div className="w-1/3">
                    <div
                        className="overviewHeader"
                    >
                        {renderPieChart(
                            props.eventsData.filter(eventIsExamCB),
                            "Exams",
                        )}
                        {/* TODO: Fix so adding exam from overview works */}
                        {/* {addExamButton()} */}
                    </div>
                    {examsOverview(props.eventsData)}
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

function todaysOverview(tasksData, eventsData, onTaskSelect) {
    //TODO: Should this be called ACB or CB?
    function renderTaskWithSelectACB(task) {
        return renderTaskCB(task, onTaskSelect);
    }
    const classesToday = eventsData.filter(classIsTodayCB);

    return (
        <div style={{ marginLeft: "10px" }}>
            <div style={{ color: "white" }}>Today</div>
            <div>
                {classesToday.map(renderClassCB)}
                {tasksData
                    .filter(taskIsDueTodayCB)
                    .map(renderTaskWithSelectACB)}
            </div>
        </div>
    );
}

function renderClassCB(classItem) {
    const classStartDate = new Date(
        classItem.start.dateTime || classItem.start.date,
    );
    const classEndDate = new Date(classItem.end.dateTime || classItem.end.date);
    const startHours = classStartDate.getHours().toString().padStart(2, "0");
    const startMinutes = classStartDate
        .getMinutes()
        .toString()
        .padStart(2, "0");
    const endHours = classEndDate.getHours().toString().padStart(2, "0");
    const endMinutes = classEndDate.getMinutes().toString().padStart(2, "0");

    return (
        <ItemCard
            key={classItem.id}
            item={classItem}
            title={classItem.courseName}
            subtitle={extractSummaryWithoutCourseNameAndEventType(classItem)}
            description={classItem.description}
            rightContent={
                startHours +
                ":" +
                startMinutes +
                " - " +
                endHours +
                ":" +
                endMinutes
            }
        />
    );
}

function classIsTodayCB(classItem) {
    //start.date is for all-day events, dateTime is for timed events
    const classStartDate = new Date(classItem.start.dateTime);
    return isToday(classStartDate);
}

function examsOverview(eventsData) {
    return (
        <div>
            <div style={{ color: "white" }}>Placeholder</div>
            <div>{eventsData.filter(eventIsExamCB).map(renderExamEventCB)}</div>
        </div>
    );
}

function eventIsExamCB(event) {
    return event.eventType === "Exam";
}

function renderExamEventCB(event) {
    const eventDate = new Date(event.start.dateTime);
    const eventDay = eventDate.getDate();
    const eventMonth = eventDate.toLocaleString("default", { month: "short" });

    return (
        <ItemCard
            key={event.id}
            item={event}
            title={event.courseName}
            subtitle={extractSummaryWithoutCourseNameAndEventType(event)}
            description={event.description}
            rightContent={eventMonth + " " + eventDay}
        />
    );
}

function renderPieChart(dataArray, label) {
    const data = numberOfTasksPerCourse(dataArray);

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
            <div
                style={{
                    position: "relative",
                    width: "150px",
                    height: "150px",
                }}
            >
                <PieChart
                    hidden={data.length === 0}
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
                        top: "45%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontSize: "60px",
                    }}
                >
                    {dataArray.length}
                </div>
                {/* TODO: Might be better to put this in the same div */}
                <div
                    style={{
                        color: "white",
                        position: "absolute",
                        top: "62%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: "12px",
                    }}
                >
                    {label}
                </div>
            </div>
        </div>
    );
}

function addTaskButton(newTask, courseNames) {
    const [showTaskModal, setShowTaskModal] = useState(false);

    return (
        <>
            <Button variant="contained" onClick={() => setShowTaskModal(true)}>
                Add Task
            </Button>
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

    return (
        <ItemCard
            key={task.id}
            item={task}
            title={task.listTitle}
            subtitle={task.title}
            description={task.notes}
            rightContent={dueDateMonth + " " + dueDateDay}
            onClick={function () {
                onTaskSelect(task);
            }}
        />
    );
}

//TODO: Remove code duplication
function taskIsOverdueCB(task) {
    const currentDate = new Date();
    const taskDueDate = new Date(task.due);
    currentDate.setHours(0, 0, 0, 0);
    taskDueDate.setHours(0, 0, 0, 0);

    return taskDueDate < currentDate;
}

function taskIsDueTodayCB(task) {
    const taskDueDate = new Date(task.due);
    return isToday(taskDueDate);
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
