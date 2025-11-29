import https from 'https'; 

let cachedData = null;
const fetchCountries = () => {
    return new Promise((resolve, reject) => {

        https.get('https://restcountries.com/v3.1/all', (res) => {
            let data = '';
            res.on('data', (chunk)=>{
                data += chunk;
            })
            res.on('end', ()=>{
                try {
                    cachedData = JSON.parse(data);
                    resolve(cachedData);
                } catch (error) {
                    reject(error);
                }
            })
        }).on('error', (err)=>{
            reject(err);
        })
    })
}

export { fetchCountries };