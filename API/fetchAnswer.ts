let url ='https://api.openai.com/v1/completions';
let auth ='Bearer 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';
export async function getAnswer({question}:{question:string}){
    let body={
        "model": "text-ada-001", 
        "prompt": question,
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
        const value_1:object = await res.json();
        return value_1;
    } catch (err:any) {
        return {error:err.message}
    }

}