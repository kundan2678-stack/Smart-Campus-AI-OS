import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor }) => {
  return (
    <div className={`${bgColor} rounded-lg shadow-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-700 font-semibold">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;