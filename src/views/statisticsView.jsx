import { Typography, IconButton, Tooltip } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import "../utilities.js";

export function WeeklyTimeView(props) {
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

    function getWeekDates(offset) {
        const now = new Date();
        const currentDay = now.getDay();
        const diff = currentDay === 0 ? -6 : 1 - currentDay;

        const monday = new Date(now);
        monday.setDate(now.getDate() + diff + offset * 7);
        monday.setHours(0, 0, 0, 0);

        const dates = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            dates.push(date);
        }
        return dates;
    }

    const weekDates = getWeekDates(currentWeekOffset);
    const weekNumber = weekDates[0].getEuropeanWeek();
    const weekDays = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
    ];

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    }

    function getTasksForDay(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const dateKey = `${year}-${month}-${day}`;
        const tasksForDay = [];

        Object.entries(props.taskTimeByDate || {}).forEach(
            ([taskId, dateData]) => {
                if (dateData[dateKey]) {
                    const task = props.tasksData.find((t) => t.id === taskId);
                    if (task) {
                        tasksForDay.push({
                            task: task,
                            timeSpent: dateData[dateKey],
                        });
                    }
                }
            },
        );
        return tasksForDay;
    }

    function getTotalTimeForDay(date) {
        const tasksForDay = getTasksForDay(date);
        return tasksForDay.reduce((total, item) => total + item.timeSpent, 0);
    }

    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <IconButton
                        onClick={() =>
                            setCurrentWeekOffset(currentWeekOffset - 1)
                        }
                    >
                        <ChevronLeftIcon
                            sx={{ color: "white", fontSize: 32 }}
                        />
                    </IconButton>

                    <Typography variant="h4" color="white" fontWeight="bold">
                        Week {weekNumber}
                    </Typography>

                    <IconButton
                        onClick={() =>
                            setCurrentWeekOffset(currentWeekOffset + 1)
                        }
                    >
                        <ChevronRightIcon
                            sx={{ color: "white", fontSize: 32 }}
                        />
                    </IconButton>

                    {currentWeekOffset !== 0 && (
                        <button
                            onClick={() => setCurrentWeekOffset(0)}
                            className="ml-auto bg-violet-600 text-white px-4 py-2 rounded-md font-bold hover:bg-indigo-700"
                        >
                            Go to Current Week
                        </button>
                    )}
                </div>

                {/* Week Overview */}
                <div className="grid grid-cols-7 gap-4">
                    {weekDates.map((date, index) => {
                        const tasksForDay = getTasksForDay(date);
                        const totalTime = getTotalTimeForDay(date);
                        const isToday =
                            date.toDateString() === new Date().toDateString();

                        return (
                            <div
                                key={index}
                                className={`p-4 rounded-lg ${
                                    isToday ? "bg-blue-600" : "bg-gray-800"
                                }`}
                            >
                                <Typography
                                    variant="h6"
                                    color="white"
                                    fontWeight="bold"
                                    className="mb-2"
                                >
                                    {weekDays[index]}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="white"
                                    className="mb-3 opacity-75"
                                >
                                    {date.getDate()}/{date.getMonth() + 1}
                                </Typography>

                                {tasksForDay.length > 0 ? (
                                    <>
                                        <Typography
                                            variant="body2"
                                            color="white"
                                            fontWeight="bold"
                                            className="mb-2"
                                        >
                                            Total: {formatTime(totalTime)}
                                        </Typography>
                                        <div className="space-y-2">
                                            {tasksForDay.map((item) => (
                                                <div
                                                    key={item.task.id}
                                                    className="p-2 rounded"
                                                    style={{
                                                        backgroundColor:
                                                            item.task.color,
                                                    }}
                                                >
                                                    <Tooltip title={item.task.title}>
                                                        <Typography
                                                            variant="body2"
                                                            className="font-semibold truncate"
                                                        >
                                                            {item.task.title}
                                                        </Typography>
                                                    </Tooltip>

                                                    <Typography variant="caption">
                                                        {formatTime(
                                                            item.timeSpent,
                                                        )}
                                                    </Typography>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <Typography
                                        variant="body2"
                                        color="white"
                                        className="opacity-50"
                                    >
                                        No tasks
                                    </Typography>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
