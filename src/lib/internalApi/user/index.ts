import { axiosClient } from "@/lib/axios/axiosClient";

export const getUserByCredentials = (cred: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, cred)
            .then((response: any) => {
                if (response?.data?.data) res(response.data);
                else rej(response?.data?.message)
            }).catch(function (error: any) {
                rej(error.message);
                console.log(`/login `, error);
            });
    })
}

export const getUserByEmail = (id: any) => {
    return new Promise((res, rej) => {
        axiosClient.GET(`${process.env.NEXT_PUBLIC_BASE_URL}/userByEmail?email=` + id)
            .then((response: any) => {
                if (response?.data?.data) res(response.data);
                else rej(response?.data?.message)
            }).catch(function (error: any) {
                rej(error.message);
                console.log(`/login `, error);
            });
    })
}

export const getUserByPhoneNumber = (id: any) => {
    return new Promise((res, rej) => {
        axiosClient.GET(`${process.env.NEXT_PUBLIC_BASE_URL}/userByPhoneNumber?phoneNumber=` + id)
            .then((response: any) => {
                if (response?.data?.data) res(response.data);
                else rej(response?.data?.message)
            }).catch(function (error: any) {
                rej(error.message);
                console.log(`/login `, error);
            });
    })
}


export const getUserById = (id: any) => {
    return new Promise((res, rej) => {
        axiosClient.GET(`${process.env.NEXT_PUBLIC_BASE_URL}/userById?userId=` + id)
            .then((response: any) => {
                if (response?.data?.data) res(response.data);
                else rej(response?.data?.message)
            }).catch(function (error: any) {
                rej(error.message);
                console.log(`/login `, error);
            });
    })
}

export const getUsers = () => {
    return new Promise((res, rej) => {
        axiosClient.GET(`${process.env.NEXT_PUBLIC_BASE_URL}/users`)
            .then((response: any) => {
                if (response.data) {
                    res(response.data)
                }
                else rej(response.data.message)
            }).catch(function (error: any) {
                rej(error.message);
                console.log(`/login `, error);
            });
    })
}
export const createUser = (userDetails: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, userDetails)
            .then((response) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error) {
                rej(error.message);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}

export const updateUser = (userDetails: any) => {
    return new Promise((res, rej) => {
        axiosClient.PUT(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, userDetails)
            .then((response) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error) {
                rej(error.message);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}

export const updatePassword = (userDetails: any) => {
    return new Promise((res, rej) => {
        axiosClient.PUT(`${process.env.NEXT_PUBLIC_BASE_URL}/forgotPassword`, userDetails)
            .then((response) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error) {
                rej(error.message);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}

export const sendForgotPasswordLink = (email: any) => {
    return new Promise((res, rej) => {
        axiosClient.POST(`${process.env.NEXT_PUBLIC_BASE_URL}/forgotPassword`, { email })
            .then((response) => {
                if (response.data) res(response.data);
                else rej(response.data.message)
            }).catch(function (error) {
                rej(error.message);
                console.log(`Error = ${process.env.NEXT_PUBLIC_UPDATE_ADDRESS}=>`, error);
            });
    })
}