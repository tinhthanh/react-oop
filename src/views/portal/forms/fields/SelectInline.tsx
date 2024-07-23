import React from 'react';

interface SelectInlineProps {
  title: string;
  items: { title: string; value: string | null }[];
  value: string | null;
  onChange: (value: string | null) => void;
  required?: boolean;
}

const SelectInline: React.FC<SelectInlineProps> = ({ title, items, value, onChange, required}) => {
  return (
    <>
      <div className="flex flex-col max-md:max-w-full">
        <div className="flex gap-0 max-md:flex-wrap">
          <div className="text-sm font-medium leading-5 text-gray-800">
            {title}
          </div>
          {required && (
             <div className="my-auto text-xs font-semibold leading-4 text-red-600 max-md:max-w-full">
             *
           </div>
          )}
        </div>
        <div className="flex gap-2 self-start mt-2 text-sm leading-5 text-center">
          {items.map((item) => (
            <button type="button" key={item.value} onClick={() => onChange(item.value)} className={(value === item.value ? "bg-emerald-50 text-green-600 border-green-600" : "bg-white text-gray-800 border-gray-200") + "cursor-pointer justify-center px-3 py-1   rounded-3xl border  border-solid"}>
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectInline;
