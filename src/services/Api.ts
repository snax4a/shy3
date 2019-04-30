import axios from 'axios';

export default() => {
    return axios.create({
        baseURL: `https://www.schoolhouseyoga.com`,
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
};
