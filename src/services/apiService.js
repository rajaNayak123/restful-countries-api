import https from 'https'; 

let cachedData = null;
const fetchCountries = () => {
    return new Promise((resolve, reject) => {

        if (cachedData) {
            console.log("Returning data from cache..."); 
            return resolve(cachedData);
        }

        const options = {
            headers: {
                'User-Agent': 'Restful-Countries-App/1.0'
            }
        };

        // update the URL Added ?fields=name,region,population
        https.get('https://restcountries.com/v3.1/all?fields=name,region,population', options, (res) => {
            // Check for valid HTTP status code
            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error(`API request failed with status code ${res.statusCode}`));
            }

            let data = '';
            res.on('data', (chunk)=>{
                data += chunk;
            })
            res.on('end', ()=>{
                try {
                    const parsedData = JSON.parse(data);
                    
                    // Validate that the response is an array
                    if (!Array.isArray(parsedData)) {
                        return reject(new Error('API response is not an array'));
                    }

                    cachedData = parsedData;
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