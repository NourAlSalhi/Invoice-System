import { useState } from "react"
import { InvoiceForm, Preview, NavLinks } from "features/Tinvoices";
import type { NextPageWithLayout } from "types";
import { NoSsr } from "components";
import useForm, { FormProvider } from "lib/react-hook-form"
import { InvoiceFormInputsType } from "features/Tinvoices/types";

const SendInvoice: NextPageWithLayout = () => {
    const [isActive, setActive] = useState(false);
    const handleToggle = () => setActive(!isActive);
    const methods = useForm<InvoiceFormInputsType>({
        defaultValues: {
            fixed: [{ itemName: "", price: void 0, description: "" }]
        }
    });
    return (
        <NoSsr>
            <div className="flex flex-col gap-14 lg:flex-row lg:w-5/6 xl:gap-28 mt-12 max-h-[calc(100vh-50px)] h-[calc(100vh-50px)] ">
                <FormProvider {...methods}>
                    <div className={`${isActive ? "hidden w-full" : "bg-white px-16 py-8 xl:pl-24 w-full"} overflow-y-auto`}>
                        <NavLinks />
                        <div className="flex mb-4">
                            <h2 className="xl:text-2xl font-semibold">Invoice</h2>
                        </div>
                        <InvoiceForm />
                    </div>
                    <div className={isActive ? "w-full mt-10" : 'hidden lg:inline mt-10 w-full'}>
                        <h2 className="text-xl font-semibold mb-3">Preview</h2>
                        <div className="h-[700px] overflow-y-auto">
                            <Preview type="invoice" />
                        </div>
                    </div>
                    <button onClick={handleToggle} className="lg:hidden text-blue border-b-2 border-blue text-lg w-fit m-auto">{isActive ? 'Back' : 'Show Preview'}</button>
                </FormProvider>
            </div>
        </NoSsr>
    );
};

SendInvoice.mainLayoutProps = {
    title: "Talents Valley Send Invoice",
    pageDescription: "Send Invoice page description",
    contentClassName: "!block !p-0",
    withoutFooter: true
};

export default SendInvoice;
