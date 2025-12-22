import { pieArcClasses, PieChart } from "@mui/x-charts/PieChart";
import { Button } from "@mui/material";
import "/src/style.css";
import "/src/utilities.js";
import AddTaskModal from "./components/addTaskModal.jsx";
import CompleteTaskModal from "./components/completeTaskModal.jsx";
import DeleteEventModal from "./components/deleteEventModal.jsx";
import { useState } from "react";
import {
    isAfterNextWeekAndLater,
    extractSummaryWithoutCourseNameAndEventType,
    getWindowDimensions,
    isBeforeToday,
    isNextWeek,
    isLaterThisWeek,
    isToday,
    isTomorrow,
    numberOfTasksPerCourse,
} from "../utilities.js";
import ItemCard from "./components/itemCard.jsx";
import AddEventModal from "./components/addEventModal.jsx";

/**
 * Renders the Overview View component.
 * @returns the Overview View JSX element
 */
export function OverviewView(props) {
    const [showCompleteTaskModal, setShowCompleteTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showDeleteEventModal, setShowDeleteEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    function onTaskSelectACB(task) {
        setSelectedTask(task);
        setShowCompleteTaskModal(true);
    }

    function onEventSelectACB(event) {
        setSelectedEvent(event);
        setShowDeleteEventModal(true);
    }

    const windowWidth = getWindowDimensions().width;

    return (
        <div>
            {/* <div className="flexParent"> */}
            <div className="flex w-full">
                <div className="min-w-[280px] flex-1">
                    <div className="overviewHeader">
                        {renderPieChart(
                            props.eventsData.filter(classIsTodayCB),
                            "Classes",
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
                        onEventSelectACB,
                    )}
                </div>
                <div className="min-w-[280] flex-1">
                    <div className="overviewHeader">
                        {renderPieChart(props.tasksData, "Tasks")}
                        {addTaskButton(props.newTask, props.courseNames)}
                    </div>
                    {upcomingTasksOverview(props.tasksData, onTaskSelectACB)}
                </div>
                <div className="min-w-[280px] flex-1">
                    <div className="overviewHeader">
                        {renderPieChart(
                            props.eventsData.filter(eventIsExamCB),
                            "Exams",
                        )}
                        {  <Button variant="contained" color="primary" onClick={() => setShowAddEventModal(true)}>
                            Add Event
                        </Button>
                        }
                        {}
                    </div>
                    {/* {examsOverview(props.eventsData)} */}
                    {upcomingExamsOverview(props.eventsData, onEventSelectACB)}
                </div>
            </div>
            {showCompleteTaskModal && (
                <CompleteTaskModal
                    task={selectedTask}
                    onClose={() => setShowCompleteTaskModal(false)}
                    onCompleteTask={props.completeTask}
                />
            )}
            {showAddEventModal && (
                <AddEventModal
                    onClose={() => setShowAddEventModal(false)}
                    onNewEvent={props.newEvent}
                    courseNames={props.courseNames}
                    repeatOptions={props.repeatOptions}
                    eventTypeOptions={props.eventTypeOptions}
                />
            )}
            {showDeleteEventModal && (
                <DeleteEventModal
                    event={selectedEvent}
                    onClose={() => setShowDeleteEventModal(false)}
                    onDelete={(event, deleteType) => {
                        props.deleteEvent(event, deleteType);
                        setShowDeleteEventModal(false);
                    }}
                    deleteOptions={props.deleteOptions}
                />
            )}

        </div>
    );
}

function todaysOverview(tasksData, eventsData, onTaskSelect, onEventSelect) {
    function renderTaskWithSelectCB(task) {
        return renderTaskCB(task, onTaskSelect);
    }

    function renderEventWithSelectCB(event) {
        return renderClassCB(event, onEventSelect);
    }

    const classesToday = eventsData.filter(classIsTodayCB);

    return (
        <div style={{ marginLeft: "10px" }}>
            <div style={{ color: "white" }}>Today</div>
            <div>
                {classesToday.map(renderEventWithSelectCB)}
                {tasksData
                    .filter(taskIsDueTodayCB)
                    .map(renderTaskWithSelectCB)}
            </div>
        </div>
    );
}

function renderClassCB(classItem, onEventSelect) {
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
            onClick={function () {
                onEventSelect(classItem);
            }}
        />
    );
}

