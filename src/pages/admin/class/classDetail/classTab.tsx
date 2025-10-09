// src/pages/class/ClassTabs.tsx
import React from "react";
import { Tabs, Table } from "antd";

interface Section {
  key: string;
  name: string;
  capacity: number;
  roomNumber: string;
}

interface Props {
  sections: Section[];
}

const ClassTabs: React.FC<Props> = ({ sections }) => {
  const columns = [
    { title: "Section Name", dataIndex: "name" },
    { title: "Capacity", dataIndex: "capacity" },
    { title: "Room Number", dataIndex: "roomNumber" },
  ];

  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Sections" key="1">
        <Table
          columns={columns}
          dataSource={sections}
          pagination={false}
          rowKey="key"
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Students" key="2">
        <p>Students list will appear here</p>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default ClassTabs;
