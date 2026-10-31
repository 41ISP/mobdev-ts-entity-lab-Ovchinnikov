import axios from "axios"
import type { IItem, IStrapiResponse, TItemInput } from "./types"

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


const createItem = async (input: TItemInput): Promise<IItem> => {
    const res = await apiInstance.post('/Items',{data: input})
    return res.data.data
}

const deleteItem = async (id: string): Promise<void> => {
    await apiInstance.delete(`/Items/${id}`)
}

export const api = { getItems , createItem ,deleteItem }