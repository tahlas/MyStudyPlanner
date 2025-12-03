import Button from "@mui/material/Button";
import "/src/style.css";
//should not be used in final version
import { taskConstants } from "../taskConstants";

/**
 * Renders the Overview View component.
 * @returns the Overview View JSX element
 */
export function OverviewView() {
    return todaysOverview();
    //return <Button variant="contained">Overview</Button>;
}

function todaysOverview() {
    return taskConstants.map(renderTasksForTodayCB);
}

function renderTasksForTodayCB(task) {
    //if (task.due.includes("2025-12-10")) { //hardcoded date for testing
        return (
            <div
                className="overviewTask"
                style={{ backgroundColor: "#4bbfe3" }}
            >
                Course Name <br />
                {task.title} <br />
                {task.description} <br />
            </div>
        );
    //}
}
