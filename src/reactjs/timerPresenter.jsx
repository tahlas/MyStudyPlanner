import { observer } from "mobx-react-lite";
import { TimerView } from "../views/timerView.jsx";

const Timer = observer(function RenderTimer(props) {
    return (
        <TimerView
            playingStatus={props.model.playingStatus}
            breakStatus={props.model.isBreak}
            timeLeftInSeconds={props.model.timeLeftInSeconds}
            defaultBreakTime={props.model.defaultBreakTimeInSeconds}
            defaultPomodoroSessionTimeInSeconds={props.model.defaultPomodoroSessionTimeInSeconds}
            onStatusChange={setPlayingStatusCB}
        />
    );

    function setPlayingStatusCB(status) {
        props.model.setPlayingStatus(status);
        console.log("Playing status set to: " + status);
    }
});

export { Timer };
