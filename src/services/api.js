import axios from 'axios';

//KEY 2231ee0f0b400c1bf3bc486fd9b87e125c705870
//base url https://api-ssl.bitly.com/v4

export const key = '2231ee0f0b400c1bf3bc486fd9b87e125c705870';

const api = axios.create({

    baseURL:'https://api-ssl.bitly.com/v4',
    headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${key}`
    }
})

export default api;