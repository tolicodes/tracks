const express = require('express')
var bodyParser = require('body-parser')

require('dotenv').config()

const {
  startGoogleCalendarInjest,
  googleCalendarAuthCb
} = require('./injestors/googleCalendar')

const app = express();
app.use(bodyParser.json())

app.get('/injest/googleCalendar', startGoogleCalendarInjest);

app.get('/injest/googleCalendar/cb', googleCalendarAuthCb)

app.listen(3001)