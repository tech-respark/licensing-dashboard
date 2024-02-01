import { axiosClient } from "@/lib/axios/axiosClient";

export const getAllRequests = () => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/allSaleRequests`,
            {
                "productId": 1,
                "sortBy": "DESC",
                "orderBy": "modifiedOn",
                "pageNumber": 1,
                "recordsPerPage": 5
            })
            .then((response: any) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error: any) {
                rej(error);
                console.log(`/login `, error);
            });
    })
}


export const getRequestById = (requestId: any) => {
    return new Promise((res, rej) => {
        axiosClient.GET(`${process.env.NEXT_PUBLIC_BASE_URL}/saleRequestById?saleId=${requestId}`)
            .then((response: any) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error: any) {
                rej(error);
                console.log(`/login `, error);
            });
    })
}

export const createRequest = (details: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/saleRequest`, details)
            .then((response) => {
                res(response);
            }).catch(function (error) {
                rej(error);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}