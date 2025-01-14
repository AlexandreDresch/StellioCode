import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";

import "@schedule-x/theme-default/dist/index.css";
import { useEffect, useMemo, useState } from "react";
import { Event } from "@/types";
import { formatDateToCustomString } from "@/lib/utils";

export default function Calendar({ events }: { events: Event[] }) {
  const eventsService = useState(() => createEventsServicePlugin())[0];

  const calendarEvents = useMemo(
    () =>
      events.map((event) => {
        const endDate = new Date(event.date);
        endDate.setHours(endDate.getHours() + 1);

        return {
          id: event.id,
          title: event.client,
          start: formatDateToCustomString(event.date),
          end: formatDateToCustomString(endDate),
          description: event.project,
        };
      }),
    [events],
  );

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
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
