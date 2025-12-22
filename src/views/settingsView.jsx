import "/src/style.css";
import { Typography, Divider, Button, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import AddCourseModal from "./components/addCourseModal.jsx";
import EditCourseModal from "./components/editCourseModal.jsx";



export function SettingsView(props) {
    return (
        <div className="flex flex-row max-[1100px]:flex-col">
            {accountInfo(props.user, props.onLogout)}
            {boxWithCourses(props.courses, props.newCourse, props.editCourse, props.deleteCourse)}
        </div>
    );
}

function accountInfo(user, onLogout) {
    return (
        <div className="settingsBoxes">
            <Typography
                variant="h4"
                color="white"
                paddingLeft="15px"
                paddingTop="10px"
                paddingBottom="10px"
                fontWeight="bold"
            >
                Account
            </Typography>
            <Divider sx={{ backgroundColor: "white" }} variant="middle" />
            <img
                src={user.photoURL}
                alt="User Profile"
                style={{ borderRadius: "50%", margin: "15px" }}
            />
            <Typography
                variant="h6"
                color="white"
                paddingLeft="15px"
                paddingBottom="10px"
            >
                {user.displayName}
            </Typography>
            <Typography
                variant="h6"
                color="white"
                paddingLeft="15px"
                paddingBottom="15px"
            >
                {user.email}
            </Typography>
            <Button
                variant="outlined"
                onClick={onLogout}
                style={{ marginLeft: "15px" }}
            >
                Sign Out
            </Button>
        </div>
    );
}

function boxWithCourses(courses, newCourse,editCourse,deleteCourse) {
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [showEditCourseModal, setShowEditCourseModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);


    function renderCourseItemCB(course) {
        return (
            <div key={course.name}>
                <Divider sx={{ backgroundColor: "white" }} variant="middle" />
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        paddingLeft: "15px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                    }}
                >
                    <div
                        style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            backgroundColor: course.color,
                            marginRight: "10px",
                        }}
                    />
                    <Typography variant="h6" color="white">
                        {course.name}
                    </Typography>
                    <Button
                        onClick={() => {
                            setSelectedCourse(course);
                            setShowEditCourseModal(true);
                        }}
                        sx={{ marginLeft: "auto", marginRight: "10px" }}
                    >
                        Edit
                    </Button>

                    <IconButton
                        onClick={() =>deleteCourse(course.name)}
                        sx={{ color: "white" }}
                    ><CloseIcon />
                    </IconButton>
                </div>
            </div>
        );
    }

    return (
        <div className="settingsBoxes">
            <div style={{ display: "flex", flexDirection: "row" }}>
                <Typography
                    variant="h4"
                    color="white"
                    paddingLeft="15px"
                    paddingTop="10px"
                    paddingBottom="10px"
                    fontWeight="bold"
                >
                    Courses
                </Typography>
                <Button
                    onClick={() => setShowCourseModal(true)}
                    style={{ marginLeft: "auto", marginRight: "10px" }}
                    className="bg-violet-600 text-white px-6 py-3 rounded-md font-bold hover:bg-indigo-700"
                >
                    Add Course
                </Button>
            </div>
            {courses.length === 0 && <Divider sx={{ backgroundColor: "white" }} variant="middle" />}

            {courses.map(renderCourseItemCB)}

            {showCourseModal && (
                <AddCourseModal
                    onClose={() => setShowCourseModal(false)}
                    onNewCourse={newCourse}
                />
            )}

            {showEditCourseModal && (
                <EditCourseModal
                    course={selectedCourse}
                    onClose={() => setShowEditCourseModal(false)}
                    onEditCourse={editCourse}
                />
            )}

        </div>
    );
}
