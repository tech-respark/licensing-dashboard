import { axiosClient } from "@/lib/axios/axiosClient";

export const getClientsByProduct = (productId: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/allTenants`, {
            "productId": productId,
            "sortBy": "DESC",
            "orderBy": "modifiedOn",
            "pageNumber": 1,
            "recordsPerPage": 5
        })
            .then((response: any) => {
                res(response.data);
            }).catch(function (error: any) {
                rej(error);
                console.log(`/login `, error);
            });
    })
}

export const getClientById = (clientId: any) => {
    return new Promise((res, rej) => {
        axiosClient.GET(`${process.env.NEXT_PUBLIC_BASE_URL}/tenantById?tenantId=${clientId}`)
            .then((response: any) => {
                res(response.data);
            }).catch(function (error: any) {
                rej(error);
                console.log(`/login `, error);
            });
    })
}

export const createClient = (details: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/tenant`, details)
            .then((response) => {
                res(response.data);
            }).catch(function (error) {
                rej(error);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}

export const updateClient = (details: any) => {
    return new Promise((res, rej) => {
        axiosClient.PUT(`${process.env.NEXT_PUBLIC_BASE_URL}/tenant`, details)
            .then((response) => {
                res(response.data);
            }).catch(function (error) {
                rej(error);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}
