import React, { useEffect, useState, useRef } from 'react'
import InvoicesTable from '../InvoicesTable'
import { Button, Dropdown, Input, Link } from 'components'
import { MagnifyingGlassIconMini, ChevronDownIconMini } from 'lib/@heroicons'
import { useForm, Controller } from "react-hook-form";
import { SearchTable } from '../../types';
import { API_SERVICES_URLS, SEARCH_VALIDATION, URL_PATHS } from 'data';
import { Filter, Send } from "components/svg";
import { PlusIconMini } from "lib/@heroicons";
import InvoiceStatus from 'data/json/InvoiceStatus2.json'
import PopoverMenu from 'components/PopoverMenu';
import { useDataTable, useGetInvoice } from 'features/Tinvoices/hooks';
import TimeLine from '../TimeLine';


interface InvLinkListOptions {
    limit: number;
    offset: number;
    sort: string;
    search: string;
    type: string;
    filter?: string
}
function getTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();

    // Get difference between now and the given date in milliseconds
    const diff = now.getTime() - date.getTime();

    // Calculate time difference in various units
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    const days = hours / 24;
    const weeks = days / 7;
    const months = days / 30.44; // average number of days per month
    const years = days / 365.25; // average number of days per year

    // Determine the appropriate string to return based on the time difference
    if (days < 1) {
        return "Today";
    } else if (days < 2) {
        return "Yesterday";
    } else if (days < 7) {
        return `${Math.floor(days)} Days ago`;
    } else if (weeks < 5) {
        return "Week";
    } else if (months < 12) {
        return `${Math.floor(months)} Month`;
    } else if (years < 2) {
        return "1 Year ago";
    } else {
        return `${Math.floor(years)} Years ago`;
    }
}
function dateTo12HourTime(inputDate: string) {
    const date = new Date(inputDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const suffix = hours >= 12 ? "PM" : "AM";
    const adjustedHours = hours % 12 || 12;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${adjustedHours}:${paddedMinutes} ${suffix}`;
}
export function InvoiceWrapper() {
    const [type, setType] = useState<'all' | 'service' | 'invoice'>('all')
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<string>()
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [search, setSearch] = useState<string>('')
    const [currentPage, setCurrentPage] = useState(0);
    const [APIData, setAPIData] = useState({});

    const INV_LINK_LIST = (options: InvLinkListOptions) => {
        const { limit, offset, sort, search, type, filter } = options;
        const urlParams = new URLSearchParams({
            sort,
            search,
            type,
            offset: offset?.toString(),
            limit: limit?.toString()
        });
        if (filter) {
            urlParams.set('filter', filter);
        }
        return `?${urlParams.toString()}`;
    };
    const invoiceLink = INV_LINK_LIST({
        limit: 5, offset: currentPage, sort: '', search: search, type: type, filter: selectedOptions.join()
    });
    // console.log(type);

    const { DataTable: apiData, error: apiError, isLoading: apiLoading } = useDataTable(invoiceLink)


    useEffect(() => {
        const timeOutId = setTimeout(() => setSearch(query), 500);
        return () => clearTimeout(timeOutId);
    }, [query]);
    useEffect(() => {
        if (!apiLoading) {
            setAPIData(apiData)
        }
    }, [apiData, apiLoading,])
    // console.log(apiData);

    useEffect(() => {
        setSelectedOptions([])

    }, [type])
    const handleSelectOption = (e) => {
        const value = e.target.value;
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter((option) => option !== value));
        } else {
            setSelectedOptions([...selectedOptions, value]);
        }
    };
    console.log(selectedOptions);
    const history = [

        {
            "_id": "641df80f440ad52d259532a0",
            "type": "invoice",
            "action": "approve",
            "status": "sent",
            "createdBy": "637237329ef107f214a23fc5",
            "createdAt": "2023-03-24T19:20:47.600Z",
            "updatedAt": "2023-03-24T19:20:47.600Z"
        },
        {
            "_id": "641df7dc440ad52d25953262",
            "type": "invoice",
            "action": "edit",
            "status": "pending_approval",
            "createdBy": "63e104aa8bba2cb3f754d7db",
            "createdAt": "2023-03-24T19:19:56.918Z",
            "updatedAt": "2023-03-24T19:19:56.918Z"
        },
        {
            "_id": "641df79d440ad52d25953245",
            "type": "invoice",
            "action": "approve",
            "status": "sent",
            "createdBy": "637237329ef107f214a23fc5",
            "createdAt": "2023-03-24T19:18:53.846Z",
            "updatedAt": "2023-03-24T19:18:53.846Z"
        },
        {
            "_id": "641df782440ad52d25953205",
            "type": "invoice",
            "action": "create",
            "status": "pending_approval",
            "createdBy": "63e104aa8bba2cb3f754d7db",
            "createdAt": "2023-03-24T19:18:26.159Z",
            "updatedAt": "2023-03-24T19:18:26.159Z"
        }
    ]
    const firstItem = history.length - 1;
    // const lastItemArr = history[history.length - 1];
    const hasOneItem = history.length === 1;
    console.log(firstItem);

    function LeftSide(data: {}) {
        return <div className="flex flex-col">
            <span>{dateTo12HourTime(data.createdAt)}</span>
            <span>{getTimeAgo(data.createdAt)}</span>
        </div>
    }
    function RightSide(data: {}) {
        return <div className="flex flex-col">
            <span >{data.action} & {data.status.split('_')[0]} </span>
        </div>
    }
    function lastItem(data: {}, i: number) {
        const firstItem = history[0];
        if (firstItem.status === data.status && firstItem.action === data.action && firstItem.createdAt === data.createdAt) {
            return true
        }
        return false
    }

    return (
        <div>
            <div className={`flex xl:flex-row flex-col w-full mb-3`}>
                <Input
                    className='w-full xl:w-1/2 pb-3 md:pb-0'
                    id="search"
                    onChange={event => setQuery(event.target.value)}
                    inputClassName='pl-[50px] border-0  shadow-lg'
                    type='search'
                    placeholder='Search for invoice, title, client or description'
                    startIcon={<MagnifyingGlassIconMini className="w-5 h5" />}
                    // {...register("search", {
                    //     required: false,
                    // })}
                    // error={!!errors.search}
                    withoutHelperText

                />

                <div className="flex gap-5 justify-around xl:justify-end w-full xl:w-1/2">
                    <Link href={URL_PATHS.Tinvoice.CREATE_LINK} className='flex bg-white !text-blue-light py-4  !px-12 !hover:bg-white shadow-md rounded-md'>
                        <PlusIconMini className='text-blue font-bold w-4 self-center mr-2' />
                        <span className='self-center text-sm'>Link</span>
                    </Link>
                    <Link href={URL_PATHS.Tinvoice.SEND_INVOICE} className='flex bg-white !text-blue-light !px-10 shadow-md rounded-md'>
                        <Send className='text-blue font-bold w-4 self-center mr-2' />
                        <span className='self-center text-sm'>Invoice</span>
                    </Link>

                    <PopoverMenu title="filter" butClassName='h-full !bg-white !shadow-md !text-gray-dark rounded-lg' Icon={<Filter className='font-bold w-4 h-4 ml-1 self-center mr-2' />
                    }>
                        {InvoiceStatus[type].map((item, i) => (
                            <div className="mb-2 hover:bg-gray p-2 " key={i}>
                                <label htmlFor={item.label} className='flex items-center gap-2 px-3 pt-1 content-center justify-start' onChange={handleSelectOption}>
                                    <input value={item.value} id={item.label} name={item.label} type="checkbox" className='accent-blue mb-2' checked={Boolean(selectedOptions.indexOf(item.value) != -1)} />
                                    <span className='self-center'> {item.label}</span>
                                </label>
                            </div>
                        ))}
                    </PopoverMenu>
                </div >
            </div >
            <InvoicesTable
                setFilterType={setType}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                apiAllTable={APIData}
                currentType={type}
                setSort={setSort}
            />
            {/* {history.map((item, i) => (
                <TimeLine
                    key={i}
                    hasOneItem={hasOneItem}
                    LeftSide={LeftSide(item)}
                    RightSide={RightSide(item)}
                    isLast={lastItem(item)}
                    isFirst={item.action}
                />
            ))
            } */}
        </div >
    )
}
// <a href='#' className="mb-2 flex flex-col hover:bg-slate-600 w-full" key={i}>{ }</a>
export default InvoiceWrapper
