import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { formatTime } from "../../utilities.js";



function ScheduleModal({ onClose, tasks,events}) {

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
            onClick={onClose}>
            <div className = "mt-10 flex flex-col gap-5 text-white">
                <div className="bg-gray-600 rounded-xl px-20 py-25 flex flex-col gap-5 items-center mx-4 relative" onClick={(e) => e.stopPropagation()}>
                    <IconButton  style={{ position: "absolute", top: 12, right: 12 }}><CloseIcon className="text-white hover:bg-red-700"  onClick={onClose}/></IconButton>
                    <div className="text-white mt-1 overflow-y-auto flex-1 min-h-0">
                        {tasks.map((task) => (
                            <div key={task.id}  className="rounded-2xl px-6 py-5 mb-4 text-3xl font-semibold cursor-pointer transition-all duration-200 hover:brightness-110"
                                 style={{backgroundColor: task.color}}>
                                {task.title}
                            </div>
                        ))}
                        {events.map((event) => (
                            <div
                                key={`event-${event.id}`}
                                className="relative rounded-2xl px-6 py-5 mb-4 text-3xl font-semibold cursor-pointer transition-all duration-200 hover:brightness-110"
                                style={{ backgroundColor: event.color }}
                            >
                                {event.summary}
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-sm">
                                    {formatTime(event.start.dateTime) + ' – ' + formatTime(event.end.dateTime)}
                                 </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ScheduleModal