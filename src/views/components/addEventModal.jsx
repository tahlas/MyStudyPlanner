import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

function AddEventModal({ onClose, onNewEvent, courseNames,repeatOptions, eventTypeOptions}) {

    function submitACB(evt){
        evt.preventDefault();

        onNewEvent({
            course: evt.target.course.value,
            description: evt.target.description.value,
            duration: evt.target.duration.value,
            repeatOption: evt.target.repeat.value,
            date: evt.target.date.value,
            time: evt.target.time.value,
            eventTitle: evt.target.title.value,
            eventType: evt.target.eventType.value,
        });
        onClose();
    }
    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose}>
            <div className = "mt-10 flex flex-col gap-5 text-white">
                <div className="bg-gray-600 rounded-xl px-20 py-25 flex-col gap-25 items-center mx-4 relative" onClick={(e) => e.stopPropagation()}>
                    <IconButton  style={{ position: "absolute", top: 12, right: 12 }}><CloseIcon className="text-white hover:bg-red-700"  onClick={onClose}/></IconButton>
                    <h1 className= "text-3xl font-bold text-center mb-6">Add Event</h1>
                    <form className="w-full space-y-3" onSubmit={submitACB}>
                        <div>
                            <select
                                id="course"
                                required
                                className="w-full px-4 py-3 text-black rounded-md bg-white">
                                <option value="">Select Course</option>
                                {courseNames.map((courseName) => (
                                    <option key={courseName} value={courseName}>
                                        {courseName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <select
                                id="eventType"
                                required
                                className="w-full px-4 py-3 text-black rounded-md bg-white">
                                <option value="">
                                    Select Event Type
                                </option>
                                {eventTypeOptions.map((eventType) => (
                                    <option key={eventType} value={eventType}>
                                        {eventType}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <input
                                id="title"
                                type="text"
                                placeholder="Event Title"
                                required
                                className="w-full px-4 py-3 text-black  rounded-md bg-white"
                            />
                        </div>
                        <div>
                            <input
                                id="duration"
                                name="duration"
                                type="number"
                                min="15"
                                step="15"
                                defaultValue="60"
                                placeholder="Duration (minutes)"
                                className="w-full px-4 py-3 text-black rounded-md bg-white"
                            />
                            <span className="text-sm text-gray-300">Duration in minutes</span>
                        </div>
                        <div>
                            <select
                                id="repeat"
                                defaultValue=""
                                className="w-full px-4 py-3 text-black rounded-md bg-white">
                                <option value="">No Repeat</option>
                                {repeatOptions.map((repeatType) => (
                                    <option key={repeatType} value={repeatType}>
                                        {repeatType}
                                    </option>
                                ))}
                            </select>
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
                            <input
                                id="time"
                                type="time"
                                // defaultValue="00:00"
                                required
                                className="w-full px-4 py-3 text-black rounded-md bg-white"
                            />
                        </div>
                        <div>
                            <button className="bg-red-600 text-white rounded-md px-4 py-3 w-full font-bold hover:bg-red-800" type="submit">
                                Save Event
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default AddEventModal