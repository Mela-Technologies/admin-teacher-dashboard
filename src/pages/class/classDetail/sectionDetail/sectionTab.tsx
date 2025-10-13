import { useState } from "react";
import {
  Tabs,
  Table,
  Modal,
  Button,
  Row,
  Col,
  Select,
  DatePicker,
  Tag,
} from "antd";
import { SectionDetailCtrlType } from "./sectionDetailController";
import { ColumnsType } from "antd/es/table";
import EditTimetableModal from "./editTimeTable";

interface Student {
  key: string;
  fullName: string;
  gender: string;
}

interface Timetable {
  key: string;
  day: string;
  subject: string;
  period: string;
}

const { Option } = Select;
const SectionTabs = ({
  sectionId,
  controller,
}: {
  sectionId: string;
  controller: SectionDetailCtrlType;
}) => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const students: Student[] = [
    { key: "1", fullName: "Abel Tesfaye", gender: "Male" },
    { key: "2", fullName: "Liya Mekonnen", gender: "Female" },
  ];

  const timetable: Timetable[] = [
    { key: "1", day: "Monday", subject: "Math", period: "1st" },
    { key: "2", day: "Monday", subject: "English", period: "2nd" },
  ];

  const attendanceColumns: ColumnsType<any> = [
    { title: "Date", dataIndex: "date" },
    { title: "Grade", dataIndex: "grade" },
    { title: "Section", dataIndex: "section" },
    { title: "Subject", dataIndex: "subject" },
    { title: "Submitted By", dataIndex: "submittedBy" },
  ];
  const attendanceStudentColumns: ColumnsType<any> = [
    {
      title: "#",
      render: (_, __, index) => index + 1,
    },
    { title: "Full Name", dataIndex: "fullName" },
    { title: "Gender", dataIndex: "gender" },
    { title: "Grade", dataIndex: "grade" },
    { title: "Section", dataIndex: "section" },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "Present" ? "green" : "red"}>{status}</Tag>
      ),
    },
  ];
  console.log(sectionId);
  const tabItems = [
    {
      key: "1",
      label: "Students",
      children: (
        <Table
          columns={[
            { title: "#", render: (_, __, index) => index + 1 },
            { title: "Full Name", dataIndex: "fullName" },
            { title: "Gender", dataIndex: "gender" },
          ]}
          dataSource={students}
          pagination={false}
        />
      ),
    },
    {
      key: "3",
      label: "Timetable",
      children: (
        <>
          <div className="flex justify-end mb-2">
            <Button onClick={() => setIsEditModalVisible(true)}>
              Edit Timetable
            </Button>
          </div>
          <Table
            columns={[
              { title: "Day", dataIndex: "day" },
              { title: "Subject", dataIndex: "subject" },
              { title: "Period", dataIndex: "period" },
            ]}
            dataSource={timetable}
            pagination={false}
          />
        </>
      ),
    },
    {
      key: "2",
      label: "Attendance",
      children: (
        <>
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col>
              <Select
                allowClear
                placeholder="Filter by Section"
                style={{ width: 160 }}
                onChange={(val) => controller.setSelectedSectionFilter(val)}
              >
                <Option value="A">Section A</Option>
                <Option value="B">Section B</Option>
              </Select>
            </Col>
            <Col>
              <DatePicker
                allowClear
                placeholder="Filter by Date"
                onChange={(date) =>
                  controller.setSelectedDateFilter(
                    date
                      ? controller.dayjs(date).format("YYYY-MM-DD")
                      : undefined
                  )
                }
              />
            </Col>
          </Row>

          <Table
            columns={attendanceColumns}
            dataSource={controller.filteredAttendance}
            pagination={false}
            rowKey="key"
            onRow={(record) => ({
              onClick: () => {
                controller.setSelectedAttendance(record);
                controller.setIsAttendanceModalVisible(true);
              },
            })}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={tabItems} />

      {/* Edit Timetable Modal */}
      <EditTimetableModal
        open={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        sectionId={sectionId}
      />

      {/* Attendance Detail Modal */}
      <Modal
        title={
          controller.selectedAttendance
            ? `Attendance Detail - ${controller.selectedAttendance.subject} (${controller.selectedAttendance.date})`
            : "Attendance Detail"
        }
        open={controller.isAttendanceModalVisible}
        onCancel={() => controller.setIsAttendanceModalVisible(false)}
        footer={null}
        width={800}
      >
        <Table
          columns={attendanceStudentColumns}
          dataSource={controller.studentDetails}
          pagination={false}
          rowKey="key"
        />
      </Modal>
    </>
  );
};

export default SectionTabs;
