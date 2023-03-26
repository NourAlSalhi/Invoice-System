import { Link } from "components";
import { URL_PATHS } from "data";
import { useRouter } from "next/router";
import { ChevronLeftIconOutline, ChevronRightIconOutline, XMarkIconMini } from "lib/@heroicons"
const NavLinks = () => {
    const router = useRouter();
    return (
        <div className="mb-6  flex">
            <Link
                href={URL_PATHS.Tinvoice.INDEX}
                className="ml-[-40px]"
            >
                <ChevronLeftIconOutline width={20} />
            </Link>
            <div className="basis-11/12 ml-6">
                <Link
                    href={URL_PATHS.Tinvoice.INDEX}
                    className=" underline text-gray-dark font-semibold"
                >
                    Invoices
                </Link>
                <ChevronRightIconOutline width={20} className="inline text-[#9E9E9E] mx-1" />
                <Link
                    href={router.pathname}
                    className="text-[#9E9E9E] font-medium"
                >
                    {router.pathname == "/invoices/send-invoice" ? "Send Invoice" : "Create Link"}
                </Link>
            </div>
            <Link
                href={URL_PATHS.Tinvoice.INDEX}
            >
                <XMarkIconMini width={20} />
            </Link>
        </div>
    );
};

export default NavLinks;
