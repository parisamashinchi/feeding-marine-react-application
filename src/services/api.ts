import Axios from 'axios';
import Alert from '@mui/material/Alert';
import React from 'react'
import AlertComponent from '../components/Molecules/AlertComponent/AlertComponent'
import { type } from '@testing-library/user-event/dist/type'
export let http = Axios.create({
      baseURL: 'https://api-staging-ifeed.ilabmarine.com/api/',
      // headers: { 'Authorization': `Bearer ${  localStorage.getItem('token')}` },
});

export function setHeaderToken(token: string) {
    http.defaults.headers.common['Authorization'] = `Bearer ${  token}`;
}

http.interceptors.request.use(
  config => {
        if (config.headers && !config.headers.Authorization) {
          const token = localStorage.getItem("token");

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
    },
    function (error) {
        // Do something with request error
        // toast('Error with the server', 'error');
        // localStorage.removeItem('token');
        return Promise.reject(error);
    }
);
// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
});

export function get(url: string, params?: any): Promise<any> {
    return http
        .get(url, {
            params,
        })
        .then((res) => res.data)
        .catch((reason) => {
            console.error(reason.message);
        });
}

export function post(url: string, params?: any): Promise<any> {
    return http
        .post(url, params)
        .then((res) => res.data)
        .catch((errors) =>
          errors.response
        );
}

export function put(url: string, params?: any): Promise<any> {
    return http
        .put(url, params)
        .then((res) => res.data)
        .catch((errors) =>
          errors.response
        );
}

export function deleteReq(url: string, params?: any): Promise<any> {
    return http
        .delete(url, params)
        .then((res) => res.data)
        .catch((reason) => {
            console.error(reason.message);
        });
}
