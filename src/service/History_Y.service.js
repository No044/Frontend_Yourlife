import { GetData } from "../Utils/Request";

export const GetAllHistory = async(date) => {

    const data = await GetData(`History/Getall/${date}`)
    return data
}


export const GetToTal = async(date) => {
    const data = await GetData(`History/Gettotal/total`)
    return data
}
