import "/src/style.css";
import { Typography, Divider } from "@mui/material";


export function SettingsView(props) {
    return (
        <div>
            {accountInfo(props.user)}
            {boxWithCourses(props.courses)}
        </div>
    );
}

function accountInfo(user){
    return(
        <div className="settingsBoxes">
            <Typography variant="h4" color="white" paddingLeft="15px" paddingTop="10px" paddingBottom="10px" fontWeight="bold">
                Account
            </Typography>
            <Divider sx={{ backgroundColor: "white" }} variant="middle"/>
            <img src={user.photoURL} alt="User Profile" style={{ borderRadius: "50%", margin: "15px" }} />
            <Typography variant="h6" color="white" paddingLeft="15px" paddingBottom="10px" fontWeight="medium">
                {user.displayName}
            </Typography>
            <Typography variant="h6" color="white" paddingLeft="15px" paddingBottom="15px" fontWeight="light">
                {user.email}
            </Typography>
        </div>
    );
}

function boxWithCourses(courses){
    return (
        <div className="settingsBoxes">
            <Typography variant="h4" color="white" paddingLeft="15px" paddingTop="10px" paddingBottom="10px" fontWeight="bold">
                Courses
            </Typography>
            {courses.map(renderCourseItemCB)}
        </div>
    );
}

function renderCourseItemCB(course){
    return (
        <div key={course.name}>
            <Divider sx={{ backgroundColor: "white" }} variant="middle"/>
            <div style={{ display: "flex", alignItems: "center", paddingLeft: "15px", paddingTop: "10px", paddingBottom: "10px" }}>
                <div style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: course.color,
                    marginRight: "10px"
                }} />
                <Typography variant="h6" color="white">
                    {course.name}
                </Typography>
            </div>
        </div>
    )
}