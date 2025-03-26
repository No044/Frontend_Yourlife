import { GetData,PatchData,PostData } from "../Utils/Request";

export const GetAllService = async() => {
    const params = new URLSearchParams(window.location.search)
    params.key = params.get("key")
    params.status = params.get("status")
    const key = params?.key ?? ""; 
    const status = params?.status ?? 1
    const data = await GetData(`service/Getall?key=${key}&&status=${status}`)
    return data
}


export const PostService = async(option) => {
    const data = await PostData(`service/Post`,option)
    return data
 }

 

export const PatchService = async(option) => {
    const data = await PatchData(`service/Patch`,option)
    return data
 }



 
export const Getdetail = async(id) => {
    const data = await GetData(`service/Getdetail/${id}`)
    return data
 }


 

 
export const changstatusService = async(option) => {
    const data = await PatchData(`service/changestatus`,option)
    return data
 }
