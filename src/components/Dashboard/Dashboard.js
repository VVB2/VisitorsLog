import React from 'react';
import { useHistory } from 'react-router-dom';
import FullLayout from './FullLayout';
import 'antd/dist/antd.css';

const Dashboard = () => {
    const history = useHistory();
    const localStorage = window.localStorage;
    const username = localStorage.getItem('username');
    if (!username) history.push('/');
    return <FullLayout username={username} />;
};

export default Dashboard;
