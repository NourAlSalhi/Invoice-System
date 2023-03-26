import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
function CustomDrawal({ titel, closeDrawal, id, children }: any) {
    return (
        <div
            className="sideDrawal flex flex-col fixed top-0 px-6 py-8 m-2 mt-0 mr-0 right-0 bg-[#F2F4F7] w-[27%]
    h-screen z-[100] border-1 bordr-[#D4D4D4] content-center max-sm:w-[150px] shadow-md overflow-auto
   ">
            <div className="flex  gap-[6.5rem] text-lg font-medium flex-wrap max-sm:flex-1 max-sm:flex-row max-sm:gap-2">
                <ChevronLeftIcon
                    className=" w-[30px] max-sm:w-4"
                    onClick={closeDrawal}
                />
                <h1 className="ml-4 max-sm:text-sm">{titel}</h1>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

export default CustomDrawal;
