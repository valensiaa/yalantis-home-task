import * as axios from 'axios'

export const getUsers = () => {
    ///users?page=${currentPage}&count=${pageSize}`
    return axios.get(`https://yalantis-react-school-api.yalantis.com/api/v1/products`)
    .then(response => response.data)
}