import { Menu } from "lib/@headlessui";
import { classNames } from "utils";
import type { DropdownItemProps, ElementType } from "../types";

const defaultElement = "span";

const DropdownItem = <E extends ElementType = "span">({
    children,
    as,
    disabled,
    ...rest
}: DropdownItemProps<E>) => {
    const Item = as ?? defaultElement;

    return (
        <Menu.Item disabled={disabled}>
            {({ active, disabled }) => {
                return (
                    <Item
                        className={classNames(
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                            "block px-4 py-2 text-sm",
                            disabled ? "opacity-50" : ""
                        )}
                        {...rest}
                    >
                        {children}
                    </Item>
                );
            }}
        </Menu.Item>
    );
};

export default DropdownItem;
