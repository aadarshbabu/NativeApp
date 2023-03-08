import { context } from "../../Context/createContext";
import { paytm } from "../http";
import { initTransBody } from "../http";
// import uniqid from 'uniqid';
import {useContext} from 'react'
import { customAlphabet } from 'nanoid/non-secure'; 
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);


type res ={
        env: string,
        mid: string,
        amount: string,
        orderid: string,
        txntoken: string
}

export default async function iniciatePayment({orderId, custumberId, amount,cur}:initTransBody){
    try {
       const res:res =  await paytm({orderId,custumberId,amount,cur});
       if(res.txntoken){
        return res.txntoken
       }
    } catch (error:any) {
        return {err: error.message}
    }
} 

export const createPayment = async({amount, userId}:{amount:string, userId:string})=>{
    const userid = nanoid(10);
    const custumberId = userId
    const orderId= userid;
    const getRes = `https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=${orderId}`
   const transToken = await  iniciatePayment({orderId,custumberId,amount});

   if(typeof transToken=="string"){    
       const order = {
           orderId: orderId,
           mid: "PvaAXn89251043200318",
           tranxToken: transToken,
           amount: amount,
           callbackUrl: getRes,
           isStaging: true,
           appInvokeRestricted: true,
           urlScheme: "PaytmMIDPvaAXn89251043200318"
       }
       return order
   }
   return null
}



