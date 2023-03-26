import { forwardRef } from "react";
import type { TextareaProps } from "components/types";

export const Textarea = forwardRef<HTMLInputElement, TextareaProps>(
    (
        {
            label,
            id,
            helperText,
            error = false,
            withoutHelperText = false,
            focusableLabel = false,
            ...rest
        },
        ref
    ) => {
        return (
            <div className="">
                {label && (
                    <label
                        htmlFor={id}
                        tabIndex={focusableLabel ? 0 : undefined}
                        className=""
                    >
                        {label}
                    </label>
                )}
                <textarea
                    id={id}
                    className="py-2 px-3 text-sm block w-full border-gray focus:ring-0 focus:border-blue rounded-md"
                    ref={ref}
                    {...rest}
                />
                {!withoutHelperText && (
                    <p className="">{helperText}</p>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";

export default Textarea;
