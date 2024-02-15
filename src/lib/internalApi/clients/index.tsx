import { axiosClient } from "@/lib/axios/axiosClient";

export const getClientsByProduct = (filters: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/allTenants`, filters)
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

export const getClientById = (clientId: any) => {
    return new Promise((res, rej) => {
        axiosClient.GET(`${process.env.NEXT_PUBLIC_BASE_URL}/tenantById?tenantId=${clientId}`)
            .then((response: any) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error: any) {
                rej(error.message);
                console.log(`/login `, error);
            });
    })
}

export const createClient = (details: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/tenant`, details)
            .then((response) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error) {
                rej(error.message);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}

export const updateClient = (details: any) => {
    return new Promise((res, rej) => {
        axiosClient.PUT(`${process.env.NEXT_PUBLIC_BASE_URL}/tenant`, details)
            .then((response) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error) {
                rej(error.message);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}
