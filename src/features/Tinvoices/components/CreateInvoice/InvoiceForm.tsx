import { useRouter } from "next/router";
import { useFieldArray, useFormContext } from "lib/react-hook-form";
import { Input, Button, Select, Textarea } from "components";
import { XCircleIconOutline } from "lib/@heroicons";
import { useAxios } from "hooks";
import {
    countriesList,
    currencyList,
    API_SERVICES_URLS,
    URL_PATHS,
} from "data";
import type { InvoiceResponseType, InvoiceFormInputsType } from "../../types";

export const InvoiceForm = () => {
    const router = useRouter();
    const {
        register,
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useFormContext<InvoiceFormInputsType>();
    const watchAllFields = watch();
    const { fields, append, remove } = useFieldArray({
        name: "fixed",
        control
    });
    const {
        fetchData: SendInvoice,
        error,
        loading,
    } = useAxios<InvoiceResponseType, InvoiceFormInputsType>({
        config: {
            url: API_SERVICES_URLS.INVOICE_SYSTEM.SEND_INVOICE,
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

    const onSubmit = handleSubmit(data => {
        if (loading) return;
        SendInvoice(data);
    })
    const inputCSS = `!block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`
    const labelCSS = `absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1`
    return (
        <form onSubmit={onSubmit}>
            <h1 className="text-gray-700 mb-3">Client Informaion</h1>
            <>
                <div className="relative">

                    <input type="text" id="small_outlined" className="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />

                    <label htmlFor="small_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1">
                        Small outlined</label>
                </div>
            </>
            <Input
                id="full-name-input"
                label=""
                placeholder="Full name"
                className=" mb-3"
                inputSize="small"
                inputClassName=""
                {...register("client.fullName", {
                    required: 'Invalid Entry',
                })}
                error={!!errors.client?.fullName}
                withoutHelperText
            />

            <Input
                id="email-input"
                placeholder="Email"
                inputClassName={inputCSS}
                className={`mb-3`}
                labelClassName={labelCSS}
                // inputSize="medium"
                {...register("client.email", {
                    required: 'Invalid Entry',
                })}
                error={!!errors.client?.email}
                withoutHelperText
            />
            <div className="flex flex-wrap sm:flex-nowrap sm:gap-3">
                <Select
                    options={countriesList}
                    id="country-select"
                    label=""
                    placeholder="Country"
                    selectSize="small"
                    {...register("client.address.country", {
                        required: 'Invalid Entry',
                    })}
                    error={!!errors.client?.address?.country}
                />
                <Select
                    options={currencyList}
                    id="currency-select"
                    label=""
                    placeholder="USD"
                    className="flex-1"
                    selectSize="small"
                    {...register("currency", {
                        required: 'Invalid Entry',
                    })}
                    error={!!errors.currency}
                />
            </div>
            {fields.map((field, index) => {
                return (
                    <div key={field.id} className="mb-3 overflow-y-auto">
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
                                placeholder={watchAllFields.currency}
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
                        {/* <Textarea
                            id="description-input"
                            label=""
                            placeholder="Description"
                            className=""
                            {...register(`fixed.${index}.description`, {
                                required: 'Invalid Entry',
                            })}
                            error={!!errors.fixed?.[index]?.description}
                            withoutHelperText
                        /> */}
                    </div>
                );

            })}
            <button className="text-[#5B7EF3] text-sm mb-5" onClick={addItem}> + Add item or sevice</button>
            <Button type="submit" buttonSize="small" fullWidth className="my-5">Send Invoice</Button>
            <Button buttonSize="small" fullWidth className="mb-5 !bg-white text-black border border-gray hover:text-white hover:!bg-blue" onClick={() => router.push(URL_PATHS.Tinvoice.INDEX)}>
                Back
            </Button>
        </form>
    )
}

export default InvoiceForm
