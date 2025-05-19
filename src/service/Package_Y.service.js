import {GetData , PostData , PatchData} from "../Utils/Request"

export const GetAllPackage = async (type = true) => {
   const params = new URLSearchParams(window.location.search)
   if(type == true){
      params.key = params.get("key")
     params.status = params.get("status")
  }
   const key = params?.key ?? ""; 
   const status = params?.status ?? 1

   const data = await GetData(`package/Getall?key=${key}&&status=${status}`);
   return data;
};

export const PostPackage = async(option) => {
   const data = await PostData(`package/PostAll`,option)
   return data
}

export const PatchPackage = async(option) => {
    const data = await PatchData(`package/patch`,option)
    return data

}

export const changestatusPackage = async(option) => {
    const data = await PatchData(`package/changestatus`,option)   
    return data
}

export const Getdetail = async(id) => {
   const data = await GetData(`package/Getdetail/${id}`)
   return data
}
export const DeletedPK = async (option) => {
   const data = await PatchData(`package/deleted`, option)
   return data
}