import { BalanceCard, Button } from "components";
import { InvoiceWrapper } from "features/Tinvoices";
import { GeneralLayout } from "layouts";
import CustomDrawal from "features/Tinvoices/components/CustomDrawal";
import { useState } from "react";
import { GeneralNextPageWithLayout } from "types";

export const NewInvoices: GeneralNextPageWithLayout = () => {
  return (
    <>
      <GeneralLayout
        rightSide={<BalanceCard />}
        rightSideClasses="xl:!top-[9rem]"
      >
        <InvoiceWrapper />

        {/* <ToastMessege /> */}
      </GeneralLayout>
    </>
  );
};
NewInvoices.generalLayoutProps = {
  title: "Talents Valley invoices system",
  pageDescription: "invoices system page description",
};

export default NewInvoices;
