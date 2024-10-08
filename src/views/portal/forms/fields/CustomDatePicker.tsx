import React, { useState, useEffect } from 'react';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { AnyType } from '../../../../types/baseType';

interface CustomDatePickerProps {
  value: string;
  onChange: (dateString: string) => void;
  placeholder?: string;
  format: string;
}
const CustomDatePicker = React.forwardRef<AnyType, CustomDatePickerProps>(
  ({ value, onChange, placeholder = "Chọn ngày" , format = "DD-MM-YYYY" }, ref) => {
    const [date, setDate] = useState<Dayjs | null>(null);
    useEffect(() => {
      setDate(value ? dayjs(value, format) : null);
    }, [value]);
    return (
      <DatePicker
        className="w-full"
        ref={ref}
        value={date}
        onChange={(date) => {
          setDate(date);
          if (date.isValid()) {
            onChange(date.format(format));
          }
        }}
        placeholder={placeholder}
        format="DD-MM-YYYY"
        size="large"
                        suffixIcon={
                          <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="shrink-0 w-5 aspect-square"
                        >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.75 2C6.16421 2 6.5 2.33579 6.5 2.75V4H13.5V2.75C13.5 2.33579 13.8358 2 14.25 2C14.6642 2 15 2.33579 15 2.75V4H15.25C16.7688 4 18 5.23122 18 6.75V15.25C18 16.7688 16.7688 18 15.25 18H4.75C3.23122 18 2 16.7688 2 15.25V6.75C2 5.23122 3.23122 4 4.75 4H5V2.75C5 2.33579 5.33579 2 5.75 2ZM4.75 7.5C4.05964 7.5 3.5 8.05964 3.5 8.75V15.25C3.5 15.9404 4.05964 16.5 4.75 16.5H15.25C15.9404 16.5 16.5 15.9404 16.5 15.25V8.75C16.5 8.05964 15.9404 7.5 15.25 7.5H4.75Z"
                      fill="#6B7280"
                    />
                  </svg>
                  }
      />
    );
  }
);

CustomDatePicker.displayName = 'CustomDatePicker';

export default CustomDatePicker;
