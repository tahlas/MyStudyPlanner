//

export const taskConstants = [
  {
    "kind": "tasks#task",
    "id": "task123",
    "etag": "etag123",
    "title": "Complete project proposal",
    "updated": "2025-12-01T10:00:00.000Z",
    "selfLink": "https://www.googleapis.com/tasks/v1/lists/taskListId/tasks/task123",
    "parent": null, // This field is omitted if it is a top-level task.
    "position": "00000000000000000000",
    "notes": "Draft the proposal, include budget and timeline estimates.",
    "status": "needsAction",
    "due": "2025-12-05T23:59:59.999Z",
    "completed": null, // This field is omitted if the task has not been completed.
    "deleted": false,
    "hidden": false,
    "links": [
      {
        "type": "generic",
        "description": "Project brief",
        "link": "https://example.com/project-brief.pdf"
      }
    ],
    "webViewLink": "https://tasks.google.com/tasks/v1/r/task/task123",
    "assignmentInfo": null // This field is populated for assigned tasks.
  },
  {
    "kind": "tasks#task",
    "id": "task456",
    "etag": "etag456",
    "title": "Review team's progress",
    "updated": "2025-11-28T14:30:00.000Z",
    "selfLink": "https://www.googleapis.com/tasks/v1/lists/taskListId/tasks/task456",
    "parent": null,
    "position": "00000000000000000001",
    "notes": "Check on individual contributions and address any blockers.",
    "status": "completed",
    "due": "2025-11-30T23:59:59.999Z",
    "completed": "2025-11-29T16:00:00.000Z",
    "deleted": false,
    "hidden": false,
    "links": [],
    "webViewLink": "https://tasks.google.com/tasks/v1/r/task/task456",
    "assignmentInfo": null
  },
  {
    "kind": "tasks#task",
    "id": "task789",
    "etag": "etag789",
    "title": "Schedule client meeting",
    "updated": "2025-12-02T09:15:00.000Z",
    "selfLink": "https://www.googleapis.com/tasks/v1/lists/taskListId/tasks/task789",
    "parent": "task123", // Example of a sub-task
    "position": "00000000000000000002",
    "notes": "Find a suitable time for the client and internal team.",
    "status": "needsAction",
    "due": "2025-12-10T23:59:59.999Z",
    "completed": null,
    "deleted": false,
    "hidden": false,
    "links": [
      {
        "type": "email",
        "description": "Client contact",
        "link": "mailto:client@example.com"
      }
    ],
    "webViewLink": "https://tasks.google.com/tasks/v1/r/task/task789",
    "assignmentInfo": {
      "linkToTask": "https://docs.google.com/document/d/docId/edit#task=task789",
      "surfaceType": "DOCUMENT",
      "driveResourceInfo": {
        "driveFileId": "docId",
        "resourceKey": "resourceKeyExample"
      }
    }
  }
];

