import * as axios from "axios";

const instance = axios.create({
  baseURL: "https://yalantis-react-school-api.yalantis.com/api/v1/",
});

export const fetchData = async (params) => {
  return await instance.get("products/", { params });
};

export const fetchProduct = async (productId) => {
  return await instance.get(`products/${productId}`);
};

export const fetchOrigin = async () => {
  return await instance.get("products-origins");
};
