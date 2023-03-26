import { useEffect, useState, useMemo } from 'react'
import { COOKIES_KEYS, API_SERVICES_URLS } from 'data'
import { getCookie } from 'lib/js-cookie';
import { XCircleIconOutline } from "lib/@heroicons"
import { PindingClock, Cancelled, Sent } from 'components/svg';
import TimeLine from '../TimeLine';
import { Preview } from "./Preview"
import { Button, Card } from 'components';
import { useGetInvoiceDetails } from 'features/Tinvoices/hooks';
import ConfirmCard from '../ConfirmCard';
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
const InvoiceDetails = (id) => {
    const currentUser = getCookie(COOKIES_KEYS.currentUser);
    const [invoiceDetails, setInvoiceDetails] = useState<any>([])
    const [showConfirm, setShowConfirm] = useState(false);
    const [showConfirmReminder, setShowConfirmReminder] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const Icon = useMemo(() => {
        if (invoiceDetails?.status == 'pending_approval')
            return <div className='flex gap-5'>
                <PindingClock className='h-6 w-6 text-[#DAA545]' />
                <span className='text-[#DAA545] font-semibold'>Pending Approval</span>
            </div>
        else if (invoiceDetails?.status == 'sent')
            return <div className='flex gap-5'>
                <Sent className='h-7 w-7' />
                <span className='font-semibold'>Sent</span>
            </div>
        else if (invoiceDetails?.status == 'unpaid')
            return <div className='flex gap-5'>
                <PindingClock className='h-6 w-6 ' />
                <span className='font-semibold'>UnPaid</span>
            </div>
        else if (invoiceDetails?.status == 'paid')
            return <div className='flex gap-5'>
                <PindingClock className='h-6 w-6 text-green-600' />
                <span className='text-[#DAA545] font-semibold'>Paid</span>
            </div>
        else if (invoiceDetails?.status == 'rejected')
            return <div className='flex gap-5'>
                <XCircleIconOutline className='h-6 w-6' />
                <span className='text-[#DAA545] font-semibold'>Disapproval</span>
            </div>
        else if (invoiceDetails?.status == 'cancelled')
            return <div className='flex gap-5'>
                <Cancelled className='h-6 w-6' />
                <span className='font-semibold'>Cancelled</span>
            </div>
        else ""
    }, [invoiceDetails])

    const firstItem = invoiceDetails?.history?.length - 1;
    // const lastItemArr = history[history.length - 1];
    const hasOneItem = invoiceDetails?.history?.length === 1;
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
        const firstItem = invoiceDetails?.history[0];
        if (firstItem.status === data.status && firstItem.action === data.action && firstItem.createdAt === data.createdAt) {
            return true
        }
        return false
    }
    const handelCancel = () => {
        fetch('https://talents-valley-backend.herokuapp.com/api/invoice/change-status/641d50d4eb7c4bb8330e1972', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${currentUser?.accessToken}`,
            },
            body: JSON.stringify({
                status: "cancelled",
            }),
        })
            .then(response => response.json())
            .catch((error) => console.log('error', error));
    }
    const id1 = id
    const { DataTable: dataId, error, isLoading } = useGetInvoiceDetails(id1.id)
    useEffect(() => {
        if (!isLoading) setInvoiceDetails(dataId?.invoice)
    }, [dataId, isLoading,])
    console.log(dataId)
    return (
        <div className='my-7'>
            <Card className='mb-5 pb-1'>
                <div>
                    {Icon}
                    <span className='text-xs m-12 text-gray-dark'>Estimate: 24 hours.</span>
                </div>
                <div className='my-5'>
                    {invoiceDetails?.fixed?.map((item: any) => (
                        <div key={item._id} className="flex justify-between">
                            <div>
                                <h3 className='text-lg font-semibold'>{item.itemName.charAt(0).toUpperCase() + item.itemName.slice(1)}</h3>
                                <span className='text-gray-dark text-sm'>{item.description.charAt(0).toUpperCase() + item.description.slice(1)}</span>
                            </div>
                            <p className='font-bold'>{item.price}</p>
                        </div>
                    ))}
                </div>
            </Card>
            <Card>
                <h2>Timeline</h2>
                {invoiceDetails?.history?.map((item, i) => (
                    <TimeLine
                        key={i}
                        hasOneItem={hasOneItem}
                        LeftSide={LeftSide(item)}
                        RightSide={RightSide(item)}
                        isLast={lastItem(item)}
                        isFirst={item.action}
                    />
                ))
                }
            </Card>
            <div className='my-5'>
                <Preview type="invoice" InvoiceDetail={invoiceDetails} />
                <button className='text-blue'>Show Invoice</button>
            </div>
            <div className='flex flex-col 2xl:flex-row justify-between gap-3 my-12'>
                {invoiceDetails?.status == 'paid' ? '' : <>
                    {invoiceDetails?.status == "cancelled" ?
                        <Button buttonSize="large" className=" px-4 2xl:px-12 py-3 !bg-white text-red" onClick={() => setShowConfirmDelete(true)}>Delete</Button>
                        : <Button buttonSize="large" className="px-8 2xl:px-12 py-3 !bg-white !text-black" onClick={() => setShowConfirm(true)}>Cancel</Button>
                    }
                    <Button buttonSize="large" className=" px-4 2xl:px-12 py-3 !bg-white !text-blue ">Edit</Button>
                    {invoiceDetails?.status == "sent" ? <Button buttonSize="large" className=" py-3 !bg-white !text-blue" onClick={() => setShowConfirmReminder(true)}>Send Reminder</Button> : ' '}
                </>}
            </div>
            {showConfirm && (
                <ConfirmCard isOpen={showConfirm} content='cancel your invoice?' handelButtonYes={handelCancel}
                    changeModalState={() => setShowConfirm(false)} />
            )}
            {showConfirmDelete && (
                <ConfirmCard isOpen={showConfirmDelete} content='dalete this invoice?'
                    changeModalState={() => setShowConfirmDelete(false)} />
            )}
            {showConfirmReminder && (
                <ConfirmCard isOpen={showConfirmReminder} content='Are you sure you want to send email to remind your client?' 
                    changeModalState={() => setShowConfirmReminder(false)} />
            )}
        </div>
    )
}

export default InvoiceDetails