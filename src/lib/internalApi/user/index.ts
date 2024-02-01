import { axiosClient } from "@/lib/axios/axiosClient";

export const getUserByCredentials = (cred: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, cred)
            .then((response: any) => {
                if (response?.data?.data) res(response.data);
                else rej(response?.data?.message)
            }).catch(function (error: any) {
                rej(error);
                console.log(`/login `, error);
            });
    })
}
export const getUsersByProduct = (productId: any) => {
    return new Promise((res, rej) => {
        axiosClient.GET(`${process.env.NEXT_PUBLIC_BASE_URL}/usersByProductId?productId=${productId}`)
            .then((response: any) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error: any) {
                rej(error);
                console.log(`/login `, error);
            });
    })
}
export const createUser = (userDetails: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, userDetails)
            .then((response) => {
                res(response);
            }).catch(function (error) {
                rej(error);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}

export const updateUser = (userDetails: any) => {
    return new Promise((res, rej) => {
        axiosClient.PUT(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, userDetails)
            .then((response) => {
                res(response);
            }).catch(function (error) {
                rej(error);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}