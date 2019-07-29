const {
  google
} = require('googleapis');

require('dotenv').config()

const {
  GOOGLE_CALENDAR_CLIENT_ID,
  GOOGLE_CALENDAR_CLIENT_SECRET,
  HOSTNAME,
} = process.env;

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

let googleCalenderToken = '';

const createOAuthClient = () => (new google.auth.OAuth2(
  GOOGLE_CALENDAR_CLIENT_ID, GOOGLE_CALENDAR_CLIENT_SECRET, `${HOSTNAME}/injest/googleCalendar/cb`));

const startGoogleCalendarInjest = (req, res) => {
  const oAuth2Client = createOAuthClient();

  if (googleCalenderToken) {
    oAuth2Client.setCredentials(googleCalenderToken);
    listEvents(oAuth2Client, res);
    return;
  }

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    state: {
      clientId: 1
    }
  });

  res.send(`<script>window.location="${authUrl}"</script>`)
}

const googleCalendarAuthCb = (req, res) => {
  const oAuth2Client = createOAuthClient();

  oAuth2Client.getToken(req.query.code, (err, token) => {
    googleCalenderToken = token;
    oAuth2Client.setCredentials(token);
    injestEvents(oAuth2Client, res)
  });
}

function injestEvents(auth, res) {
  const calendar = google.calendar({
    version: 'v3',
    auth
  });

  calendar.events.list({
    calendarId: 'primary',
    maxResults: 10000,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, data) => {
    const {
      items: events
    } = data.data;
    res.send(events);
  });
}

module.exports = {
  startGoogleCalendarInjest,
  googleCalendarAuthCb
};