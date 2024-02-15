import { axiosClient } from "@/lib/axios/axiosClient";

export const getAllRequests = (filters: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/allSaleRequests`, filters)
            .then((response: any) => {
                if (response.data) {
                    if (response.data.pageModel) response.data.totalNumberOfRecords = response.data.pageModel.totalNumberOfRecords;
                    res(response.data);
                }
                else rej(response.data.message)
            }).catch(function (error: any) {
                rej(error.message);
                console.log(`/login `, error);
            });
    })
}

export const getDashboardRequests = (filters: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/saleRequestsDetails`, filters)
            .then((response: any) => {
                if (response.data) {
                    if (response.data.pageModel) response.data.totalNumberOfRecords = response.data.pageModel.totalNumberOfRecords;
                    res(response.data);
                }
                else rej(response.data.message)
            }).catch(function (error: any) {
                rej(error.message);
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
                rej(error.message);
                console.log(`/login `, error);
            });
    })
}

export const createRequest = (details: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/saleRequest`, details)
            .then((response) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error) {
                rej(error.message);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}

export const updateRequest = (details: any) => {
    return new Promise((res, rej) => {
        axiosClient.PUT(`${process.env.NEXT_PUBLIC_BASE_URL}/saleRequest`, details)
            .then((response) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error) {
                rej(error.message);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}

export const updateRequestStatus = (details: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/processSaleRequest`, details)
            .then((response) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error) {
                rej(error.message);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}