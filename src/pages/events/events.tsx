import { Input, DatePicker, Button, Card } from "antd";
import {
  SearchOutlined,
  ReloadOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import TopActionBar from "../../components/topActionBar";
import { useEventCtrl } from "./eventController";
import { useNavigate } from "react-router-dom";
import { UserRole } from "../../types/user";

const { RangePicker } = DatePicker;

const EventPage = ({ role }: { role: UserRole }) => {
  const { t } = useTranslation();
  const controller = useEventCtrl();
  const navigator = useNavigate();
  return (
    <div className={`min-h-screen  ${role}`}>
      {/* 🔹 Top Action Bar */}
      <TopActionBar
        title={t("events")}
        addBtnText={t("addEvent")}
        hasSelection={false}
        onRefresh={() => controller.setRefresh((prev) => !prev)}
        onAddUser={() => navigator("add")}
      />

      {/* 🔹 Search & Filter */}
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 border-b border-gray-200 ">
        <Input
          placeholder={t("searchByTitle")}
          prefix={<SearchOutlined />}
          value={controller.searchTerm}
          onChange={(e) => controller.setSearchTerm(e.target.value)}
          allowClear
          className="max-w-xs"
        />

        <RangePicker
          value={controller.dateRange}
          onChange={(dates) => controller.setDateRange(dates)}
          allowClear
        />

        <Button
          icon={<ReloadOutlined />}
          onClick={controller.resetFilters}
          className="flex items-center"
        >
          {t("clearFilters")}
        </Button>
      </div>

      {/* 🔹 Events Grid */}
      <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {controller.filteredEvents.map((event) => (
          <Card
            key={event.key}
            variant="borderless"
            className="relative shadow-sm rounded-xl hover:shadow-md transition-all border-l-4 bg-white"
            style={{ borderLeftColor: event.color }}
          >
            <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{event.message}</p>
            <div className="text-gray-500 text-xs flex items-center gap-1">
              <CalendarOutlined />
              {dayjs(event.date).format("MMM DD, YYYY")}
            </div>
          </Card>
        ))}

        {/* No Results */}
        {controller.filteredEvents.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400">
            {t("noEventsFound")}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPage;
