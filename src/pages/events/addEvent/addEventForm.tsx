import React from "react";
import { Form, Input, DatePicker } from "antd";
import { useTranslation } from "react-i18next";
import { EventCtrlType } from "../eventController";

const { TextArea } = Input;

interface Props {
  ctrl: EventCtrlType;
}

const AddEventForm: React.FC<Props> = ({ ctrl }) => {
  const { t } = useTranslation();

  return (
    <Form layout="vertical" form={ctrl.form} className="rounded">
      <div className="space-y-6 p-4 bg-white rounded shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold">{t("Event Information")}</h3>

        <Form.Item
          label={t("Title")}
          name="title"
          rules={[{ required: true, message: t("Please enter event title") }]}
        >
          <Input
            placeholder={t("Enter event title")}
            value={ctrl.title}
            onChange={(e) => ctrl.setTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={t("Message")}
          name="message"
          rules={[{ required: true, message: t("Please enter event message") }]}
        >
          <TextArea
            rows={4}
            placeholder={t("Enter event message")}
            value={ctrl.message}
            onChange={(e) => ctrl.setMessage(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label={t("Date")}
          name="date"
          rules={[{ required: true, message: t("Please select event date") }]}
        >
          <DatePicker
            className="w-full"
            value={ctrl.date}
            onChange={(val) => ctrl.setDate(val)}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default AddEventForm;
