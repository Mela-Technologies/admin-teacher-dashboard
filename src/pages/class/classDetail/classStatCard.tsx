// src/pages/class/ClassStatsCard.tsx
import React from "react";
import { Card } from "antd";

interface Props {
  title: string;
  value: string | number;
  bottom?: string;
}

const ClassStatsCard: React.FC<Props> = ({ title, value, bottom }) => {
  return (
    <Card className="shadow-sm text-center">
      <h4 className="font-medium text-gray-600">{title}</h4>
      <p className="text-2xl font-semibold">{value}</p>
      {bottom && <p className="text-gray-500">{bottom}</p>}
    </Card>
  );
};

export default ClassStatsCard;
