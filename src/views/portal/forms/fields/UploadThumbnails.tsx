import React, { DragEvent, useEffect, useState } from 'react';
import { UploadService } from "../../services/uploadService";
import { inject } from '../../../../utils/inject';
import { LoadingService } from '../../../../services/loadingService';

interface UploadThumbnailsProps {
  title: string;
  value: string | null;
  onChange: (value: string | null) => void;
  required?: boolean;
}

const UploadThumbnails: React.FC<UploadThumbnailsProps> = ({ title,  value, onChange, required}) => {
  const [ service ] = useState(inject(UploadService));
  const [loadingService] = useState(inject(LoadingService));
  const [thumbnail, setThumbnail] = useState(value);
  const [isDragOver, setIsDragOver] = useState(false);
  
  useEffect(() => {
      setThumbnail(value);
  },[value]);
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileDrop(e.dataTransfer.files[0]);
    }
  };
  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files?.length > 0) {
      const file = files[0];
      onFileDrop(file);
    }
  };
 const onFileDrop = (file : File) => {
    loadingService.show();
    service.uploadImage(file).subscribe( rs => {
      setThumbnail(`https://drive.google.com/thumbnail?id=${rs.data.id}&sz=w1000`);
      onChange(`https://drive.google.com/thumbnail?id=${rs.data.id}&sz=w1000`);
      loadingService.hide();
    });
  };
  return (
    <div className="flex flex-col max-md:max-w-full">
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
      <div className="flex flex-col justify-center p-5 mt-2 bg-gray-50 rounded-md border border-gray-300 border-solid max-md:max-w-full">
       {thumbnail &&   <div>
    <div className="flex justify-center items-center px-16 max-md:px-5 max-md:max-w-full">
          <img
            loading="lazy"
            src={thumbnail}
            className="max-w-full h-auto w-[343px]"
          />
        </div>
        <div className="flex flex-col mt-4 max-md:max-w-full">
          <div className="flex gap-1 justify-center self-center text-sm leading-5 text-gray-900 whitespace-nowrap max-md:flex-wrap">
          <svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="rounded shrink-0 w-5 aspect-square"
  >
    <g clipPath="url(#clip0_32_69171)">
      <path
        d="M14.1665 2.78357C15.4234 3.50928 16.469 4.55067 17.1997 5.80465C17.9304 7.05863 18.321 8.48171 18.3327 9.93302C18.3444 11.3843 17.9769 12.8135 17.2665 14.0792C16.5561 15.3448 15.5275 16.4029 14.2825 17.1488C13.0375 17.8948 11.6193 18.3026 10.1683 18.332C8.7172 18.3613 7.28363 18.0112 6.00947 17.3163C4.7353 16.6213 3.66473 15.6057 2.90373 14.3698C2.14272 13.134 1.71768 11.7208 1.67067 10.2702L1.6665 10.0002L1.67067 9.73024C1.71734 8.29106 2.13613 6.88854 2.8862 5.6594C3.63628 4.43026 4.69205 3.41645 5.95058 2.7168C7.20911 2.01716 8.62746 1.65557 10.0673 1.66727C11.5072 1.67897 12.9195 2.06357 14.1665 2.78357ZM13.089 7.7444C12.9455 7.60092 12.7546 7.51473 12.5521 7.502C12.3496 7.48926 12.1493 7.55086 11.989 7.67524L11.9107 7.7444L9.1665 10.4877L8.089 9.41107L8.01067 9.3419C7.85032 9.21762 7.65015 9.15609 7.44767 9.16886C7.2452 9.18164 7.05434 9.26783 6.91089 9.41129C6.76744 9.55474 6.68124 9.7456 6.66847 9.94807C6.65569 10.1505 6.71722 10.3507 6.8415 10.5111L6.91067 10.5894L8.57734 12.2561L8.65567 12.3252C8.80182 12.4386 8.98153 12.5002 9.1665 12.5002C9.35148 12.5002 9.53119 12.4386 9.67734 12.3252L9.75567 12.2561L13.089 8.92274L13.1582 8.8444C13.2825 8.68407 13.3441 8.48386 13.3314 8.28133C13.3187 8.07881 13.2325 7.8879 13.089 7.7444Z"
        fill="#22C55E"
      />
    </g>
    <defs>
      <clipPath id="clip0_32_69171">
        <rect width={20} height={20} fill="white" />
      </clipPath>
    </defs>
  </svg>
              <div className="justify-center">
              TenAnh.jpeg
            </div>
          </div>
          <div className="flex justify-center items-center px-16 mt-2 text-xs leading-4 text-gray-500 max-md:px-5 max-md:max-w-full">
            <div className="flex gap-2">
              <div>Size: 342KB</div>
              <div>-</div>
              <div onClick={() => setThumbnail("")} className="cursor-pointer justify-center text-red-700">
                Xoá ảnh
              </div>
            </div>
          </div>
        </div>
      </div> } 
       {!thumbnail && (
 <div
 className={`relative  flex flex-col p-4 rounded-2xl  max-md:max-w-full`}
>
  <div
    onDragEnter={handleDragEnter}
    onDragOver={handleDragOver}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
   className={` ${
   isDragOver ? "rounded-2xl bg-blue-100 opacity-60  flex" : ""
 }  absolute top-0 left-0 right-0 bottom-0 w-full h-full`} ></div>

 <div className="flex  justify-center items-center px-16 py-4 mt-4 max-md:px-5 max-md:max-w-full">
   <div className="flex flex-col max-w-full w-[243px]">
     <div className="flex justify-center items-center self-center px-4  h-[88px] rounded-[999px] w-[88px]">
        <svg
           className="w-full aspect-square"
    width={56}
    height={56}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M49 35V44.3333C49 45.571 48.5083 46.758 47.6332 47.6332C46.758 48.5083 45.571 49 44.3333 49H11.6667C10.429 49 9.242 48.5083 8.36683 47.6332C7.49167 46.758 7 45.571 7 44.3333V35"
      stroke="#7A7A7A"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M39.6663 18.6667L27.9997 7L16.333 18.6667"
      stroke="#7A7A7A"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28 7V35"
      stroke="#7A7A7A"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
     </div>

     <div className="mt-2 text-sm font-semibold leading-5 text-center text-stone-900">
       Kéo thả file vào đây để tải ảnh lên
     </div>
     <div className="mx-5 mt-1 text-xs font-medium leading-4 text-neutral-600 max-md:mx-2.5">
       (định dạng .jpeg .png, tối đa 5mb)
     </div>
     <label className="z-10 cursor-pointer justify-center self-center px-4 py-2 mt-2 text-base font-bold leading-6 text-blue-800 rounded-lg border border-solid border-neutral-200 max-md:px-5">
       Chọn tập tin
       <input
         type="file"
         onChange={uploadFile}
         style={{ display: "none" }}
       />
     </label>
   </div>
 </div>
</div> 
       )}   
      </div>
    </div>
  </div>
  );
};

export default UploadThumbnails;
