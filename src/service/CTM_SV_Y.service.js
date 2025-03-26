import { GetData,PostData,PatchData } from "../Utils/Request"
export const GetCTM_SV = async(id,type) => {
    const params = new URLSearchParams(window.location.search)
    params.key = params.get("key")
    params.status = params.get("status")
    const key = params?.key ?? ""; 
    const status = params?.status ?? ""
    const data = await GetData(`SV_CTM/GetAll?id=${id}&&type=${type}&&key=${key}&&status=${status}`)
    return data
}

export const PostCTM_SV = async(option) => {
    const data = await PostData(`SV_CTM/Post`,option)
    return data
}


export const changeStatusSVC = async(option,id) => {
    const data = await PatchData(`SV_CTM/changestatus/${id}`,option)
    return data
}
