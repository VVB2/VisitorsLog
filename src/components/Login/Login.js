import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Row, Col, Typography } from 'antd';
import logo from '../../assets/logo-2.png';
const CryptoJS = require('crypto-js');

const Login = () => {
    const { Text } = Typography;
    const localStorage = window.localStorage;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    if (localStorage.getItem('username')) {
        history.push('/dashboard');
    }
    const login = () => {
        setLoading(true);
        axios
            .post(`http://${process.env.REACT_APP_HOST}:5000/api/login`, {
                username,
                password,
            })
            .then((res) => {
                setError(res.data.error);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
        setLoading(false);
    };
    if (error === undefined) {
        if (typeof Storage !== 'undefined') {
            const encryptedUsername = CryptoJS.AES.encrypt(
                username,
                process.env.REACT_APP_SECRET_KEY
            ).toString();
            localStorage.setItem('username', encryptedUsername);
        } else {
            document.getElementById('result').innerHTML =
                'Sorry, your browser does not support Web Storage...';
        }
        history.push('/dashboard');
    }
    return (
        <Row
            justify='center'
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}>
            <Col
                span={10}
                style={{
                    border: '1px solid grey',
                    padding: 20,
                    borderRadius: '5px',
                }}>
                <img
                    src={logo}
                    alt='Logo'
                    style={{
                        maxHeight: '13.8068303094984vh',
                        maxWidth: '20.625vw',
                        margin: 'auto',
                        display: 'block',
                    }}
                />
                <Form
                    name='basic'
                    labelCol={{ offset: 2, span: 20 }}
                    wrapperCol={{ offset: 2, span: 20 }}
                    layout='vertical'
                    initialValues={{ remember: true }}
                    autoComplete='off'>
                    <Form.Item
                        label='Username'
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                        style={{ marginBottom: '2%' }}>
                        <Input onChange={(e) => setUsername(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label='Password'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        style={{ marginBottom: '2%' }}>
                        <Input.Password
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    {error && (
                        <Form.Item
                            wrapperCol={{ offset: 2, span: 20 }}
                            style={{ margin: 0 }}>
                            <Text type='danger' strong>
                                {error}
                            </Text>
                        </Form.Item>
                    )}

                    <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
                        <Button
                            type='primary'
                            htmlType='submit'
                            block
                            size='large'
                            onClick={login}
                            loading={loading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

export default Login;
