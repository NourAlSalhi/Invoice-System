import { IconButton } from "components";
import { XMarkIconMini } from "lib/@heroicons";
import { Children } from "types";

function TransferCard({
  centerTitle = true,
  title,
  children,
  closeModal,
}: {
  centerTitle: boolean;
  title: string;
  children: Children;
  closeModal: any;
  className: string;
}) {
  return (
    <div>
      <IconButton
        className="absolute top-3 right-4 sm:top-3 sm:right-4 "
        buttonSize="large"
        onClick={closeModal}
      >
        {" "}
        <XMarkIconMini />
      </IconButton>
      <h2
        className={`font-bold text-lg mb-5 text-${
          centerTitle ? "center" : "left"
        }`}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

export default TransferCard;
