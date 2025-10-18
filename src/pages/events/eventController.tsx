import { Form } from "antd";
import { useState, useEffect, useMemo } from "react";
import dayjs, { Dayjs } from "dayjs";

export interface EventFormValues {
  title: string;
  message: string;
  date: Dayjs;
}

export interface EventType {
  key: number;
  title: string;
  message: string;
  date: string; // ISO date string
  color: string;
}

export const useEventCtrl = (editData?: EventFormValues) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(editData?.title || "");
  const [message, setMessage] = useState(editData?.message || "");
  const [date, setDate] = useState<Dayjs | null>(editData?.date || null);

  const [events, setEvents] = useState<EventType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);
  const [refresh, setRefresh] = useState(false);

  // ── Fetch Events (example static data)
  useEffect(() => {
    fetchEvents();
  }, [refresh]);

  const fetchEvents = () => {
    const sampleEvents: EventType[] = [
      {
        key: 1,
        title: "Science Fair",
        message:
          "Join us for the annual Science Fair showcasing student innovation.",
        date: "2025-10-20",
        color: "#0284c7",
      },
      {
        key: 2,
        title: "Parent Meeting",
        message:
          "Quarterly parent-teacher meeting for student progress updates.",
        date: "2025-10-25",
        color: "#16a34a",
      },
      {
        key: 3,
        title: "Sports Day",
        message: "A full day of sports activities and competitions.",
        date: "2025-11-05",
        color: "#f59e0b",
      },
      {
        key: 4,
        title: "Graduation Ceremony",
        message: "Celebrating our final-year students' achievements.",
        date: "2025-11-18",
        color: "#dc2626",
      },
    ];

    setEvents(sampleEvents);
  };

  // ── Add/Edit Event Handler
  const submit = async (values: EventFormValues) => {
    setLoading(true);
    try {
      const newEvent: EventType = {
        key: events.length + 1,
        title: values.title,
        message: values.message,
        date: values.date.toISOString(),
        color: "#0284c7",
      };

      // Simulate saving (could replace with an API call)
      setEvents((prev) => [...prev, newEvent]);
      console.log("Event Submitted:", newEvent);
      return Promise.resolve(newEvent);
    } finally {
      setLoading(false);
    }
  };

  // ── Filter Logic
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDate =
        !dateRange ||
        (!dateRange[0] && !dateRange[1]) ||
        (dayjs(event.date).isAfter(dayjs(dateRange[0])) &&
          dayjs(event.date).isBefore(dayjs(dateRange[1])));
      return matchesSearch && matchesDate;
    });
  }, [events, searchTerm, dateRange]);

  const resetFilters = () => {
    setSearchTerm("");
    setDateRange(null);
  };

  return {
    // Form-related
    form,
    loading,
    title,
    message,
    date,
    setTitle,
    setMessage,
    setDate,
    submit,

    // Event list & filtering
    events,
    filteredEvents,
    searchTerm,
    setSearchTerm,
    dateRange,
    setDateRange,
    setRefresh,
    resetFilters,
  };
};

export type EventCtrlType = ReturnType<typeof useEventCtrl>;
