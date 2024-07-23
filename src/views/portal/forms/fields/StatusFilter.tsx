import React from 'react';

interface StatusFilterProps {
  items: { title: string; value: number | null }[];
  value: number | null;
  onChange: (value: number | null) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ items, value, onChange }) => {
  return (
    <div className="flex gap-0 px-5 text-center bg-white rounded-t-lg border-b border-gray-200 border-solid max-md:flex-wrap max-md:max-w-full">
      {items.map((item) => (
        <div
          key={item.value}
          onClick={() => onChange(item.value)}
          className="flex flex-col justify-center bg-white bg-opacity-0 cursor-pointer"
        >
          <div className="flex gap-1 justify-center px-5 pt-5 pb-4">
            <div className="text-sm font-medium leading-5 text-gray-900">
              {item.title}
            </div>
          </div>
          {value === item.value && (
            <div className="shrink-0 h-1 bg-blue-500 rounded" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StatusFilter;
