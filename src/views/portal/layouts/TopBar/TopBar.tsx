import React from "react";
import { useLayoutContext } from "../../contexts/LayoutContext";

const TopBar: React.FC = (): React.JSX.Element => {
  const { breadcrumb } = useLayoutContext();
  return (
   (
      <div className="flex gap-2 justify-between px-6 py-3 w-full bg-white shadow-sm text-zinc-800 max-md:flex-wrap max-md:px-5 max-md:max-w-full position-sticky top-0">
        <div className="flex items-center text-xl leading-7">
          <div className="flex flex-col flex-1 justify-center my-auto text-sm leading-5 text-gray-800 max-md:max-w-full">
            <div className="flex gap-1 pr-20 max-md:flex-wrap max-md:pr-5">
              {breadcrumb.map((item, index) => (
                <div
                  className={
                    "flex gap-1" + (index === 0 ? " text-blue-900" : "")
                  }
                  key={index}
                >
                  {index !== 0 && (
                    <svg
                      className="shrink-0 my-auto w-4 aspect-square"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.7676 11.8159C5.53792 11.577 5.54537 11.1972 5.78423 10.9675L8.93443 8L5.78423 5.0325C5.54537 4.80282 5.53792 4.423 5.7676 4.18413C5.99727 3.94527 6.3771 3.93782 6.61596 4.1675L10.216 7.5675C10.3336 7.68062 10.4001 7.83679 10.4001 8C10.4001 8.16321 10.3336 8.31938 10.216 8.4325L6.61596 11.8325C6.3771 12.0622 5.99727 12.0547 5.7676 11.8159Z"
                        fill="#6B7280"
                      />
                    </svg>
                  )}
                  <div className="justify-center">{item.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default TopBar;
