import React from 'react';
import axios from 'axios';

export const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        header:{
            Authorization: token
        },
        baseURL: 'http://localhost:5000/api'
    })
}