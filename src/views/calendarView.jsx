import { useState } from "react";
import { IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ScheduleModal from "./components/scheduleModal.jsx";
import "/src/style.css";
import AddEventModal from "./components/addEventModal.jsx";

export function CalendarView(props) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showAddEventModal, setShowAddEventModal] = useState(false);



    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    //moves to next month and back one day to get last day of current month
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
    const startingDayOfWeek = firstDayOfMonth.getDay();
    // Convert to Monday-based (0 = Monday, 6 = Sunday)
    const startingDay = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    function goToPreviousMonth() {
        setCurrentDate(new Date(year, month - 1, 1));
    }

    function goToNextMonth() {
        setCurrentDate(new Date(year, month + 1, 1));
    }

    function handleDayClick(day) {
        const clickedDate = new Date(year, month, day);
        const tasksForDay = getTasksForDay(day);

        if (tasksForDay.length > 0) {
            setSelectedTask(tasksForDay);
            setShowScheduleModal(true);
        }
    }

    function renderCalendarGrid() {
        const weeks = [];
        let days = [];

        // Add empty cells for days before the month starts
        for (let i = 0; i < startingDay; i++) {
            days.push(
                <div
                    key={"empty" + i}
                    className="aspect-square border border-gray-600"
                />,
            );
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday =
                day === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();

            const tasksForDay = getTasksForDay(day);

            days.push(
                <div
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`aspect-square border border-gray-600 p-2 cursor-pointer hover:bg-gray-700 transition-colors flex flex-col ${
                        isToday ? "bg-blue-600" : "bg-gray-800"
                    }`}
                >
                    <span className="text-white font-semibold">{day}</span>
                    <div className="text-xs text-white mt-1 overflow-y-auto flex-1 min-h-0">
                        {tasksForDay.map((task) => (
                            <div key={task.id} className="truncate rounded-xl px-2 mb-1" style={{backgroundColor: task.color}}>
                                {task.title}
                            </div>
                        ))}
                    </div> 
                </div>,
            );

            // Start a new week after Sunday
            if ((startingDay + day) % 7 === 0) {
                weeks.push(
                    <div
                        key={`week-${weeks.length}`}
                        className="grid grid-cols-7"
                    >
                        {days}
                    </div>,
                );
                days = [];
            }
        }

        // Add remaining days to the last week
        if (days.length > 0) {
            // Fill remaining cells with empty divs
            while (days.length < 7) {
                days.push(
                    <div
                        key={`empty-end-${days.length}`}
                        className="aspect-square border border-gray-600"
                    />,
                );
            }
            weeks.push(
                <div key={`week-${weeks.length}`} className="grid grid-cols-7">
                    {days}
                </div>,
            );
        }

        return weeks;
    }

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header with navigation */}
                <div className="flex items-center mb-6">
                    <div className="ml-4">
                        <IconButton onClick={goToPreviousMonth}>
                            <ChevronLeftIcon
                                sx={{ color: "white", fontSize: 20 }}
                            />
                        </IconButton>

                        <IconButton onClick={goToNextMonth}>
                            <ChevronRightIcon
                                sx={{ color: "white", fontSize: 20 }}
                            />
                        </IconButton>
                    </div>

                    <Typography variant="h6" color="white" fontWeight="bold">
                        {monthNames[month]} {year}
                    </Typography>

                    <button
                        onClick={() => setShowAddEventModal(true)}
                        className="bg-violet-600 text-white px-6 py-3 rounded-md font-bold hover:bg-indigo-700 transition duration-300"
                    >
                        Add Event
                    </button>
                </div>

                {/* Weekday headers */}
                <div className="grid grid-cols-7 mb-2">
                    {weekDays.map((day) => (
                        <div
                            key={day}
                            className="text-center py-2 text-white font-bold"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar grid */}
                <div className="space-y-0">{renderCalendarGrid()}</div>
            </div>
            {showScheduleModal && (
                <ScheduleModal
                    tasks={selectedTask}
                    onClose={() => setShowScheduleModal(false)}
                    onCompleteTask={props.completeTask}
                />
            )}

            {showAddEventModal && (
                <AddEventModal
                    onClose={() => setShowAddEventModal(false)}
                    onNewEvent={props.newEvent}
                    courseNames={props.courseNames}
                    repeatOptions = {props.repeatOptions}
                    eventTypeOptions={props.eventTypeOptions}
                />
            )}
        </div>
    );

    function getTasksForDay(day) {
        if (!props.tasksData) return [];
        const cellDate = new Date(year, month, day);
        return props.tasksData.filter((task) => {
            const taskDueDate = new Date(task.due);
            return (
                taskDueDate.getFullYear() === cellDate.getFullYear() &&
                taskDueDate.getMonth() === cellDate.getMonth() &&
                taskDueDate.getDate() === cellDate.getDate()
            );
        });
    }
}
