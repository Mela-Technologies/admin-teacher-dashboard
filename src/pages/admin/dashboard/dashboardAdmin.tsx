import { useTranslation } from "react-i18next";
import Announcements from "../../../components/announcements";
import AttendanceChart from "../../../components/attendanceChart";
import CountChart from "../../../components/countChar";
import EventCalendar from "../../../components/eventCalander";
import FinanceChart from "../../../components/financeChart";
import UserCard from "../../../components/userCard";

const DashBoardAdmin = () => {
  const { t } = useTranslation();
  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 flex gap-4 flex-col md:flex-row">
        {/* LEFT */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          {/* USER CARDS */}
          <div className="flex gap-4 justify-between flex-wrap">
            <UserCard type={t("student")} />
            <UserCard type={t("teacher")} />
            <UserCard type={t("parent")} />
            <UserCard type={t("staff")} />
          </div>
          {/* MIDDLE CHARTS */}
          <div className="flex gap-4 flex-col lg:flex-row">
            {/* COUNT CHART */}
            <div className="w-full lg:w-1/3 h-[450px]">
              <CountChart />
            </div>
            {/* ATTENDANCE CHART */}
            <div className="w-full lg:w-2/3 h-[450px]">
              <AttendanceChart />
            </div>
          </div>
          {/* BOTTOM CHART */}
          <div className="w-full h-[500px]">
            <FinanceChart />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full lg:w-1/3 flex flex-col gap-8">
          <EventCalendar />
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default DashBoardAdmin;
