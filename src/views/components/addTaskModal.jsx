import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

function AddTaskModal({ onClose, onNewTask, courseNames}) {

   function submitACB(evt){
        evt.preventDefault();

        onNewTask({
            listTitle: evt.target.course.value,
            title: evt.target.title.value,
            description: evt.target.description.value,
            date: evt.target.date.value,
        });
        onClose();
    }

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose}>
            <div className = "mt-10 flex flex-col gap-5 text-white">
                <div style={{backgroundColor: "#1e2939"}} className="rounded-xl px-20 py-5 flex-col gap-25 items-center mx-4 relative" onClick={(e) => e.stopPropagation()}>
                    <IconButton  style={{ position: "absolute", top: 12, right: 12 }}><CloseIcon className="text-white hover:bg-red-700"  onClick={onClose}/></IconButton>
                    <h1 className= "text-3xl font-bold text-center mb-2">Add Task</h1>
                    <form className="w-full space-y-3" onSubmit={submitACB}>
                        <div className="text-right">
                            <a href="#/settings" className="underline cursor-pointer font-thin">Add Course</a>
                            <select
                                id="course"
                                required
                                className="w-full px-4 py-3 text-black rounded-md bg-white"
                            >
                                <option value="">Select Course</option>
                                {courseNames.map((courseName) => (
                                    <option key={courseName} value={courseName}>
                                        {courseName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <input
                                id="title"
                                type="text"
                                placeholder="Task Title"
                                required
                                className="w-full px-4 py-3 text-black  rounded-md bg-white"
                            />
                        </div>

                        <div>
                            <textarea
                                id="description"
                                placeholder="Description (Optional)"
                                className="w-full px-4 py-3 text-black  rounded-md bg-white"
                            />
                        </div>

                        <div>
                            <input
                                id="date"
                                type="date"
                                required
                                className=" px-1 py-1 text-black bg-white"
                            />
                        </div>
                        <div>
                            <button className="bg-red-600 text-white rounded-md px-4 py-3 w-full font-bold hover:bg-red-800" type="submit">
                                Save Task
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddTaskModal