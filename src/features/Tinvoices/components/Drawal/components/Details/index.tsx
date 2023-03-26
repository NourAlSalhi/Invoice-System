import { Card } from "components";
import React from "react";

type Props = {
  balance: Number;
  paidInv: Number;
  fees: Number;
  total: Number;
};

function Details({ balance = 0.0, paidInv = 0, fees = 0.0, total = 0.0 }) {
  return (
    <Card className="m-1">
      <div className="container flex flex-col">
        <div className="flex gap-2 text-[#8C8C8C] justify-between m-2 ">
          <p>Balance</p>
          <p>Paid INV</p>
          <p>Fees</p>
          <p>Total</p>
        </div>
        <div className="flex gap-2 justify-between m-3 ">
          <p>${balance}</p>
          <p>${paidInv}</p>
          <p>${fees}</p>
          <p>${total}</p>
        </div>
      </div>
    </Card>
  );
}

export default Details;
