//import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AgeBarChart = ({ ageRanges }) => {
  const data = Object.entries(ageRanges).map(([range, count]) => ({ range, count }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#504c9c" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const SexBarChart = ({ userSexes }) => {
  const data = [
    { sex: 'Male', count: userSexes.Male },
    { sex: 'Female', count: userSexes.Female },
    { sex: 'Other', count: userSexes.Other },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="sex" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#4d8b65" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export { AgeBarChart, SexBarChart };