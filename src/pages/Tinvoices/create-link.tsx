import { useState } from "react"
import { LinkForm, Preview, NavLinks } from "features/Tinvoices";
import type { NextPageWithLayout } from "types";
import { NoSsr } from "components";
import useForm, { FormProvider } from "lib/react-hook-form"
import { LinkFormInputsType } from "features/Tinvoices/types";

const CreateLink: NextPageWithLayout = () => {
    const [isActive, setActive] = useState(false);
    const handleToggle = () => setActive(!isActive);
    const methods = useForm<LinkFormInputsType>({
        defaultValues: {
            fixed: [{ itemName: "", price: void 0, description: "" }]
        }
    });
    return (
        <NoSsr>
            <div className="flex flex-col gap-14 mt-12 lg:flex-row lg:w-5/6 xl:gap-28 max-h-[calc(100vh-50px)] h-[calc(100vh-70px)]">
                <FormProvider {...methods}>
                    <div className={`${isActive ? "hidden w-full" : "bg-white px-16 py-8 xl:pl-24 w-full"} overflow-y-auto`}>
                        <NavLinks />
                        <div className="flex gap-3 mb-4">
                            <h2 className="xl:text-2xl font-semibold">Link</h2>
                            <span className="text-gray-400">#LINK-003</span>
                        </div>
                        <LinkForm />
                    </div>
                    <div className={isActive ? "w-full mt-10" : 'hidden lg:inline mt-10 w-full'}>
                        <h2 className="text-xl font-semibold mb-3">Preview</h2>
                        <div className="h-[700px] overflow-y-auto">
                            <Preview type="link" />
                        </div>
                    </div>
                    <button onClick={handleToggle} className="lg:hidden text-blue border-b-2 border-blue text-lg w-fit m-auto">{isActive ? 'Back' : 'Show Preview'}</button>
                </FormProvider>
            </div>
        </NoSsr>
    );
};

CreateLink.mainLayoutProps = {
    title: "Talents Valley Create Link",
    pageDescription: "Create Link page description",
    contentClassName: "!block !pl-0 !pt-0",
    withoutFooter: true
};

export default CreateLink;
