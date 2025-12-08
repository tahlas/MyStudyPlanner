#Short description of your project
This is a study planner website based on the old version of MyStudyLife and other planner apps. The website will have an overview page where you can see upcoming tasks, exams, and events. It will also have a calendar that is similar to Google Calendar, and a pomodoro timer that allows you to track the amount of time spent on an assignment. It will use the Google Calendar and Google Tasks API to save events/tasks created via the website, and to fetch events/tasks from the API.

#What you have done
The project implements firebase authentication allowing a user to login through their google account. Upon login, rights to access and modify a users google calendar and tasks data is granted. Per-user persistence is implemented with Firebase firestore allowing for necessary data to persist. In this stage of development future google calendar events can be retrieved through the google calendar API. There is a login view allowing a user to login with their google account by clicking a button. There exists an overview view which displays a user's schedule and how many uncompleted tasks they have per course. Finally, there is a timer view that has a pomodoro timer, but currently it does not work. Currently the view uses fake data, but it will soon be replaced by data that is fetched through APIs. 

#What you still plan to do
We plan on making it possible to create tasks/events/exams via the website and to have them be sent to the user’s Google Calendar/Tasks. Additionally, we will finish the pomodoro timer and let the user see an overview of how much time they have spent on their tasks each week. This will be in the same view as the timer or in a new view. Furthermore, a calendar view will be created. In this view it will be possible to view all of the tasks/events in the current week or month, and clicking on a day will show a popup with all of the tasks/events for that day.

#Your project file structure (short description/purpose of each file)
lardner-tahmid-HT25-Project/
├── .firebase/                          # Firebase deployment c ache
├── .firebaserc                         # Firebase project configuration
├── .gitignore                          # Git ignore rules
├── .prettierrc.json                    # Code formatting configuration
├── firebase.json                       # Firebase hosting configuration
├── index.html                          # Main HTML entry point
├── package.json                        # Node.js dependencies and scripts
├── README.md                           # Project documentation
├── vite.config.js                      # Vite build configuration
└── src/
    ├── apiConfig.js                    # API URLs for Google Calendar and Tasks
    ├── calendarSource.js               # Fetches calendar events from Google API
    ├── eventConstants.js               # Mock/test event data
    ├── firebaseConfig.js               # Firebase project credentials
    ├── firestoreModel.js              # Firebase authentication and Firestore persistence
    ├── mobxReactiveModel.js           # MobX observable wrapper for the model
    ├── resolvePromise.js              # Promise state management utility
    ├── studyModel.js                  # Main application model (data and logic)
    ├── style.css                       # Styling for the website
    ├── taskConstants.js               # Mock/test task data
    ├── tasksSource.js                 # Fetches tasks from Google Tasks API
    ├── utilities.js                   # Helper functions
    ├── reactjs/                       # Presenters
    │   ├── index.jsx                  # React app initialization
    │   ├── loginPresenter.jsx         # Login page presenter
    │   ├── overviewPresenter.jsx      # Overview page presenter
    │   ├── ReactRoot.jsx              # Router configuration
    │   └── timerPresenter.jsx         # Timer page presenter
    └── views/                         # Views
        ├── loginView.jsx              # Login page view
        ├── overviewView.jsx           # Overview page view
        └── timerView.jsx              # Pomodoro timer view
