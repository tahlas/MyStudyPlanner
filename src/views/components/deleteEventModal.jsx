import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

function DeleteEventModal({ onClose, onDelete, event, deleteOptions }) {

    function submitACB(evt) {
        evt.preventDefault();
        onDelete(event, evt.target.deleteType.value);
        onClose();
    }
    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[60]"
            onClick={onClose}>
            <div className="mt-10 flex flex-col gap-5 text-white">
                <div style={{backgroundColor: "#1e2939"}}  className="rounded-xl px-20 py-5 flex-col gap-25 items-center mx-4 relative" onClick={(e) => e.stopPropagation()}>
                    <IconButton style={{ position: "absolute", top: 12, right: 12 }}>
                        <CloseIcon className="text-white hover:bg-red-700" onClick={onClose}/>
                    </IconButton>
                    <h1 className="text-3xl font-bold text-center mb-2">Delete {event.summary}</h1>
                    <form className="w-full space-y-3" onSubmit={submitACB}>
                        <div>
                            <select
                                id="deleteType"
                                name="deleteType"
                                required
                                className="w-full px-4 py-3 text-black rounded-md bg-white"
                            >
                                <option value="">Select Delete Option</option>
                                {deleteOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button className="bg-red-600 text-white rounded-md px-4 py-3 w-full font-bold hover:bg-red-800" type="submit">
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default DeleteEventModal;