import React, { useState } from "react";
import PindingClock from "components/svg/PindingClock";
import ActiveSvg from "components/svg/Active";
import InActiveSvg from "components/svg/InActive";
import DisapprovedSvg from "components/svg/Disapproved";

function Status({ status = "Pending Approval" }: any) {
    const date: any = new Date().toDateString();

    return (
        <div className="main-container flex w-full justify-between p-2">
            <div className="status-containr flex flex-col p-2 text-sm ">
                <div className="icon&title flex">
                    <PindingClock />
                    <h1 className="text-[#DAA545] m-1 font-semibold ml-2 "> {status}</h1>
                </div>
                <p className="block time text-[#8C8C8C] text-xs ml-5">
                    Estimate: 24 hours.
                </p>
            </div>
            <p className="text-[#8C8C8C] text-[10px] pt-4">{date}</p>
            {/* {console.log(date)} */}
        </div>
    );
}

export default Status;
