import * as axios from "axios";

const baseURL = "https://yalantis-react-school-api.yalantis.com/api/v1/";

export const fetchData = async () => {
  return await axios(baseURL + "products/").then((response) => response.data);
};

export const fetchProduct = async (productId) => {
  return await axios(baseURL + `products/${productId}`);
};

export const fetchOrigin = async () => {
  return await axios(baseURL + "products-origins").then(
    (response) => response.data
  );
};

// export const getProductsPerPage = async (num) => {
//   return await axios(baseURL + `products?perPage=${num}`).then(
//     (response) => response.data
//   );
// };

export const priceAPI = {
  async fetchProducts(perPage, min, max) {
    return await axios(baseURL + `products?perPage=${perPage}&minPrice=${min}&maxPrice=${max}`).then(
      (response) => response.data
    );
  },
};
