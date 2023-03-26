import React, { useState } from "react";
// import Preview from "../../components/Drawal/components/Preview";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import LinkDetails from "../LinkDrawal";

function Drawal({
  titel = "Link",
  closeDrawal,
  openDrawal,
  id,
  type,
  children,
}: any) {
  // const [isShowen, setIsShowen] = useState(true);
  return (
    <>
      {openDrawal && (
        <div
          className="sideDrawal flex flex-col fixed top-0 p-4 m-2 mt-0 mr-0 right-0 bg-[#F2F4F7]
    w-[26%]
    h-screen z-[100] border-1 bordr-[#D4D4D4] content-center max-sm:w-[150px] shadow-md overflow-auto
   "
        >
          <div className="flex  gap-[6.5rem] p-4 text-lg font-medium flex-wrap max-sm:flex-1 max-sm:flex-row max-sm:gap-2">
            <ChevronLeftIcon
              className=" w-[30px] max-sm:w-4 cursor-pointer"
              onClick={() => closeDrawal(false)}
            />
            <h1 className="ml-4 max-sm:text-sm">{titel}</h1>
          </div>
          <div className="border-x-2 flex w-full flex-col p-2">
            {/* <Status />
            <ServicesDetails />
            <LinkInput></LinkInput>
            <Details></Details>
            <TimeLine />
            <Preview />
            <DrawalButtons /> */}
            {children}
            <LinkDetails></LinkDetails>
          </div>
        </div>
      )}
    </>
  );
}

export default Drawal;
