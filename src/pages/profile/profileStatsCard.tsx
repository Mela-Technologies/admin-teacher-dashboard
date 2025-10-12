import React from "react";
import { Card } from "antd";

interface Props {
  title: string;
  value: string | number;
  bottom: string;
}

const ProfileStatsCard: React.FC<Props> = ({ title, value, bottom }) => {
  return (
    <Card className="text-left shadow-sm border border-gray-100">
      <h4 className="text-gray-400 text-sm font-semibold">{title}</h4>
      <p className="text-2xl font-semibold mt-2">{value}</p>
      <p className="text-gray-400 text-xs">{bottom}</p>
    </Card>
  );
};

export default ProfileStatsCard;
