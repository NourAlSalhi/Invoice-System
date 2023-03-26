import { Fragment } from "react";
import { Menu, Transition } from "lib/@headlessui";
import { ChevronDownIconMini } from "lib/@heroicons";
import Button from "../Button";
import Item from "./Item";
import getDropdownClassNames from "./getDropdownClassNames";
import type { DropdownType } from "../types";
import { Filter } from "components/svg";

const Dropdown: DropdownType = ({
    label,
    children,
    className,
    color = "white",
    buttonSize = "medium",
    ...rest
}) => {
    const dropdownClassNames = getDropdownClassNames({ className, buttonSize });

    return (
        <Menu as="div" className={dropdownClassNames.menu} {...rest}>

            <Menu.Button
                as={Button}
                buttonSize={buttonSize}
                color={color}
                className={`inline-flex items-center justify-start ${className}`}
            >
                <Filter className='font-bold w-4 h-4 ml-1 self-center mr-2' />
                {label}
                {/* <ChevronDownIconMini aria-hidden="true" className="w-4 h-4 ml-1" /> */}

            </Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className={dropdownClassNames.items}>
                    <div className="py-1">{children}</div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

Dropdown.Item = Item;

export default Dropdown;
