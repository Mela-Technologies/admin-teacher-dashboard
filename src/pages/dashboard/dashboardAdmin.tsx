import { useTranslation } from "react-i18next";
import Announcements from "../../components/dashboard/announcements";
import AttendanceChart from "../../components/dashboard/attendanceChart";
import CountChart from "../../components/dashboard/countChar";
import EventCalendar from "../../components/dashboard/eventCalander";
import UserCard from "../../components/dashboard/userCard";
import { useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { App } from "antd";

const DashBoardAdmin = () => {
  const { t } = useTranslation();
  const [summary, setSummary] = useState({
    students: 0,
    maleStudents: 0,
    femaleStudents: 0,
    teachers: 0,
    parents: 0,
  });
  const [attendaceSummary, setAttendanceSummary] = useState<
    | {
        name: string;
        present: number;
        absent: number;
      }[]
    | undefined
  >();
  const [eventSummary, setEventSummary] = useState();
  const [noticeSummary, setNoticeSummary] = useState();
  const axios = useAxios();
  const { message } = App.useApp();
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await Promise.allSettled([
          axios.get("/api/dashboard/summary"),
          axios.get("/api/dashboard/attendance-summary"),
          axios.get("/api/dashboard/events"),
          axios.get("/api/dashboard/notices"),
        ]);

        const [summaryResult, attendance, events, notices] = res;

        // Summary
        if (summaryResult.status === "fulfilled") {
          setSummary(summaryResult.value.data);
        } else {
          message.error(`Failed to fetch summary: ${summaryResult.reason}`);
        }

        // Attendance
        if (attendance.status === "fulfilled") {
          setAttendanceSummary(
            Object.entries(attendance.value.data.summary)
              .map(([key, val]) => {
                const entry = val as { present: number; absent: number };
                return {
                  name: key.substring(0, 3),
                  present: entry.present,
                  absent: entry.absent,
                };
              })
              .slice(0, 5)
          );
        } else {
          message.error(`Failed to fetch attendance:${attendance.reason}`);
        }

        // Events
        if (events.status === "fulfilled") {
          setEventSummary(events.value.data.events);
        } else {
          message.error(`Failed to fetch events: ${events.reason}`);
        }
        // Notices
        if (notices.status === "fulfilled") {
          setNoticeSummary(notices.value.data.events);
        } else {
          message.error(`Failed to fetch notices: ${notices.reason}`);
        }
      } catch (err) {
        message.error(`${err}`);
      }
    };

    fetchSummary();
    console.log(eventSummary, noticeSummary);
  }, []);

  return (
    <div className="h-full">
      <div className="h-full p-4 flex gap-4 flex-col md:flex-row">
        {/* LEFT */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {/* USER CARDS */}
          <div className="flex gap-4 justify-between flex-wrap">
            <UserCard type={t("student")} value={summary.students} />
            <UserCard type={t("teacher")} value={summary.teachers} />
            <UserCard type={t("parent")} value={summary.parents} />
            <UserCard type={t("staff")} value={summary.teachers} />
          </div>
          {/* MIDDLE CHARTS */}
          <div className="flex gap-4 flex-col lg:flex-row">
            {/* COUNT CHART */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <CountChart
                boys={summary.maleStudents}
                girls={summary.femaleStudents}
              />
            </div>
            {/* ATTENDANCE CHART */}
            <div className="w-full lg:w-2/3 h-[450px]">
              <AttendanceChart data={attendaceSummary} />
            </div>
          </div>
          {/* BOTTOM CHART */}
          {/* <div className="w-full h-[500px]">
            <FinanceChart />
          </div> */}
        </div>
        {/* RIGHT */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8 h-full overflow-y-auto">
          <EventCalendar />
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default DashBoardAdmin;
