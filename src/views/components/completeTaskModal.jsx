import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

function CompleteTaskModal({ onClose, onCompleteTask }) {

    function submitACB(evt){
        evt.preventDefault();
        onCompleteTask(true);
        onClose();
    }


    function cancelACB(evt){
        onCompleteTask(true);
        onClose();
    }

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className = "mt-10 flex flex-col gap-5 text-white">
                <IconButton  className="place-self-end"><CloseIcon className="text-white bg-gray-600 hover:bg-red-700"  onClick={cancelACB}/></IconButton>
                <div className="bg-gray-600 rounded-xl px-20 py-25 flex-col gap-25 items-center mx-4">
                        <div className="flex items-center gap-4">
                            <input
                                type="checkbox"
                                id="taskComplete"
                                onChange={submitACB}
                                className="w-6 h-6 rounded accent-red-600 cursor-pointer"
                            />
                            <label
                                htmlFor="taskComplete"
                                className="text-xl text-white cursor-pointer font-bold "
                            >
                                Mark task as completed
                            </label>
                        </div>
                        <div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default CompleteTaskModal