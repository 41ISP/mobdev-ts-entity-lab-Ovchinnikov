import axios from "axios"
import type { IItem, IStrapiResponse } from "./types"

export const API_URL = import.meta.env.VITE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY


export const apiInstance = axios.create({
    baseURL: API_URL + "/api",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
})

const getItems = async(): Promise<IStrapiResponse<IItem[]>> => {
    const res = await apiInstance.get<IStrapiResponse<IItem[]>>('/Items', {
        params: {
            populate: "*",
        }
    })
    return res.data
}

export const api = { getItems }