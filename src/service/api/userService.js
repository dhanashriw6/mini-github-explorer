import { apiEndpoints } from "../config";
import httpServices from "../httpServices";

export const getUserName = async(username)=>{
    return await httpServices.get(apiEndpoints.getUser(username))
}

export const getUserRepos = async(username)=>{
    return await httpServices.get(apiEndpoints.getUserRepos(username))
}

