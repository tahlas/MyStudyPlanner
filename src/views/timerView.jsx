import CircularProgress from "@mui/material/CircularProgress";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PauseIcon from "@mui/icons-material/Pause";
import { Typography } from "@mui/material";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ItemCard from "./components/itemCard.jsx";

export function TimerView(props) {

    return (
        <div className="flex flex-row max-[1100px]:flex-col gap-10 p-5 ml-28 max-[1100px]:ml-5">
            <div className="flex flex-col items-center">
                {timerProgress()}
                {timerControls()}
            </div>
            <div className="w-1/3 max-[1100px]:w-full flex flex-col gap-2.5 ml-auto max-[1100px]:ml-0">
                {tasksList()}
            </div>
        </div>
    );

    function timerProgress() {
        return (
            <div
                style={{
                    position: "relative",
                    display: "inline-flex",
                    color: "white"
                }}
            >
                <CircularProgress
                    variant="determinate"
                    value={
                        props.breakStatus
                            ? (props.timeLeftInSeconds /
                                props.defaultBreakTime) *
                            100
                            : (props.timeLeftInSeconds /
                                props.defaultPomodoroSessionTimeInSeconds) *
                            100
                    }
                    size={400}
                    sx={{
                        color: props.breakStatus ? "#10b981" : "#3b82f6",
                        transition: "color 0.3s ease"
                    }}
                />
                <Typography
                    variant="h2"
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "100px"
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
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Stack direction="row" spacing={1}>
                    {showPlayOrPause()}
                    <IconButton
                        color="primary"
                        onClick={props.onSkip}
                    >
                        <SkipNextIcon sx={{ fontSize: 100 }} />
                    </IconButton>
                </Stack>
            </div>
        );
    }

    function showPlayOrPause() {
        if (props.playingStatus) {
            return (
                <IconButton color="primary" onClick={userChangesStatus}>
                    <PauseIcon sx={{ fontSize: 100 }} />
                </IconButton>
            );
        }
        return (
            <IconButton color="primary" onClick={userChangesStatus}>
                <PlayArrowIcon sx={{ fontSize: 100 }} />
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

        // Sort tasks to put selected task at the top
        const sortedTasks = [...props.tasksData].sort((a, b) => {
            if (props.selectedTask?.id === a.id) return -1;
            if (props.selectedTask?.id === b.id) return 1;
            return 0;
        });

        return (
            <>
                <Typography
                    variant="h4"
                    color="white"
                    style={{ marginBottom: "10px" }}
                >
                    Tasks
                </Typography>
                {sortedTasks.map(renderTaskCB)}
            </>
        );

        function renderTaskCB(task) {
            const timeSpent = props.getTaskTimeSpent(task.id);
            const hours = Math.floor(timeSpent / 3600);
            const minutes = Math.floor((timeSpent % 3600) / 60);
            const isSelected = props.selectedTask?.id === task.id;

            return (
                <ItemCard
                    key={task.id}
                    item={task}
                    title={task.listTitle}
                    subtitle={task.title}
                    description={task.notes}
                    onClick={() => props.onTaskSelect(task)}
                    rightContent={
                        <div>
                            {hours}h {minutes}m
                        </div>
                    }
                    isSelected={isSelected}
                />
            );

            // return (
            //     <div
            //     // TODO: REMOVE DUPLICATE CODE (also in overviewView.jsx)
            //         key={task.id}
            //         onClick={() => props.onTaskSelect(task)}
            //         className={"overviewTask" + (isSelected ? ' task-pop-in' : "")}
            //         style={{
            //             backgroundColor: task.color,
            //             filter: isSelected ? "brightness(110%)" : "none",
            //             border: isSelected ? "3px solid #f4a261" : "none",
            //             padding: "5px",
            //             cursor: "pointer",
            //         }}
            //     >
            //         <span className="font-semibold">{task.listTitle}</span>
            //         <br />
            //         <span className="font-medium">{task.title}</span> <br />
            //         {task.notes && (
            //             <>
            //                 {task.notes} <br />
            //             </>
            //         )}
            //         Time spent: {hours}h {minutes}m <br />
            //         {/* {task.due && <>{new Date(task.due).toLocaleDateString()}</>} */}
            //     </div>
            // );
        }
    }
}
