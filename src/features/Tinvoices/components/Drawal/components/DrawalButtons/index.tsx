import React, { useState } from "react";
import { Button } from "components";
import ConfirmCard from "features/Tinvoices/components/ConfirmCard";

type Props = {
  title: string;
  description: string;
  ampont: number;
};

function DrawalButtons({}: any) {
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="flex w-full justify-center gap-[20%]">
      {showConfirm && (
        <ConfirmCard
          isOpen={showConfirm}
          changeModalState={() => {
            setShowConfirm(false);
          }}
        />
      )}
      <Button
        onClick={() => {
          setShowConfirm(true);
        }}
        className="w-[40%] !bg-white !text-gray-dark"
        buttonSize="large"
      >
        Cancel
      </Button>
      <Button buttonSize="large" className="w-[40%] !bg-white !text-[#4375FF]">
        Edit
      </Button>
      {/* {showConfirm && (
        <ConfirmCard
          isOpen={showConfirm}
          changeModalState={() => {
            setShowConfirm(false);
          }}
        />
      )} */}
    </div>
  );
}

export default DrawalButtons;
