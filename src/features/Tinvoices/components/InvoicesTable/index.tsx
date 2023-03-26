import React, { useState } from 'react'
import { Tab } from '@headlessui/react'
import { Card, Tooltip } from 'components'
import { ArrowHLeft, ArrowHRight } from 'lib/@heroicons'
import { ArrowFilter } from 'components/svg'
import CommonCurrency from 'data/json/Common-Currency.json'
import Link from 'next/link'
import Drawal from '../Drawal'
import DrawalInvoice from '../DrawalInvoice'

const statusColor = (status) => {
    if (status === "pending") {
        return "text-[#DAA545]";
    } else if (status === "cancelled") {
        return "text-gray-light4";
    } else if (status === "inactive") {
        return "text-gray-dark";
    } else if (status === "paid" || status === "sent") {
        return "text-[#4BAE4F]";
    } else {
        return "text-dark";
    }
};

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

type Props = {
    setFilterType: React.Dispatch<React.SetStateAction<string>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
    apiAllTable: {};
    currentType: string;

}
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function InvoicesTable({ setFilterType, currentPage, setCurrentPage, apiAllTable, currentType }: Props) {
    const [isShowen, setIsShowen] = useState(false);
    const [id, setID] = useState();
    const [type, setType] = useState();

    const paginateCount = () => Math.floor(apiAllTable?.count / 5);

    const handleNextPaginate = () => {
        setCurrentPage((prev) => prev === paginateCount() ? paginateCount() : prev + 1);
    };
    const handlePrevPaginate = () => {
        setCurrentPage((prev) => prev === 0 ? 0 : prev - 1);
    };

    return (
        <><Card className='mt-2 p-5'>
            <Tab.Group >
                <Tab.List className=" border-b flex gap-7 text-gray-dark box-border">
                    <Tab onClick={() => setFilterType('all')} className={({ selected }) =>
                        classNames(
                            'pb-2 border-b ',
                            selected
                                ? 'border-b  text-blue border-blue'
                                : 'border-b border-transparent'
                        )
                    }>All</Tab>
                    <Tab onClick={() => setFilterType('invoice')} className={({ selected }) =>
                        classNames(
                            'pb-2 border-b focus-visible:border-0',
                            selected
                                ? 'border-b text-blue border-blue'
                                : 'border-b border-transparent'
                        )
                    }>Invoices</Tab>
                    <Tab onClick={() => setFilterType('service')} className={({ selected }) =>
                        classNames(
                            'pb-2 border-b ',
                            selected
                                ? 'border-b text text-blue border-blue'
                                : 'border-b border-transparent'
                        )
                    }>Links</Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        {currentType === 'all' &&
                            <table className="table-fixed w-full text-md text-left text-gray-500 ">
                                <thead className="text-md text-gray-light2  border-b ">
                                    <tr>
                                        <th style={{ width: '40%' }} className="py-3 font-normal flex">
                                            <span className='flex mr-6'>
                                                Name
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <Link href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </Link>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2  ' />
                                                    </a>
                                                </span>
                                            </span>
                                            <span className='flex'>
                                                Date
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2  ' />
                                                    </a>
                                                </span>
                                            </span>
                                        </th>
                                        <th style={{ width: '20%' }} scope="col" className=" py-3 font-normal">
                                            <div className="flex items-center">
                                                Amount
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2  ' />
                                                    </a>
                                                </span>
                                            </div>
                                        </th>
                                        <th style={{ width: '20%' }} scope="col" className=" py-3 font-normal">
                                            <div className="flex items-center">
                                                Client
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2  ' />
                                                    </a>
                                                </span>
                                            </div>
                                        </th>
                                        <th style={{ width: '15%' }} scope="col" className=" py-3 font-normal">
                                            <div className="flex items-center">
                                                Status
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2 ' />
                                                    </a>
                                                </span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apiAllTable?.transactions?.map((item) => (
                                        <tr key={item?._id} className="cursor-pointer bg-white border-b border-gray hover:bg-gray-light w-full" onClick={() => { setIsShowen(true); setID(item.invoice?._id || item.service?._id), setType(item.type) }} >
                                            <th scope="row" className=" px-2 py-3 font-medium text-gray-900 flex flex-col ">
                                                <div className={`flex pr-3`}>
                                                    {item.type === 'invoice' ?
                                                        item.invoice?.fixed.map((t, i) => (
                                                            <>
                                                                <Tooltip key={t._id} message={t.itemName}>
                                                                    <span key={t._id} className='capitalize font-medium text-gray-dark inline-block truncate  mr-4'>
                                                                        {t.itemName}
                                                                    </span>
                                                                </Tooltip >
                                                            </>

                                                        ))
                                                        :
                                                        item.service?.fixed.map((t) => (
                                                            <Tooltip key={t._id} message={t.itemName}>
                                                                <span className='capitalize font-medium text-gray-dark inline-block truncate mr-4'>
                                                                    {t.itemName}
                                                                </span>
                                                            </Tooltip >
                                                        ))
                                                    }
                                                </div>
                                                <div className='flex gap-2 pt-1 pb-2'>
                                                    <small className='text-gray-light4'>{getTimeAgo(item.updatedAt)}</small>
                                                    <small className='text-gray-light3 font-normal'>PayPal</small>
                                                </div>
                                            </th>
                                            <td className="pt-4 text-black align-top" >
                                                {item.type === 'invoice' ?
                                                    <span>
                                                        {CommonCurrency[item.invoice?.currency]?.symbol}{item.invoice.subTotal}
                                                    </span>
                                                    :
                                                    <span>
                                                        {CommonCurrency[item.service?.currency]?.symbol}{item.service.subTotal}
                                                    </span>
                                                }

                                            </td>
                                            <td className=" pt-4 align-top text-gray-light2 ">
                                                {item.type === 'invoice' ?
                                                    <span>{item.invoice.client.fullName}</span>
                                                    : <span className='text-center'> - </span>}
                                            </td>

                                            {item.type === 'invoice' ?
                                                < td className={`${statusColor(item.invoice?.status.split('_')[0])} pt-4 capitalize align-top font-semibold`}>
                                                    {item.invoice.status.split('_')[0]}
                                                </td>
                                                :
                                                < td className={`${statusColor(item.service?.status.split('_')[0])} pt-4 capitalize align-top font-semibold`}>
                                                    {item.service.status.split('_')[0]}
                                                </td>
                                            }


                                        </tr>
                                    ))}

                                </tbody>
                                <tfoot className='text-center'>
                                    <tr >
                                        <td colSpan="4" >
                                            <div className='flex items-center justify-center gap-3 py-2'>
                                                <span onClick={handlePrevPaginate} className='cursor-pointer'><ArrowHLeft className='w-8 h-8' /></span>
                                                <span>Page</span>
                                                <span>{currentPage}</span>
                                                <span>-</span>
                                                <span>{paginateCount()}</span>
                                                <span onClick={handleNextPaginate} className='cursor-pointer'><ArrowHRight className='w-8 h-8' /></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        }
                    </Tab.Panel>
                    <Tab.Panel>
                        {currentType === 'invoice' &&
                            <table className="table-fixed w-full text-md text-left text-gray-500 ">
                                <thead className="text-md text-gray-light2  border-b ">
                                    <tr>
                                        <th style={{ width: '40%' }} className="py-3 font-normal flex">
                                            <span className='flex mr-6'>
                                                Name
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2  ' />
                                                    </a>
                                                </span>
                                            </span>
                                            <span className='flex'>
                                                Date
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2  ' />
                                                    </a>
                                                </span>
                                            </span>
                                        </th>
                                        <th style={{ width: '20%' }} scope="col" className=" py-3 font-normal">
                                            <div className="flex items-center">
                                                Amount
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2  ' />
                                                    </a>
                                                </span>
                                            </div>
                                        </th>
                                        <th style={{ width: '20%' }} scope="col" className=" py-3 font-normal">
                                            <div className="flex items-center">
                                                Client
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2  ' />
                                                    </a>
                                                </span>
                                            </div>
                                        </th>
                                        <th style={{ width: '20%' }} scope="col" className=" py-3 font-normal">
                                            <div className="flex items-center">
                                                Status
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2 ' />
                                                    </a>
                                                </span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apiAllTable?.transactions?.map((item) => (
                                        <tr key={item?._id} className="cursor-pointer  bg-white border-b border-gray hover:bg-gray-light w-full" onClick={() => { setIsShowen(true); setID(item.invoice?._id || item.service?._id), setType(item.type) }} >
                                            <th scope="row" className=" px-2 py-3 font-medium text-gray-900 flex flex-col   ">
                                                <div className={`flex`}>
                                                    {item.type === 'invoice' ?
                                                        item.invoice?.fixed.map((t) => (
                                                            <Tooltip key={t._id} message={t.itemName}>
                                                                <span className='capitalize font-medium text-gray-dark inline-block truncate mr-4'>
                                                                    {t.itemName}
                                                                </span>
                                                            </Tooltip >
                                                        ))
                                                        :
                                                        item.service?.fixed.map((t) => (
                                                            <Tooltip key={t._id} message={t.itemName}>
                                                                <span className='capitalize font-medium text-gray-dark inline-block truncate mr-4'>
                                                                    {t.itemName}
                                                                </span>
                                                            </Tooltip >
                                                        ))
                                                    }
                                                </div>
                                                <div className='flex gap-2 pt-1 pb-2'>
                                                    <small className='text-gray-light4'>{getTimeAgo(item.updatedAt)}</small>
                                                    <small className='text-gray-light3 font-normal'>PayPal</small>
                                                </div>
                                            </th>
                                            <td className="pt-4 text-black align-top" >
                                                {item.type === 'invoice' ?
                                                    <span>
                                                        {CommonCurrency[item.invoice?.currency]?.symbol}{item.invoice.subTotal}
                                                    </span>
                                                    :
                                                    <span>
                                                        {CommonCurrency[item.service?.currency]?.symbol}{item.service.subTotal}
                                                    </span>
                                                }

                                            </td>
                                            <td className=" pt-4 align-top text-gray-light2 ">
                                                {item.type === 'invoice' ?
                                                    <span>{item.invoice.client.fullName}</span>
                                                    : <span className='text-center'> - </span>}
                                            </td>

                                            {item.type === 'invoice' ?
                                                < td className={`${statusColor(item.invoice?.status.split('_')[0])} pt-4 capitalize align-top font-semibold`}>
                                                    {item.invoice.status.split('_')[0]}
                                                </td>
                                                :
                                                < td className={`${statusColor(item.service?.status.split('_')[0])} pt-4 capitalize align-top font-semibold`}>
                                                    {item.service.status.split('_')[0]}
                                                </td>
                                            }


                                        </tr>
                                    ))}

                                </tbody>
                                <tfoot className='text-center'>
                                    <tr >
                                        <td colSpan="4" >
                                            <div className='flex items-center justify-center gap-3 py-2'>
                                                <span onClick={handlePrevPaginate} className='cursor-pointer'><ArrowHLeft className='w-8 h-8' /></span>
                                                <span>Page</span>
                                                <span>{currentPage}</span>
                                                <span>-</span>
                                                <span>{paginateCount()}</span>
                                                <span onClick={handleNextPaginate} className='cursor-pointer'><ArrowHRight className='w-8 h-8' /></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        }
                    </Tab.Panel>
                    <Tab.Panel>
                        {currentType === 'service' &&
                            <table className="table-fixed w-full text-md text-left text-gray-500 ">
                                <thead className="text-md text-gray-light2  border-b ">
                                    <tr>
                                        <th style={{ width: '40%' }} className="py-3 font-normal flex">
                                            <span className='flex mr-6'>
                                                Name
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2  ' />
                                                    </a>
                                                </span>
                                            </span>
                                            <span className='flex'>
                                                Date
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2  ' />
                                                    </a>
                                                </span>
                                            </span>
                                        </th>
                                        <th style={{ width: '20%' }} scope="col" className=" py-3 font-normal">
                                            <div className="flex items-center">
                                                Amount
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2  ' />
                                                    </a>
                                                </span>
                                            </div>
                                        </th>
                                        <th style={{ width: '20%' }} scope="col" className=" py-3 font-normal">
                                            <div className="flex items-center">
                                                Client
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2  ' />
                                                    </a>
                                                </span>
                                            </div>
                                        </th>
                                        <th style={{ width: '20%' }} scope="col" className=" py-3 font-normal">
                                            <div className="flex items-center">
                                                Status
                                                <span className='ml-2 flex flex-col gap-1 justify-center items-center '>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-0 w-3 h-2  justify-end' />
                                                    </a>
                                                    <a href='#'>
                                                        <ArrowFilter className='rotate-180 w-3 h-2 ' />
                                                    </a>
                                                </span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {apiAllTable?.transactions?.map((item) => (
                                        <tr key={item?._id} className="cursor-pointer bg-white border-b border-gray hover:bg-gray-light w-full" onClick={() => { setIsShowen(true); setID(item.invoice?._id || item.service?._id), setType(item.type) }} >
                                            <th scope="row" className=" px-2 py-3 font-medium text-gray-900 flex flex-col   ">
                                                <div className={`flex`}>
                                                    {item.type === 'invoice' ?
                                                        item.invoice?.fixed.map((t) => (
                                                            <Tooltip key={t._id} message={t.itemName}>
                                                                <span className='capitalize font-medium text-gray-dark inline-block truncate mr-4'>
                                                                    {t.itemName}
                                                                </span>
                                                            </Tooltip >
                                                        ))
                                                        :
                                                        item.service?.fixed.map((t) => (
                                                            <Tooltip key={t._id} message={t.itemName}>
                                                                <span className='capitalize font-medium text-gray-dark inline-block truncate mr-4'>
                                                                    {t.itemName}
                                                                </span>
                                                            </Tooltip >
                                                        ))
                                                    }
                                                </div>
                                                <div className='flex gap-2 pt-1 pb-2'>
                                                    <small className='text-gray-light4'>{getTimeAgo(item.updatedAt)}</small>
                                                    <small className='text-gray-light3 font-normal'>PayPal</small>
                                                </div>
                                            </th>
                                            <td className="pt-4 text-black align-top" >
                                                {item.type === 'invoice' ?
                                                    <span>
                                                        {CommonCurrency[item.invoice?.currency]?.symbol}{item.invoice.subTotal}
                                                    </span>
                                                    :
                                                    <span>
                                                        {CommonCurrency[item.service?.currency]?.symbol}{item.service.subTotal}
                                                    </span>
                                                }

                                            </td>
                                            <td className=" pt-4 align-top text-gray-light2 ">
                                                {item.type === 'invoice' ?
                                                    <span>{item.invoice.client.fullName}</span>
                                                    : <span className='text-center'> - </span>}
                                            </td>

                                            {item.type === 'invoice' ?
                                                < td className={`${statusColor(item.invoice?.status.split('_')[0])} pt-4 capitalize align-top font-semibold`}>
                                                    {/* {item.invoice.status.replace('_', " ")} */}
                                                    {item.invoice?.status.split('_')[0]}
                                                </td>
                                                :
                                                < td className={`${statusColor(item.service?.status.split('_')[0])} pt-4 capitalize align-top font-semibold`}>
                                                    {/* {item.service?.status.replace('_', " ")} */}
                                                    {item.service?.status.split('_')[0]}
                                                </td>
                                            }
                                        </tr>
                                    ))}

                                </tbody>
                                <tfoot className='text-center'>
                                    <tr >
                                        <td colSpan="4" >
                                            <div className='flex items-center justify-center gap-3 py-2'>
                                                <span onClick={handlePrevPaginate} className='cursor-pointer'><ArrowHLeft className='w-8 h-8' /></span>
                                                <span>Page</span>
                                                <span>{currentPage}</span>
                                                <span>-</span>
                                                <span>{paginateCount()}</span>
                                                <span onClick={handleNextPaginate} className='cursor-pointer'><ArrowHRight className='w-8 h-8' /></span>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        }
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </Card >
            {/* <Drawal
                closeDrawal={setIsShowen}
                openDrawal={isShowen}
                id={id}
                type={type}
            /> */}
            <DrawalInvoice closeDrawal={()=>setIsShowen(false)} id={id} openDrawal={isShowen} />
        </>

    )
}

export default InvoicesTable
