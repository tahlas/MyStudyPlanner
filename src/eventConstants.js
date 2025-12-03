//Fake data for testing purposes
export const eventConstants = [{
  "kind": "calendar#event",
  "etag": "\"3181849000000000\"",
  "id": "fakeeventid123",
  "status": "confirmed",
  "htmlLink": "https://www.google.com/calendar/event?eid=fakeeventid123",
  "created": "2025-11-20T10:00:00.000Z",
  "updated": "2025-11-20T10:30:00.000Z",
  "summary": "Team Meeting - Project Alpha",
  "description": "Weekly sync-up for Project Alpha. Discuss progress, blockers, and next steps.",
  "location": "Conference Room A, Main Office",
  "colorId": "1", // Example color ID
  "creator": {
    "id": "creator123",
    "email": "creator@example.com",
    "displayName": "Alice Smith",
    "self": false
  },
  "organizer": {
    "id": "organizer456",
    "email": "organizer@example.com",
    "displayName": "Bob Johnson",
    "self": true
  },
  "start": {
    "dateTime": "2025-12-10T14:00:00-05:00",
    "timeZone": "America/New_York"
  },
  "end": {
    "dateTime": "2025-12-10T15:00:00-05:00",
    "timeZone": "America/New_York"
  },
  "recurrence": [],
  "iCalUID": "fakeeventid123@google.com",
  "sequence": 0,
  "attendees": [{
    "email": "attendee1@example.com",
    "displayName": "Charlie Brown",
    "organizer": false,
    "self": false,
    "responseStatus": "accepted"
  }, {
    "email": "attendee2@example.com",
    "displayName": "Diana Prince",
    "organizer": false,
    "self": false,
    "responseStatus": "tentative"
  }, {
    "email": "organizer@example.com",
    "displayName": "Bob Johnson",
    "organizer": true,
    "self": true,
    "responseStatus": "accepted"
  }],
  "guestsCanInviteOthers": true,
  "guestsCanModify": false,
  "guestsCanSeeOtherGuests": true,
  "reminders": {
    "useDefault": false,
    "overrides": [{
      "method": "email",
      "minutes": 30
    }, {
      "method": "popup",
      "minutes": 15
    }]
  },
  "eventType": "default"
}, {
  "kind": "calendar#event",
  "etag": "\"3181849000000000\"",
  "id": "anotherfakeeventid456",
  "status": "confirmed",
  "htmlLink": "https://www.google.com/calendar/event?eid=anotherfakeeventid456",
  "created": "2025-11-25T09:00:00.000Z",
  "updated": "2025-11-25T09:15:00.000Z",
  "summary": "Doctor's Appointment",
  "description": "Annual check-up.",
  "location": "City Clinic, 123 Health St",
  "colorId": "2",
  "creator": {
    "id": "creator789",
    "email": "creator@example.com",
    "displayName": "Alice Smith",
    "self": true
  },
  "organizer": {
    "id": "creator789",
    "email": "creator@example.com",
    "displayName": "Alice Smith",
    "self": true
  },
  "start": {
    "date": "2025-12-15",
    "timeZone": "America/New_York"
  },
  "end": {
    "date": "2025-12-15",
    "timeZone": "America/New_York"
  },
  "endTimeUnspecified": true,
  "recurrence": [],
  "iCalUID": "anotherfakeeventid456@google.com",
  "sequence": 0,
  "attendees": [],
  "guestsCanInviteOthers": false,
  "guestsCanModify": false,
  "guestsCanSeeOtherGuests": false,
  "reminders": {
    "useDefault": true
  },
  "eventType": "default"
}];

