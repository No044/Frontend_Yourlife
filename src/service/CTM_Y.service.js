import { GetData, PostData, PatchData } from "../Utils/Request"
import GetUrl from "../Components/helper/GetURL"
export const GetALLCTM = async () => {
    const page = GetUrl("page") || 1;
    const key = GetUrl("key") || null;
    const status = GetUrl("status") || null
    const data = await GetData(`CTM/GetALL?key=${key}&&status=${status}&&page=${page}`)
    return data
}

export const GetDetail = async (id) => {
    const data = await GetData(`CTM/Getdetail/${id}`)
    return data
}

export const PostCTM = async (option) => {
    const data = await PostData(`CTM/Post`, option)
    return data
}

export const Postfinger = async (option) => {
    const data = await GetData(`CTM/checkfingerprint`)
    return data
}
export const PatchCTM = async (option) => {
    const data = await PatchData(`CTM/Patch`, option)
    return data
}

export const DeletedCTM = async (option) => {
    const data = await PatchData(`CTM/deleted`, option)
    return data
}

export const ChangeCTM = async (option) => {
    const data = await PatchData(`CTM/changeStatus`, option)
    return data
}
