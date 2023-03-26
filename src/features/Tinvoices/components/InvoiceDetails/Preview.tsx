import { Card, Logo, Skeleton } from "components";
export const Preview = ({ type, InvoiceDetail }: any) => {
    return (
        <Card className="mb-4 shadow-sm border py-8 px-11 hidden xl:block">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold">
                    {type == "invoice" ? "Invoice" : "Link"}
                    <p className="text-xs font-semibold">
                        {InvoiceDetail?.invoiceNo}
                    </p>
                </h4>
                <Logo className="cursor-pointer" />
            </div>
            <div className="flex justify-between">
                <div>
                    <h5 className="text-gray-dark mt-5 mb-4">From</h5>
                    <h6>Talents Valley LLC</h6>
                    <p className="text-gray-dark text-sm flex flex-col">
                        <span>30 North Gould St.</span>
                        <span>Sheridan, Wyoming 82801</span>
                        <span>United States</span>
                        <span>+1 307-217-6666</span>
                    </p>
                </div>
                <div>
                    {type == "invoice" ? <div>
                        <h5 className="text-gray-dark mt-5 mb-4 text-xs">Bill To</h5>
                        <p> {
                            InvoiceDetail?.client?.fullName ? InvoiceDetail.client?.fullName : <Skeleton width={150} />
                        }
                        </p>
                        <span className="text-gray-dark text-sm">
                            {
                                InvoiceDetail?.client?.email ? InvoiceDetail.client?.email : <Skeleton width={130} className="mt-1" />
                            }
                        </span>
                    </div> : ""}
                    <div>
                        <p className="text-gray-dark mt-3 text-xs">Issue Date</p>
                        <span>
                            July 27 ,2022
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-start mt-14">
                <p className="text-gray-dark mb-2 text-xs">Service</p>
                <p className="text-gray-dark mb-2 text-xs">Amount</p>
            </div>
            {
                InvoiceDetail?.fixed?.map((item: any) => (
                    <div key={item._id} className="flex justify-between items-start mb-1">
                        <div>
                            <span>{item.itemName.charAt(0).toUpperCase() + item.itemName.slice(1)}</span>
                            <p className="text-gray-dark text-xs">{item.description.charAt(0).toUpperCase() + item.description.slice(1)}</p>
                        </div>
                        <span className="text-sm">
                            {item.price}
                        </span>
                    </div>
                ))

            }
            <div className="h-px my-3 bg-gray" />
            <div className="ml-auto max-w-max min-w-[160px] text-gray-dark text-sm">
                <p className="flex text-xs">
                    Sub Total
                    <span className="ml-auto">
                        <span className="text-xs">{InvoiceDetail?.currency}</span> {InvoiceDetail?.subTotal}
                    </span>
                </p>
                <p className="flex text-xs my-2">
                    Fees
                    <span className="ml-auto">
                        $ 15
                    </span>
                </p>
                <div className="w-40 h-px my-3 bg-gray" />
                <p className="flex text-sm">
                    Total
                    <span className="ml-auto">
                        {InvoiceDetail?.subTotal - 15}
                    </span>
                </p>
            </div>
        </Card>
    );
};
export default Preview;
