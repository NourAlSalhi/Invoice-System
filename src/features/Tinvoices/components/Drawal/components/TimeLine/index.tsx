import React from "react";
import { Card } from "components";
type Props = {
  // item: any;
};

function TimeLine({}: Props) {
  const date = new Date();
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 1
  );
  let dateText = "";
  if (date >= today) {
    dateText = "Today";
  } else if (date >= yesterday) {
    dateText = "Yesterday";
  } else {
    dateText = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  return (
    <Card className="m-1 relative">
      <ol className="text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400 pt-4">
        <li key={1} className="grid grid-cols-5 divide-x relative ">
          <div className=" flex flex-col pb-3 mr-1">
            <div className="text-xs">{formattedTime} </div>
            <div className="text-xs">{dateText} </div>
          </div>
          <span className="absolute w-3 h-3 mt-2 ml-[18.5%] bg-[#4375FF] rounded-full dark:ring-gray-900 dark:bg-blue-900"></span>
          <div className="font-medium pl-5 ">Pinding</div>
        </li>
      </ol>
    </Card>
  );
}

export default TimeLine;
