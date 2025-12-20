import CircularProgress from "@mui/material/CircularProgress";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { Typography } from "@mui/material";
import AddTaskModal from "./components/addTaskModal.jsx";

export function TimerView(props) {
    return (
        <div style={{ display: "flex", gap: "40px", padding: "20px" }}>
            <div>
                {selectedTaskDisplay()}
                {timerProgress()}
                {timerControls()}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                {tasksList()}
            </div>
        </div>
    );

    function selectedTaskDisplay() {
        if (!props.selectedTask) {
            return (
                <Typography
                    variant="h5"
                    color="white"
                    style={{ marginBottom: "10px" }}
                >
                    No task selected
                </Typography>
            );
        }

        const timeSpent = props.getTaskTimeSpent(props.selectedTask.id);
        const hours = Math.floor(timeSpent / 3600);
        const minutes = Math.floor((timeSpent % 3600) / 60);

        return (
            <div>
                <Typography variant="h6" color="white">
                    Current Task:
                </Typography>
                <Typography variant="h5" color="#4bbfe3" fontWeight="bold">
                    {props.selectedTask.title}
                </Typography>
                <Typography variant="body1" color="white">
                    Time spent: {hours}h {minutes}m
                </Typography>
            </div>
        );
    }

    function timerProgress() {
        return (
            <div style={{ position: "relative", display: "inline-flex", color:"white" }}>
                <CircularProgress
                    variant="determinate"
                    // value={100}
                    value={
                        props.breakStatus
                            ? (props.timeLeftInSeconds /
                                  props.defaultBreakTime) *
                              100
                            : (props.timeLeftInSeconds /
                                  props.defaultPomodoroSessionTimeInSeconds) *
                              100
                    }
                    size={250}
                />
                <Typography
                    variant="h2"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    {convertSecondsToTimeString(props.timeLeftInSeconds)}
                </Typography>
            </div>
        );

        function convertSecondsToTimeString(seconds) {
            const roundedSeconds = Math.floor(seconds);
            const minutes = Math.floor(roundedSeconds / 60);
            const remainingSeconds = roundedSeconds % 60;
            return (
                minutes.toString().padStart(2, "0") +
                ":" +
                remainingSeconds.toString().padStart(2, "0")
            );
        }
    }

    function timerControls() {
        return (
            <div>
                <Stack direction="row" spacing={1}>
                    {showPlayOrPause()}
                </Stack>
            </div>
        );
    }

    function showPlayOrPause() {
        if (props.playingStatus) {
            return (
                <IconButton color="primary" onClick={userChangesStatus}>
                    <PauseCircleIcon sx={{ fontSize: 100 }} />
                </IconButton>
            );
        }
        return (
            <IconButton color="primary" onClick={userChangesStatus}>
                <PlayCircleFilledWhiteIcon sx={{ fontSize: 100 }} />
            </IconButton>
        );
    }

    function userChangesStatus() {
        props.onStatusChange(!props.playingStatus);
    }

    function tasksList() {
        if (!props.tasksData || props.tasksData.length === 0) {
            return <Typography color="white">No tasks available!</Typography>;
        }

        return (
            <>
                <Typography
                    variant="h4"
                    color="white"
                    style={{ marginBottom: "10px" }}
                >
                    Tasks
                </Typography>
                {props.tasksData.map(renderTaskCB)}
            </>
        );

        function renderTaskCB(task) {
            const timeSpent = props.getTaskTimeSpent(task.id);
            const hours = Math.floor(timeSpent / 3600);
            const minutes = Math.floor((timeSpent % 3600) / 60);    
            const isSelected = props.selectedTask?.id === task.id;

            return (
                <div
                    key={task.id}
                    onClick={() => props.onTaskSelect(task)}
                    className="overviewTask font-semibold"
                    style={{
                        backgroundColor: isSelected ? "#2a9d8f" : "#4bbfe3",
                        border: isSelected ? "3px solid #f4a261" : "none",
                        padding: "5px",
                    }}
                >
                    {task.title} <br />
                    {task.notes && (
                        <>
                            {task.notes} <br />
                        </>
                    )}
                    Time spent: {hours}h {minutes}m <br />
                    {/* {task.due && <>{new Date(task.due).toLocaleDateString()}</>} */}
                </div>
            );
        }
    }
}
