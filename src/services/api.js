import * as axios from "axios";

const baseURL = "https://yalantis-react-school-api.yalantis.com/api/v1/";

export const fetchAllDataFirst = () => {
  return axios(baseURL + `products`);
};

export const fetchData = async (
  page = 1,
  perPage = 20,
  origin = "",
  min = null,
  max = null
) => {
  return await axios(
    baseURL +
      `products/?page=${page}&perPage=${perPage}&origins=${origin}&minPrice=${min}&maxPrice=${max}`
  );
};

export const fetchProduct = async (productId) => {
  return await axios(baseURL + `products/${productId}`);
};

export const fetchOrigin = async () => {
  return await axios(baseURL + "products-origins").then(
    (response) => response.data
  );
};
