import React from "react";
import TransferCard from "../TransferCard";
import { Button } from "components";
import Modal from "../Modal";
// import useModal from "hooks/useModal";

function ConfirmCard({
  isOpen,
  changeModalState,
  content,
  handelButtonYes
}: any) {
  // const modalObj = useModal();

  return (
    <>
      <Modal
        closeModal={changeModalState}
        openModal={changeModalState}
        isOpen={isOpen}
        changeModalState={undefined}
        className="z-[9999]"
      >
        <TransferCard
          centerTitle={false}
          title=""
          closeModal={changeModalState}
          className=""
        >
          <div className="mb-10 mt-10">
            <p className="text-lg font-[499] ml-4 pb-2">Are you sure you want to {content} ?</p>
          </div>
          <div className="flex gap-3">
            <Button
              fullWidth={true}
              className="!bg-transparent text-black hover:bg-blue border-gray-light border-2"
              onClick={changeModalState}
            >
              No
            </Button>
            <Button className="!bg-[#D84242] !text-white" fullWidth={true} onClick={handelButtonYes}>
              Yes
            </Button>
          </div>
        </TransferCard>
      </Modal>
    </>
  );
}
export default ConfirmCard;
