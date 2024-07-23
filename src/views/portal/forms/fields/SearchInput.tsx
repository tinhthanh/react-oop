import React, { forwardRef, useState} from 'react';
import { AnyType } from '../../../../types/baseType';
interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  debounce?: number;
}
function debouncefunc<T extends (...args: AnyType[]) => void>():(func: T, wait: number) => void {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function executedFunction(func: T, wait: number): void {
    const later = () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
      func();
    };
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, placeholder = "Nhập từ khoá tìm kiếm" , debounce = 500}, ref) => {
    const [searchText, setSearchText] = useState<string>(value);
    const onChangeText = React.useMemo(debouncefunc, []);
    return (
      <div className="flex flex-col justify-center max-md:max-w-full">
        <div className="relative flex flex-col justify-center w-full">
          <input
            ref={ref}
            value={searchText}
            onChange={ (e) => {
              setSearchText(e.target.value);
              onChangeText(()=> {
                onChange(e);
              }, debounce);
            }}
            placeholder={placeholder}
            className="text-gray-400 flex gap-2 py-2 pl-8 bg-white rounded-lg border border-gray-300 border-solid"
          />
          <svg
            className="absolute shrink-0 w-5 aspect-square left-2"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9 3.5C5.96243 3.5 3.5 5.96243 3.5 9C3.5 12.0376 5.96243 14.5 9 14.5C10.519 14.5 11.893 13.8852 12.8891 12.8891C13.8852 11.893 14.5 10.519 14.5 9C14.5 5.96243 12.0376 3.5 9 3.5ZM2 9C2 5.13401 5.13401 2 9 2C12.866 2 16 5.13401 16 9C16 10.6625 15.4197 12.1906 14.4517 13.3911L17.7803 16.7197C18.0732 17.0126 18.0732 17.4874 17.7803 17.7803C17.4874 18.0732 17.0126 18.0732 16.7197 17.7803L13.3911 14.4517C12.1906 15.4197 10.6625 16 9 16C5.13401 16 2 12.866 2 9Z"
              fill="#6B7280"
            />
          </svg>
        </div>
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
