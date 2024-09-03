import axios from "axios";

const API_URL = "http://localhost:3030";

export const fetchUsers = () => {
    return axios.get(`${API_URL}/user/find-all`);
};

export const fetchHomesByUser = (username) => {
    return axios.get(`${API_URL}/home/find-by-user/${username}`);
};

export const fetchUsersByHome = (street_address) => {
    return axios.get(`${API_URL}/user/find-by-home/${street_address}`);
};

export const updateUserHome = (street_address, users) => {
    return axios.post(`${API_URL}/home/update-users/${street_address}`, {
        users,
    });
};
