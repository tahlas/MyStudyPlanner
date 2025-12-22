import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

function CompleteTaskModal({ onClose, onCompleteTask,  task}) {

    function submitACB(evt){
        evt.preventDefault();
        onCompleteTask(task);
        onClose();
    }

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose}>
            <div className = "mt-10 flex flex-col gap-5 text-white">
                <div style={{backgroundColor: "#1e2939"}}  className="rounded-xl px-20 py-25 flex flex-col gap-5 items-center mx-4 relative" onClick={(e) => e.stopPropagation()}>
                    <IconButton  style={{ position: "absolute", top: 12, right: 12 }}><CloseIcon className="text-white hover:bg-red-700"  onClick={onClose}/></IconButton>
                    <h1 className="text-2xl font-bold" >{task.title}</h1>
                    <form className="w-full space-y-3"  onSubmit={submitACB}  >
                        <div className="flex items-center gap-4">
                            <input
                                type="checkbox"
                                name="taskComplete"
                                className="w-6 h-6 rounded accent-red-600 cursor-pointer transition-all duration-300"
                            />
                            <label className="text-xl text-white cursor-pointer font-bold ">
                                Mark task as completed
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="bg-red-600 text-white rounded-md px-4 py-3 w-full font-bold hover:bg-red-800"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompleteTaskModal