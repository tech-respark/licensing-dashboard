import { axiosClient } from "@/lib/axios/axiosClient";

export const getModulesByProduct = (productId: any) => {
    return new Promise((res, rej) => {
        axiosClient.GET(`${process.env.NEXT_PUBLIC_BASE_URL}/modulesByProductId?productId=${productId}`)
            .then((response: any) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error: any) {
                rej(error.message);
                console.log(`/login `, error);
            });
    })
}

export const createModule = (moduleDetails: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/module`, moduleDetails)
            .then((response) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error) {
                rej(error.message);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}

export const updateModule = (moduleDetails: any) => {
    return new Promise((res, rej) => {
        axiosClient.PUT(`${process.env.NEXT_PUBLIC_BASE_URL}/module`, moduleDetails)
            .then((response) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error) {
                rej(error.message);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}
