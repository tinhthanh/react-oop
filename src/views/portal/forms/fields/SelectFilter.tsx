import { Select } from 'antd';
import React from 'react';

interface SelectFilterProps {
    label: string;
    items: { label: string; value: string | null }[];
    value: string | null;
    onChange: (value: string | null) => void;
}

const SelectFilter: React.FC<SelectFilterProps> = ({ label, items, value, onChange }) => {
    return (
        <>
            <div className="flex gap-0 px-3 items-center bg-white rounded-lg border border-gray-200 border-solid shadow-sm">
                <div className="justify-center text-sm font-medium leading-5 text-center text-gray-400">
                    {label}
                </div>
                <div className="justify-center pr-1 text-sm font-medium leading-5 text-center whitespace-nowrap text-sky-950 text-opacity-40">
                    :
                </div>
                <div className="flex-1 justify-center text-sm font-medium leading-5 text-gray-800">
                    <Select
                        allowClear={true}
                        className="w-full min-w-36"
                        placeholder="Tất cả"
                        variant="borderless"
                        style={{ flex: 1 }}
                        value={value}
                        onChange={onChange}
                        options={
                            items
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default SelectFilter;
