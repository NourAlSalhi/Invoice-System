import type { APIResponseType } from "types";

export type ClientType = {
    _id: string;
}
export type InvoiceFormInputsType = {
  client: {
    fullName: string;
    email: string;
    address: {
      country: string;
    };
  },
  fixed: {
    itemName: string;
    price: number;
    description: string
  }[],
  currency: string;
};
export type InvoiceResponseType = APIResponseType;
export type LinkFormInputsType = {
    currency: string;
    fixed: {
        itemName: string;
        price: number;
        description: string
    }[],
}
export type LinkResponseType = APIResponseType;


type JobType = "fixed" | "hourly";
type InvoiceStatusType = "unpaid" | "paid";
export type InvoiceItemType = {
    _id: string;
    country: string;
};
export type InvoicePreviewData = {
    _id: string;
    client: ClientType;
    jobType: JobType;
    currency: string;
    fixed: InvoiceItemType[];
    subTotal: number;
    hashCode: string;
    invoiceNo: string;
    status: InvoiceStatusType;
    createdAt: string;
    updatedAt: string;
    paymentDetails: string;
    otherPaymentMethod: null; // for now
    paymentMethod: null; // for now
};
export type InvoiceDetailsResponse = APIResponseType<InvoiceDetailsData>;
export type InvoiceDetailsData = {
    invoice: InvoiceType;
    type: InvoiceVariantType;
};
export type InvoiceType = {
    _id: string;
    client: ClientType;
    fixed: InvoiceItemType[];
    freelancer?: FreelancerType;
    subTotal: number;
    hashCode: string;
    status: InvoiceStatusType;
};
type InvoiceVariantType = "invoice" | "service";
export type FreelancerType = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type SearchTable = {
    search: string;
}
export type InvoiceStatus = {
    paid: string;
    Sent: string,
    pending_payment: string,
    pending: string,
    canceled: string,
    active: string,
    inactive: string,
    disapproved: string,
    refunded: string,
}
