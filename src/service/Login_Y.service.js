import { GetData, PatchData, PostData } from "../Utils/Request"
import GetUrl from "../Components/helper/GetURL"
export const GetALLUser = async() => {
    const page = GetUrl("page") || 1;
    const key = GetUrl("key") || null;
    const status = GetUrl("status") || null
    const data = await GetData(`Authen/Getall?key=${key}&&status=${status}`)
    return data
}

export const PostCreateUser = async(option) => {
    const data = await PostData(`Authen/create`,option)
    return data
}


export const PatchUser = async(option) => {
    const data = await PatchData(`Authen/patch`,option)
    return data
}


export const deletedUser = async(option)=> {
    const data = await PatchData(`Authen/deleted`,option)
    return data
}


export const changestatusUser = async(option)=> {
    const data = await PatchData(`Authen/changestatus`,option)
    return data
}



export const adlogoutuser = async(option) => {
    const data = await PatchData(`Authen/adminlogout`,option)
    return data
}


export const Authorizes = async()=> {
    const data = await GetData(`Authen/authorizes`)
    return data
}

export const PostLogin = async(option) => {
    const data = await PostData(`Authen/login`,option)
    return data
}

export const Logout = async()=> {
    const data = await PostData(`Authen/logout`)
    return data
}

export const changePassword = async(option) => {
    const data = await PatchData(`Authen/password`,option)
    return data
}
