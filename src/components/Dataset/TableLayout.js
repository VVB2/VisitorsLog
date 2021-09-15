import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
    LogoutOutlined,
    HomeOutlined,
    DatabaseOutlined,
} from '@ant-design/icons';
import logo from '../../assets/logo-1.png';
import ContentBar from './ContentBar';
const { Content, Footer, Sider } = Layout;

class TableLayout extends React.Component {
    state = {
        collapsed: false,
    };
    componentDidMount() {
        window.addEventListener('resize', this.resize.bind(this));
        this.resize();
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize.bind(this));
    }

    resize() {
        let currentHideNav = window.innerWidth <= 760;
        if (currentHideNav !== this.state.hideNav) {
            this.setState({ hideNav: currentHideNav });
        }
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    };
    render() {
        const localStorage = window.localStorage;
        const { collapsed } = this.state;
        return (
            <Layout style={{ overflow: 'hidden' }}>
                <Sider
                    {...(!this.state.hideNav
                        ? { width: '15.625vw' }
                        : { width: '30vw' })}
                    style={{
                        left: 0,
                        fontFamily: 'Segoe UI',
                        minHeight: '100vh',
                    }}
                    breakpoint='lg'
                    collapsible
                    collapsed={collapsed}
                    onCollapse={this.onCollapse}>
                    <Link to='/dashboard'>
                        <img
                            src={logo}
                            alt='Logo'
                            style={{
                                maxHeight: '45px',
                                margin: '10px',
                                float: 'left',
                            }}
                        />
                        {!this.state.collapsed && (
                            <div
                                style={{
                                    fontSize: '.90rem',
                                    color: '#3d5170',
                                    fontWeight: 1000,
                                    marginTop: 10,
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                }}>
                                Leisure and Cultural <br />
                                Services Department
                            </div>
                        )}
                    </Link>
                    <Menu
                        style={{ marginTop: '10px' }}
                        theme='dark'
                        defaultSelectedKeys={['2']}
                        mode='inline'>
                        <Menu.Item key='1' icon={<HomeOutlined />}>
                            <Link to='/dashboard'>
                                <span
                                    style={{
                                        fontSize: '1rem',
                                    }}>
                                    Main
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='2' icon={<DatabaseOutlined />}>
                            <Link to='/sensordata'>
                                <span
                                    style={{
                                        fontSize: '1rem',
                                    }}>
                                    Dataset
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item
                            key='3'
                            icon={<LogoutOutlined />}
                            onClick={() => {
                                localStorage.removeItem('username');
                            }}>
                            <Link to='/'>
                                <span
                                    style={{
                                        fontSize: '1rem',
                                    }}>
                                    Logout
                                </span>
                            </Link>
                        </Menu.Item>{' '}
                    </Menu>
                </Sider>
                <Layout className='site-layout'>
                    <Content
                        style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                            }}>
                            <ContentBar data={this.props.data} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Copyright © 2018 Leisure and Cultural Services
                        Department
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default TableLayout;
