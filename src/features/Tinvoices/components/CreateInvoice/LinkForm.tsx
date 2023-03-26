import { useRouter } from "next/router";
import { useFieldArray, useFormContext } from "lib/react-hook-form";
import { XCircleIconOutline } from "lib/@heroicons";
import { Input, Button, Select } from "components";
import { useAxios } from "hooks";
import {
    API_SERVICES_URLS,
    currencyList,
    URL_PATHS,
} from "data";
import type { LinkFormInputsType, LinkResponseType } from "../../types";

export const LinkForm = () => {
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useFormContext<LinkFormInputsType>();

    const { fields, append, remove } = useFieldArray({
        name: "fixed",
        control
    });

    const addItem = () => {
        append({
            itemName: "",
            price: void 0,
            description: ""
        })
    }

    const removeItem = (index: number) => {
        if (fields.length > 1) {
            remove(index)
        }
    }

    const {
        fetchData: CreateLink,
        error,
        loading,
    } = useAxios<LinkResponseType, LinkFormInputsType>({
        config: {
            url: API_SERVICES_URLS.INVOICE_SYSTEM.CREATR_LINK,
            method: "POST",
        },
        options: {
            manual: true,
            withAuthHeader: true,
        },
        onSuccess: () => {
            router.push(URL_PATHS.Tinvoice.INDEX);
        },
    });

    const onSubmit = handleSubmit(data => {
        if (loading) return;
        // console.log(data)
        CreateLink(data);
    })

    return (
        <form onSubmit={onSubmit}>
            <Select
                options={currencyList}
                id="Currency-select"
                label="Currency"
                placeholder="USD"
                selectSize="small"
                {...register("currency", {
                    required: 'Invalid Entry',
                })}
                error={!!errors.currency}
                withoutHelperText
            />
            {fields.map((field, index) => {
                return (
                    <div key={field.id} className="my-4">
                        <div className="flex justify-between">
                            <h1 className="text-gray-700 mb-3">Job Details</h1>
                            <XCircleIconOutline className={fields.length > 1 ? "w-4" : "hidden"}
                                onClick={() => fields.length > 1 && remove(index)} />
                        </div>
                        <div className="flex flex-wrap sm:flex-nowrap sm:gap-3">
                            <Input
                                id="itemName-input"
                                label=""
                                placeholder="Job title"
                                className="flex-1 basis-full mb-3"
                                inputSize="small"
                                {...register(`fixed.${index}.itemName`, {
                                    required: 'Invalid Entry',
                                })}
                                error={!!errors.fixed?.[index]?.itemName}
                                withoutHelperText
                            />
                            <Input
                                id="price-input"
                                label=""
                                placeholder="$ 0.00"
                                inputSize="small"
                                {...register(`fixed.${index}.price`, {
                                    required: 'Invalid Entry',

                                })}
                                error={!!errors.fixed?.[index]?.price}
                                withoutHelperText
                            />
                        </div>
                        <Input
                            id="description-input"
                            label=""
                            placeholder="Description"
                            className=""
                            {...register(`fixed.${index}.description`, {
                                required: 'Invalid Entry',
                            })}
                            error={!!errors.fixed?.[index]?.description}
                            withoutHelperText
                        />
                    </div>
                );

            })}
            <button className="text-[#5B7EF3] text-sm mb-5" onClick={addItem}>+ Add item or sevice</button>
            <Button type="submit" buttonSize="small" fullWidth className="my-5">
                Create Link
            </Button>
            <Button buttonSize="small" fullWidth className="mb-20 !bg-white text-black border border-gray hover:text-white hover:!bg-blue" onClick={() => router.push(URL_PATHS.Tinvoice.INDEX)}>
                Back
            </Button>
        </form>
    )
}

export default LinkForm
