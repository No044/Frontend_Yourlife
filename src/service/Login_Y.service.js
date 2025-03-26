import { GetData, PostData } from "../Utils/Request"
export const GetALLUser = async() => {
    const data = await GetData(`Authen/Getall`)
    return data
}

export const PostLogin = async(option) => {
    const data = await PostData(`Authen/login`,option)
    return data
}

export const Authorizes = async()=> {
    const data = await GetData(`Authen/authorizes`)
    return data
}

export const PostuserPremission = async(option) => {
    const data = await PostData(`Authen/createpremission`,option)
    return data
}

