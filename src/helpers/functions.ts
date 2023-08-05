import { ApiFootballDataFilters } from "../domain/interfaces/interfaces";


export function getUrlWithParams(url:string,filters?:ApiFootballDataFilters){
    let newUrl = url;
    const queryParams = Object.entries(filters?filters:{});
    if( queryParams.length){
        queryParams.forEach(param=>{
            newUrl = `${url}?${param[0]}=${param[1]}`;
        })
    }
    return newUrl;
}