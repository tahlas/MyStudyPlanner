import { observer } from "mobx-react-lite";
import { TimerView } from "../views/timerView.jsx";

const Timer = observer(function RenderTimer(props) {
    return (
        <TimerView
            playingStatus={props.model.playingStatus}
            timeLeftInSeconds={props.model.timeLeftInSeconds}
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
