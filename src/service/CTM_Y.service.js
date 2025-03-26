import { GetData,PostData,PatchData } from "../Utils/Request"

export const GetALLCTM = async() => {
    const params = new URLSearchParams(window.location.search)
    params.key = params.get("key")
    params.status = params.get("status")
    const key = params?.key ?? ""; 
   const status = params?.status ?? ""
   const data = await GetData(`CTM/GetALL?key=${key}&&status=${status}`)
   return data
}

export const GetDetail = async(id) => {
    const data = await GetData(`CTM/Getdetail/${id}`)
    return data
}

export const PostCTM = async(option) => {
    const data = await PostData(`CTM/Post`,option)
    return data
}

export const PatchCTM = async( option) => {
    const data = await PatchData(`CTM/Patch`,option)   
    return data
}

export const ChangeCTM = async(option) =>{
     const data = await PatchData(`CTM/changeStatus`,option)
     return data
}
