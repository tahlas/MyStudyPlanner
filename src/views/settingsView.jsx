import "/src/style.css";
import { Typography, Divider } from "@mui/material";


export function SettingsView(props) {
    return (
        <div style={{ padding: "20px" }}>
            {renderCourses(props.courses)}
        </div>
    );
}

function renderCourses(courses){
    return (
        <div className="settingsCoursesList">
            <Typography variant="h4" color="white" paddingLeft="15px" paddingTop="10px" paddingBottom="10px">
                Courses
            </Typography>
            {courses.map(renderCourseItemCB)}

        </div>
    )
}

function renderCourseItemCB(course){
    return (
        <div>
            <Divider sx={{ backgroundColor: "white" }} variant="middle"/>
            <Typography variant="h6" color="white" paddingLeft="15px" paddingTop="10px" paddingBottom="10px">
                {course.name}
            </Typography>
            
        </div>
    )
}