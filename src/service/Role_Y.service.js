import { GetData,PatchData,PostData } from "../Utils/Request";

export const GetAllRole = async() => {
    const params = new URLSearchParams(window.location.search)
    params.key = params.get("key")
    params.status = params.get("status")
    const key = params?.key ?? ""; 
    const status = params?.status ?? 1
    const data = await GetData(`Role/Getall?key=${key}&&status=${status}`)
    return data
}


export const PostRole = async(option) => {
    const data = await PostData(`Role/Post`,option)
    return data
 }
  
 

export const PatchRole = async(option) => {
    const data = await PatchData(`Role/Patch`,option)
    return data
 }


 
export const Getdetail = async(id) => {
    const data = await GetData(`Role/Getdetail/${id}`)
    return data
 }
export const changstatusRole = async(option) => {
    const data = await PatchData(`Role/changestatus`,option)
    return data
 }


 export const DeletedRole = async (option) => {
    const data = await PatchData(`Role/deleted`, option)
    return data
 }


 export const PostPremission = async(option) => {
    const data = await PatchData(`Role/createpremission`,option)
    return data
}

