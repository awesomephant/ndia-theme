<?php

header("Content-type: text/calendar");
header("Content-Disposition: attachment; filename=calendar.ics");

print("BEGIN:VCALENDAR\n");
print("VERSION:2.0\n");
print("BEGIN:VEVENT\n");
print("URL:https://www.eventbrite.co.uk/e/too-many-red-flags-contemporary-left-and-its-visual-culture-tickets-149325453451\n");
print("DTSTART:20210415T150000Z\n");
print("DTEND:20210415T180000Z\n");
print("SUMMARY:Too Many Red Flags? contemporary left and its visual culture\n");
print("DESCRIPTION:For details, go here:\nhttps://www.eventbrite.co.uk/e/too-many-red-flags-contemporary-left-and-its-visual-culture-tickets-149325453451\n\nTo access the online event page, go here:\nhttps://www.eventbrite.co.uk/x/too-many-red-flags-contemporary-left-and-its-visual-culture-tickets-149325453451\n");
print("LOCATION:\n");
print("END:VEVENT\n");
print("END:VCALENDAR\n");