function classIsTodayCB(classItem) {
    //start.date is for all-day events, dateTime is for timed events
    const classStartDate = new Date(classItem.start.dateTime);
    return isToday(classStartDate);
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
                    // hidden={data.length === 0}
                    series={[
                        {
                            innerRadius: 50,
                            outerRadius: 55,
                            data:
                                data.length > 0
                                    ? data
                                    : [{ value: 1, color: "#797474ff" }],
                        },
                    ]}
                    slotProps={{
                        tooltip:
                            data.length > 0 ? undefined : { trigger: "none" },
                    }}
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

function upcomingTasksOverview(tasksData, onTaskSelect) {
    const overdueTasks = tasksData.filter(taskIsOverdueCB);
    const dueTodayTasks = tasksData.filter(taskIsDueTodayCB);
    const dueTomorrowTasks = tasksData.filter(taskIsDueTomorrowCB);
    const dueLaterThisWeek = tasksData.filter(taskIsDueLaterThisWeek);
    const dueNextWeek = tasksData.filter(taskIsDueNextWeek);
    const dueLaterTasks = tasksData.filter(taskIsDueAfterNextWeekAndLaterCB);

    return (
        <div>
            <div hidden={overdueTasks.length === 0} style={{ color: "red" }}>
                Overdue
            </div>
            {overdueTasks.map(renderTaskWithSelectCB)}
            <div
                hidden={dueTodayTasks.length === 0}
                style={{ color: "orange" }}
            >
                Due Today
            </div>
            {dueTodayTasks.map(renderTaskWithSelectCB)}
            <div
                hidden={dueTomorrowTasks.length === 0}
                style={{ color: "yellow" }}
            >
                Due Tomorrow
            </div>
            {dueTomorrowTasks.map(renderTaskWithSelectCB)}
            <div
                style={{ color: "white" }}
                hidden={dueLaterThisWeek.length === 0}
            >
                Due This Week
            </div>
            {dueLaterThisWeek.map(renderTaskWithSelectCB)}
            <div style={{ color: "white" }} hidden={dueNextWeek.length === 0}>
                Due Next Week
            </div>
            {dueNextWeek.map(renderTaskWithSelectCB)}
            <div style={{ color: "white" }} hidden={dueLaterTasks.length === 0}>
                Due Later
            </div>
            {dueLaterTasks.map(renderTaskWithSelectCB)}
        </div>
    );

    function renderTaskWithSelectCB(task) {
        return renderTaskCB(task, onTaskSelect);
    }
}
function renderItemCard(item, onSelect, isTask = true) {
    const date = isTask ? new Date(item.due) : new Date(item.start.dateTime);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });

    return (
        <ItemCard
            key={item.id}
            item={item}
            title={isTask ? item.listTitle : item.courseName}
            subtitle={isTask ? item.title : extractSummaryWithoutCourseNameAndEventType(item)}
            description={item.notes || item.description}
            rightContent={`${month} ${day}`}
            onClick={() => onSelect(item)}
        />
    );
}

function renderTaskCB(task, onTaskSelect) {
    return renderItemCard(task, onTaskSelect, true);
}

function renderExamEventCB(event, onEventSelect) {
    return renderItemCard(event, onEventSelect, false);
}

function upcomingExamsOverview(eventsData, onEventSelect) {
    const exams = eventsData.filter(eventIsExamCB);
    const examsToday = exams.filter(eventIsTodayCB);
    const examsTomorrow = exams.filter(eventIsTomorrowCB);
    const examsThisWeek = exams.filter(eventIsLaterThisWeekCB);
    const examsNextWeek = exams.filter(eventIsDueNextWeekCB);
    const examsLater = exams.filter(eventIsDueAfterNextWeekAndLaterCB);
    return (
        <div>
            <div hidden={examsToday.length === 0} style={{ color: "orange" }}>
                Today
            </div>
            {examsToday.map(renderExamWithSelectACB)}
            <div
                hidden={examsTomorrow.length === 0}
                style={{ color: "yellow" }}
            >
                Tomorrow
            </div>
            {examsTomorrow.map(renderExamWithSelectACB)}
            <div style={{ color: "white" }} hidden={examsThisWeek.length === 0}>
                This Week
            </div>
            {examsThisWeek.map(renderExamWithSelectACB)}
            <div style={{ color: "white" }} hidden={examsNextWeek.length === 0}>
                Next Week
            </div>
            {examsNextWeek.map(renderExamWithSelectACB)}
            <div style={{ color: "white" }} hidden={examsLater.length === 0}>
                Later
            </div>
            {examsLater.map(renderExamWithSelectACB)}
        </div>
    );

    function renderExamWithSelectACB(event) {
        return renderExamEventCB(event, onEventSelect);
    }
}

function eventIsExamCB(event) {
    return event.eventType === "Exam";
}



function taskIsOverdueCB(task) {
    return isBeforeToday(new Date(task.due));
}

function taskIsDueTodayCB(task) {
    const taskDueDate = new Date(task.due);
    return isToday(taskDueDate);
}

function taskIsDueTomorrowCB(task) {
    return isTomorrow(new Date(task.due));
}

function taskIsDueLaterThisWeek(task) {
    return isLaterThisWeek(new Date(task.due));
}

function taskIsDueNextWeek(task) {
    return isNextWeek(new Date(task.due));
}

function taskIsDueAfterNextWeekAndLaterCB(task) {
    return isAfterNextWeekAndLater(new Date(task.due));
}

function eventIsTodayCB(event) {
    return isToday(new Date(event.start.dateTime));
}

function eventIsTomorrowCB(event) {
    return isTomorrow(new Date(event.start.dateTime));
}

function eventIsLaterThisWeekCB(event) {
    return isLaterThisWeek(new Date(event.start.dateTime));
}

function eventIsDueNextWeekCB(event) {
    return isNextWeek(new Date(event.start.dateTime));
}

function eventIsDueAfterNextWeekAndLaterCB(event) {
    return isAfterNextWeekAndLater(new Date(event.start.dateTime));
}