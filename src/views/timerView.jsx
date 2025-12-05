import CircularProgress from '@mui/material/CircularProgress';

export function TimerView(props){
    
    return(
        <div>
            <CircularProgress variant="determinate" value={props.timerProgress}/>
        </div>
    )
}