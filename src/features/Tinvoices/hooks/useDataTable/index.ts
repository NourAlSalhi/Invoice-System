import { useSWR, type Fetcher } from "lib/swr";
import axios from "lib/axios";
import { API_SERVICES_URLS } from "data";
import type { InvoiceDetailsResponse } from "../../types";
import { getAuthorizationHeader } from "utils";

const DataTableFetcher = async (url: string) => {
    try {
        const response = await axios.get(
            url,
            { headers: { ...getAuthorizationHeader() } }
        );
        return response.data;
    } catch (error) {
        console.log(error);

    }
};

export const useDataTable = (url: string) => {
    const { data, error, isLoading } = useSWR(
        `${API_SERVICES_URLS.INVOICE_SYSTEM.INV_LINK_LIST}${url}`,
        DataTableFetcher
    );
    return { DataTable: data?.data, error, isLoading };
};

export default useDataTable;
