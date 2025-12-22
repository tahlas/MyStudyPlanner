import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

function AddCourseModal({ onClose, onNewCourse }) {

    function submitACB(evt){
        evt.preventDefault();

        onNewCourse({
            name: evt.target.name.value,
            color: evt.target.color.value,
        });
        onClose();
    }

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose}>
            <div className = "mt-10 flex flex-col gap-5 text-white">
                <div style={{backgroundColor: "#1e2939"}}  className="bg-gray-600 rounded-xl px-20 py-25 flex-col gap-25 items-center mx-4 relative" onClick={(e) => e.stopPropagation()}>
                    <IconButton  style={{ position: "absolute", top: 12, right: 12 }}><CloseIcon className="text-white hover:bg-red-700"  onClick={onClose}/></IconButton>
                    <h1 className= "text-3xl font-bold text-center mb-6">Add Course</h1>
                    <form className="w-full space-y-3" onSubmit={submitACB}>
                        <div>
                            <input
                                id="name"
                                required
                                type="text"
                                placeholder="Course Name"
                                className="w-full px-4 py-3 text-black  rounded-md bg-white"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-white font-semibold">
                                Color
                            </label>
                            <input
                                id="color"
                                type="color"
                                defaultValue="#800080"
                                className="w-16 h-10  cursor-pointer"
                            />
                        </div>
                        <div>
                            <button className="bg-red-600 text-white rounded-md px-4 py-3 w-full font-bold hover:bg-red-800" type="submit">
                                Save Course
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddCourseModal