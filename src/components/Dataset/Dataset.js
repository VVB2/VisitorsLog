import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import TableLayout from './TableLayout';
const CryptoJS = require('crypto-js');

const Dataset = () => {
    const history = useHistory();
    const [data, setData] = useState([]);
    const localStorage = window.localStorage;
    const username = localStorage.getItem('username');
    let bytes;
    if (!username) history.push('/');
    else
        bytes = CryptoJS.AES.decrypt(
            username,
            process.env.REACT_APP_SECRET_KEY
        );

    if (!username || bytes.toString(CryptoJS.enc.Utf8) !== 'admin') {
        history.push('/');
    }

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`http://${process.env.REACT_APP_HOST}:5000/api/getAll`)
                .then((res) => {
                    setData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchData();
    }, []);

    //Data fetch after every 5 min
    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`http://${process.env.REACT_APP_HOST}:5000/api/getAll`)
                .then((res) => {
                    setData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        const timer = setInterval(() => {
            fetchData();
        }, 12000);
        return () => clearTimeout(timer);
    }, []);

    return <TableLayout data={data} />;
};

export default Dataset;
