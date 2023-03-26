import React, { useState, useRef } from "react";
import { Button, Input } from "components";

function LinkInput() {
  const inputRef = useRef();
  // const [InputValue, setInputValue] = useState("");
  function inputValueHandler() {
    // console.log(inputRef.current.value);
    inputRef.current.select();
    document.execCommand("copy");
  }
  // console.log(InputValue);

  return (
    <div className="flex ml-1 gap-3 ">
      <Input
        // value={}
        inputClassName="w-full !pr-12"
        ref={inputRef}
        // onChange={inputValueHandler}
      />
      <Button
        onClick={inputValueHandler}
        buttonSize="medium"
        className="!h-[50px] !w-[30%]  !bg-[#BEC2C6] !border-[#E2E2E2] "
      >
        Copy
      </Button>
    </div>
  );
}

export default LinkInput;
