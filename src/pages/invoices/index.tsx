// import { Invoices } from "features/invoices";
// import ToastMessege from "features/Tinvoices/components/ToastMessege";
// import Drawal from "features/Tinvoices/components/Drawal";
// import { useState } from "react";
// import { Button } from "components";

import { NoSsr } from "components";
import type { NextPageWithLayout } from "types";

const InvoicesPage: NextPageWithLayout = () => {
  return <NoSsr>Invoices page coming soon</NoSsr>;
};

InvoicesPage.mainLayoutProps = {
  title: "Invoices",
  pageDescription: "Invoices page description",
  contentClassName: "!items-start",
};

export default InvoicesPage;
