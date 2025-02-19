import React from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ActivityEntry {
  date: string;
  walkDuration: number;
  walkDistance: number;
  playDuration: number;
}

interface ActivityChartProps {
  data: ActivityEntry[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="walkDuration" name="Walk Duration (min)" fill="#8884d8" />
        <Bar yAxisId="right" dataKey="walkDistance" name="Walk Distance (km)" fill="#82ca9d" />
        <Bar yAxisId="left" dataKey="playDuration" name="Play Duration (min)" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ActivityChart;

