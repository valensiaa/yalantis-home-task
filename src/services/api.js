import * as axios from "axios";

const instance = axios.create({
  baseURL: "https://yalantis-react-school-api.yalantis.com/api/v1/",
  headers: {
  'Content-Type': 'application/json',
  "Authorization": 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6IlZhbGVudHluYSBMZXZjaGVua28iLCJpYXQiOjE2NDIxNzc2NDQsImV4cCI6MTY0NzM2MTY0NH0.EqjU8tcdggt6ZcN4necc2TQDhR_8DT-IZg3Af_gRCb0'
  }
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

export const addProduct = (data) => {
  instance.post("products", data)
 .then(response => console.log(response.data))
 .catch(error => console.error('there was an error', error.response.data))
}

export const editProduct = (data, productId ) => {
  instance.patch(`products/${productId}`, data)
 .then(response => console.log(response.data))
 .catch(error => console.error('there was an error', error.response.data))
}