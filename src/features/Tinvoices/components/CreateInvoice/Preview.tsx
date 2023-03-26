import { Card, Logo, Skeleton } from "components";
import { useFormContext, useWatch } from "lib/react-hook-form";
import { InvoiceFormInputsType } from "features/Tinvoices/types";
import { Control } from "react-hook-form"
export const Preview = (props: { type: string }) => {

    const { watch, control } = useFormContext();

    const Total = ({ control }: { control: Control<InvoiceFormInputsType> }) => {
        const formValues = useWatch({
            control,
            name: "fixed"
        });
        const total = formValues.reduce(
            (acc, current) => +acc + (+current.price || 0), 0
        );
        return <span>{total}</span>;
    };

    const watchAllFields = watch();

    return (
        <Card className="mb-4 shadow-sm border py-8 px-11  ">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-bold">
                    {props ? "Invoice" : "Link"}
                    <p className="text-xs font-semibold">
                        #INV-******
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
                    {props.type == "invoice" ? <div>
                        <h5 className="text-gray-dark mt-5 mb-4">Bill To</h5>
                        <p className="w-36"> {
                            watchAllFields.client?.fullName ? (
                                <>
                                    {watchAllFields.client?.fullName}
                                </>
                            ) : (
                                <Skeleton width={150} />
                            )}
                        </p>
                        <span className="text-gray-dark text-sm w-36">
                            {
                                watchAllFields.client?.email ? (
                                    <>
                                        {watchAllFields.client?.email}
                                    </>
                                ) : (
                                    <Skeleton width={130} className="mt-1" />
                                )}
                        </span>
                    </div> : ""}
                    <div>
                        <p className="mt-3">Issue Date</p>
                        <span className="text-gray-dark text-sm">
                            July 27 ,2022
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-start mt-14">
                <p className="text-gray-dark mb-2">Service</p>
                <p className="text-gray-dark mb-2">Amount</p>
            </div>
            {
                watchAllFields.fixed.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-start mb-1">
                        <div>
                            <span>{item.itemName}</span>
                            <p className="text-gray-dark text-xs">{item.description}</p>
                        </div>
                        <span className="text-sm">
                            {watchAllFields.currency} {item.price}
                        </span>
                    </div>
                ))

            }
            <div className="h-px my-3 bg-gray" />
            <div className="ml-auto max-w-max min-w-[160px] text-gray-dark text-sm">
                <p className="flex text-sm">
                    Sub Total
                    <span className="ml-auto">
                        {watchAllFields.currency} <Total control={control} />
                    </span>
                </p>
                <p className="flex text-sm my-2">
                    Fees
                    <span className="ml-auto">
                        $ 15
                    </span>
                </p>
                <div className="w-40 h-px my-3 bg-gray" />
                <p className="flex text-sm">
                    Total
                    <span className="ml-auto">

                    </span>
                </p>
            </div>
        </Card>
    );
};
export default Preview;
