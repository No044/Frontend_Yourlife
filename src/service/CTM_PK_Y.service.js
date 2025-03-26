import { GetData,PostData,PatchData } from "../Utils/Request"
export const GetCTM_PK = async(id,type) => {
    const params = new URLSearchParams(window.location.search)
    params.key = params.get("key")
    params.status = params.get("status")
    const key = params?.key ?? ""; 
    const status = params?.status ?? ""
    const data = await GetData(`PK_CTM/GetAll?id=${id}&&type=${type}&&key=${key}&&status=${status}`)
    return data
}

export const PostCTM_PK = async(option) => {
    const data = await PostData(`PK_CTM/Post`,option)
    return data
}

export const changeStatusPKC = async(option) => {
    const data = await PatchData(`PK_CTM/changestatus`,option)
    return data
}
