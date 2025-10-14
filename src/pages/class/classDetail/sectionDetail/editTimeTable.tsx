import { useEffect, useState } from "react";
import { Modal, Table, Select, Button, message, Spin } from "antd";
import { useSectionDetailController } from "./sectionDetailController";

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const EditTimetableModal = ({
  open,
  onClose,
  sectionId,
}: {
  open: boolean;
  onClose: () => void;
  sectionId: string;
}) => {
  const controller = useSectionDetailController();
  const { subjects, getSubjects, fetchSchedule, updateSchedule } = controller;

  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState<
    Record<string, Record<string, string>>
  >({});

  useEffect(() => {
    if (open && sectionId) {
      (async () => {
        setLoading(true);
        await getSubjects(); // Fetch subjects for select options
        const data = await fetchSchedule(sectionId);
        setSchedule(data || {});
        setLoading(false);
      })();
    }
  }, [open, sectionId]);

  const handleChange = (day: string, time: string, subjectId: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: { ...prev[day], [time]: subjectId },
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    const success = await updateSchedule(sectionId, schedule);
    setLoading(false);
    if (success) {
      message.success("Timetable updated successfully");
      onClose();
    } else {
      message.error("Failed to update timetable");
    }
  };

  const timeSlots = [
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:15 - 11:15",
    "11:30 - 12:30",
    "2:00 - 3:00",
    "3:00 - 4:00",
  ];

  const columns = [
    {
      title: "Weekday",
      dataIndex: "day",
      key: "day",
      fixed: "left" as const,
      width: 120,
    },
    ...timeSlots.map((time) => ({
      title: time,
      dataIndex: time,
      key: time,
      render: (_: any, record: any) => (
        <Select
          style={{ width: "100%" }}
          placeholder="Select subject"
          value={schedule[record.day]?.[time] || undefined}
          onChange={(value) => handleChange(record.day, time, value)}
        >
          {subjects.map((sub: any) => (
            <Select.Option key={sub.id} value={sub.id}>
              {sub.name}
            </Select.Option>
          ))}
        </Select>
      ),
    })),
  ];

  const dataSource = weekdays.map((day) => ({
    key: day,
    day,
  }));

  return (
    <Modal
      open={open}
      title="Edit Timetable"
      onCancel={onClose}
      width={"80%"}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={handleSave}
          loading={loading}
        >
          Save
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          bordered
          scroll={{ x: "max-content" }}
        />
      </Spin>
    </Modal>
  );
};

export default EditTimetableModal;
