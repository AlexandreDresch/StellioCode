import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";

import "@schedule-x/theme-shadcn/dist/index.css";
import { useEffect, useMemo, useState } from "react";
import { Meeting } from "@/types";
import { formatDateToCustomString } from "@/lib/utils";

export default function Calendar({ events }: { events: Meeting[] }) {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendarEvents = useMemo(() => {
    return events
      .map((event) => {
        const startDate = new Date(event.scheduledAt + ":00");
        if (isNaN(startDate.getTime())) {
          console.error("Invalid date format:", event.scheduledAt);
          return null;
        }

        const endDate = new Date(startDate);
        endDate.setHours(endDate.getHours() + 1);

        return {
          id: event.id,
          title: event.clientName,
          start: formatDateToCustomString(startDate),
          end: formatDateToCustomString(endDate),
          description: event.projectName,
        };
      })
      .filter((event): event is NonNullable<typeof event> => event !== null);
  }, [events]);

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    theme: 'shadcn',
    events: calendarEvents,
    plugins: [eventsService, createEventModalPlugin()],
    locale: "pt-BR",
  });

  useEffect(() => {
    eventsService.getAll();
  }, [eventsService]);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}
