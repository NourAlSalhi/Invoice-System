import CustomDrawal from '../CustomDrawal'
import InvoiceDetails from '../InvoiceDetails'
const DrawalInvoice = ({ closeDrawal, id, openDrawal }) => {
    return (
        <>
            {
                openDrawal && <CustomDrawal titel='Invoice' closeDrawal={closeDrawal}>
                    <InvoiceDetails id={id} />
                </CustomDrawal>
            }
        </>
    )
}

export default DrawalInvoice