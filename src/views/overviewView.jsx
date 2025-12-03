import Button from "@mui/material/Button";
import "/src/style.css";

/**
 * Renders the Overview View component.
 * @returns the Overview View JSX element
 */
export function OverviewView() {
    return todaysOverview();
    //return <Button variant="contained">Overview</Button>;
}

function todaysOverview() {
    //TODO
    return renderTasksForToday();
} 

function renderTasksForToday() {
    return (
        <div className="overviewTask" style={{backgroundColor:"#4bbfe3"}}>
            Course Name <br />
            Task Title <br />
            Task Description
        </div>
    );
}
