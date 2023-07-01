

const gtp = async({question}:{question:string})=>{
    let url ='https://api.openai.com/v1/chat/completions';
    let auth ='Bearer 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';

    let body={
        "model": "gpt-3.5-turbo", 
        "messages": [{ "role":'user', "content": question }],
        "temperature": 0, 
        "max_tokens": 100
        }

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        const value_1:any = await res.json();
        console.log(value_1?.choices[0]?.message);
        return value_1;
    } catch (err:any) {
       console.log("Error", err)
    }
}




// Get Paytem init tranction.

type initTransBody ={
    orderId:string,
    custumberId:string,
    amount:string,
    cur?:string | null
}

const paytm =async ({orderId,custumberId,amount,cur}:initTransBody) => {
    const url = 'https://server1-aadarshsingh121.b4a.run/pay';
    let body ={
        "orderId":orderId,
        "customberId":custumberId,
        "amount":amount, 
        "cur":cur || "INR"
    }
    try {
    const data = await fetch(url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        const res  = await data.json();
        return res
    } catch (error:any) {
        return {
            err:error.message
        }
    }
    
}




export {
    gtp,
    paytm
};
export type { initTransBody };
