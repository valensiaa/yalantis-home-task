import * as axios from "axios";


const baseURL = 'https://yalantis-react-school-api.yalantis.com/api/v1/products/'


export const fetchData = async() => {   
     return await axios(baseURL).then(response => response.data)
};

export const fetchProduct = async(productId) => {   
     return await axios(baseURL + `${productId}`)
};
