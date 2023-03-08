import { gtp } from "../http"

export async function getAnswer({question}:{question:string}){
   try {
       return gtp({question:question})
    } catch (err:any) {
        return {error:err.message}
    }
}