import CircularProgress from "@mui/material/CircularProgress";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

export function TimerView(props) {
    return (
        <div>
            {timerProgress()}
            {timerControls()}
            {showPlayOrPause}
        </div>
    );

    function timerProgress() {
        return (
            <div>
                <CircularProgress
                    variant="determinate"
                    value={100}
                    size={250}
                />
            </div>
        );
    }

    function timerControls() {
        return (
            <div>
                <Stack direction="row" spacing={1}>
                    {showPlayOrPause(props.playingStatus)}
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
}
