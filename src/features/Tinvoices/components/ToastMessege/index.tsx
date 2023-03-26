import React, { useEffect, useState, useRef } from "react";
import { Button } from "components";
import { CorrectIcon } from "components/svg/Correct";
import { DeleteIcon } from "components/svg/Delete";
import Snackbar from "./Snackbar";
import { setTimeout } from "timers/promises";

function ToastMessege({ className, position }: any) {
    const [showToast, setShowToast] = useState(true);
    const snackbarRef = useRef(null);

    const toastType = {
        success: "Success",
        delete: "Deleted",
    };
    function showToastHandelr() {
        setShowToast(true);
    }
    function hideToastHandelr() {
        setShowToast(false);
    }

    return (
        <>
            <Button
                className="absolute top-[20%] "
                onClick={() => {
                    snackbarRef.current.ToastMsgHandler();
                }}
            >
                {" "}
                Show Toast msg
            </Button>
            <Snackbar
                ref={snackbarRef}
                message="Recipient has been deleted."
                type={toastType.success}
            />
        </>
    );
}

export default ToastMessege;
