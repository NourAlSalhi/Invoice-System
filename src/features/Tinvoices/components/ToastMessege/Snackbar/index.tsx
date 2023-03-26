import React, { useState, forwardRef, useImperativeHandle } from "react";
import { CorrectIcon } from "components/svg/Correct";
import { DeleteIcon } from "components/svg/Delete";
// import "../../styles/animeation.css";

// eslint-disable-next-line react/display-name
const Snackbar = forwardRef(({ type, message, className }: any, ref) => {
  const [showToast, setShowToast] = useState(false);

  let positionClassName = `absolute !bottom-[1%] right-[30%] z-[101]
                           bg-[#F2FFF3] rounded border
                           shadow dark:text-gray-400
                           dark:bg-gray-800  toastMsg ${className ?? ""}`;

  useImperativeHandle(ref, () => ({
    ToastMsgHandler() {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    },
  }));
  return (
    <>
      {showToast && (
        <div id="container" className={positionClassName}>
          <div className="flex items-center  max-w-xs p-4 px-14 " role="alert">
            {type === "Deleted" ? (
              <DeleteIcon className="mt-1"></DeleteIcon>
            ) : (
              <CorrectIcon></CorrectIcon>
            )}
            {/* <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200"></div> */}
            <div className="ml-3  text-sm font-medium flex ">{message}</div>
          </div>
        </div>
      )}
    </>

    // <div
    //   className="snackbar"
    //   id={showSnackbar ? "show" : "hide"}
    //   style={{
    //     backgroundColor: type === "success" ? "#00F593" : "#FF0033",
    //     color: type === "success" ? "black" : "white",
    //   }}
    // >
    //   <div className="symbol">
    //     {type === "success" ? <h1>&#x2713;</h1> : <h1>&#x2613;</h1>}
    //   </div>
    //   <div className="message">{message}</div>
    // </div>
  );
});

export default Snackbar;
