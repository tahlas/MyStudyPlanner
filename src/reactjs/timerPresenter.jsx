import { observer } from "mobx-react-lite";
import { TimerView } from "../views/timerView.jsx";

const Timer = observer(function RenderTimer(props) {
    function setPlayingStatusCB(status) {
        props.model.setPlayingStatus(status);
        console.log("Playing status set to: " + status);
    }

    return <TimerView 
    playingStatus={props.model.playingStatus}
    onStatusChange={setPlayingStatusCB} />;
});



export { Timer };
