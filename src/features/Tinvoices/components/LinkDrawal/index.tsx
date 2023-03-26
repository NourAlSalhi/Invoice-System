import React from "react";
import {
  Preview,
  Details,
  ServicesDetails,
  Status,
  TimeLine,
  LinkInput,
  DrawalButtons,
} from "../Drawal/components";

type Props = {};

const LinkDetails = (props: any) => {
  return (
    <div>
      <Status />
      <ServicesDetails />
      <LinkInput></LinkInput>
      <Details></Details>
      <TimeLine />
      <Preview />
      <DrawalButtons />
    </div>
  );
};

export default LinkDetails;
