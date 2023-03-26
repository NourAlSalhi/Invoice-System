import { classNames } from "utils";
import type { DropdownProps } from "../types";

type GetDropdownClassNamesProps = Pick<
    DropdownProps,
    "className" | "buttonSize" | "color"
>;

const getDropdownClassNames = ({
    className,
    buttonSize,
}: GetDropdownClassNamesProps) => {
    let menuClassName = classNames("relative inline-block text-left", className);
    let menuItemsClassName = classNames(
        buttonSize === "small" ? "mt-1" : "mt-2",
        buttonSize === "small" ? "rounded" : "rounded-md",
        "absolute w-56 right-0 z-10 origin-top-right bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
    );

    return {
        menu: menuClassName,
        items: menuItemsClassName,
    };
};

export default getDropdownClassNames;
