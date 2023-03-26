import React from "react";

function ServicesDetails({
  title = "UI/UX Design for Talents Valley LLC",
  amount = "$450",
  description = "Design UI/UX App & web for Talents Valley",
}: any) {
  return (
    <div className="srv-container flex flex-col p-1 pb-6">
      <div className="tit&amount-container flex justify-between">
        <h1 className="font-semibold">{title}</h1>
        <span>{amount}</span>
      </div>
      <p className="text-sm text-[#656565]">{description}</p>
    </div>
  );
}

export default ServicesDetails;
