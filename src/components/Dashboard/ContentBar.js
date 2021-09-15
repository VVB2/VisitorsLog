import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import GaugeChart from 'react-gauge-chart';
import { Layout, Card, Row, Col, Typography } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const gatesData = require('../../gates');

const ContentBar = () => {
    const [data, setData] = useState([]);
    const { Title } = Typography;
    //Initial data fetching
    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`http://${process.env.REACT_APP_HOST}:5000/api/get`)
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
                .get(`http://${process.env.REACT_APP_HOST}:5000/api/get`)
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

    // function lastFiveMinuteData(ID) {
    //     let filter_data = data.filter(function (item) {
    //         return item.ID === ID;
    //     });
    //     if (filter_data.length > 0) {
    //         var maxTime = moment(
    //             Math.max.apply(
    //                 null,
    //                 filter_data.map(function (o) {
    //                     return new Date(o.Date + ' ' + o.Time);
    //                 })
    //             )
    //         ).format('HH:mm');

    //         return filter_data.filter(function (item) {
    //             return item.Time === maxTime;
    //         })[0].Count;
    //     }
    //     return 0;
    // }

    let currentTime = moment().tz('Asia/Hong_Kong');
    let lastFiveMinuteTime = currentTime
        .subtract(currentTime.format('mm') % 5, 'minutes')
        .format('HH:mm');

    function lastFiveMinute(ID) {
        let filter_data = data.filter(function (item) {
            return item.ID === ID;
        });
        if (filter_data.length > 0) {
            let minuteData = filter_data.filter(function (item) {
                return item.Time === lastFiveMinuteTime;
            });

            if (minuteData.length > 0) {
                return minuteData[0].Count;
            }
        }
        return 0;
    }

    const gates = gatesData.data;
    console.log(gates);
    const { Content } = Layout;

    let entriesID = [];
    for (const gate in gates) {
        if (['E1', 'E2', 'W1', 'W2'].includes(gate)) {
            entriesID = entriesID.concat(gates[gate]);
        }
    }

    let gateCount = {};
    for (const index in data) {
        gateCount[data[index].ID] =
            (gateCount[data[index].ID] || 0) + data[index].Count;
    }

    let overallCount = 0;
    for (const gateID in gateCount) {
        if (entriesID.includes(gateID)) {
            overallCount += gateCount[gateID];
        } else {
            overallCount -= gateCount[gateID];
        }
    }
    console.log(data);

    const colors = ['green', 'lightgreen', 'yellow', 'orange', '#ED2939'];
    const percentage = overallCount / 9000;
    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }
    const [width] = useWindowSize();

    return (
        <Content>
            <Row>
                <Col span={24}>
                    <Title
                        level={2}
                        style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        2021 Mid Autumn Lantern Festival
                    </Title>
                    <div>
                        <span
                            style={{
                                letterSpacing: '.125rem',
                                color: '#818ea3',
                                fontSize: '.700rem',
                                fontWeight: 'bold',
                            }}>
                            DASHBOARD
                        </span>
                        <h3
                            style={{
                                fontSize: '1.625rem',
                                fontWeight: 'bold',
                            }}>
                            Visitors Overview
                        </h3>
                    </div>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Card
                        bordered={false}
                        style={
                            width >= 907
                                ? {
                                      borderRadius: 15,
                                      width: 500,
                                      height: 250,
                                      margin: '0 2vw 0 0',
                                  }
                                : {
                                      borderRadius: 15,
                                      width: 210,
                                      padding: 10,
                                  }
                        }>
                        <Title level={2} style={{ textAlign: 'center' }}>
                            Number of Visitors in Venue
                        </Title>
                        <Title
                            level={1}
                            style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            <TeamOutlined style={{ marginRight: 20 }} />
                            {new Intl.NumberFormat().format(overallCount)}
                        </Title>
                    </Card>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <GaugeChart
                        id='gauge-chart5'
                        nrOfLevels={420}
                        arcsLength={[0.2, 0.2, 0.2, 0.2, 0.2]}
                        colors={colors}
                        percent={percentage}
                        textColor='black'
                        arcPadding={0.02}
                        needleColor={colors[Math.floor(percentage / 0.2)]}
                        needleBaseColor={colors[Math.floor(percentage / 0.2)]}
                        style={
                            width >= 882
                                ? {
                                      width: 500,
                                      height: 250,
                                      background: '#fff',
                                      borderRadius: 15,
                                      float: 'right',
                                  }
                                : {
                                      width: 250,
                                      height: 150,
                                      padding: 10,
                                      background: '#fff',
                                      borderRadius: 15,
                                      marginTop: '2vh',
                                  }
                        }
                    />
                </Col>
                <Col span={24}>
                    <Card
                        title={
                            <div>
                                <div style={{ float: 'left' }}>
                                    Gate Wise Information
                                </div>
                                <div
                                    style={{
                                        float: 'right',
                                    }}>
                                    <span
                                        style={{
                                            padding: '5px 10px',
                                            borderRadius: 10,
                                            marginRight: '2vw',
                                            background: 'lightgreen',
                                            fontWeight: 'bold',
                                        }}>
                                        Entry Gates
                                    </span>
                                    <span
                                        style={{
                                            padding: '5px 10px',
                                            background: '#ED2939',
                                            borderRadius: 10,
                                            color: '#fff',
                                            fontWeight: 'bold',
                                        }}>
                                        Exit Gates
                                    </span>
                                </div>
                            </div>
                        }
                        style={{ borderRadius: 15, marginTop: '2vh' }}>
                        <Row>
                            {Object.keys(gates).map((gate, i) => (
                                <Col xs={24} sm={12} lg={6} key={i}>
                                    <Card
                                        style={
                                            i + 1 <= 4
                                                ? {
                                                      margin: '1rem .5rem',
                                                      background: 'lightgreen',
                                                      borderRadius: '20px',
                                                      textAlign: 'center',
                                                  }
                                                : {
                                                      margin: '1rem .5rem',
                                                      background: '#ED2939',
                                                      borderRadius: '20px',
                                                      textAlign: 'center',
                                                  }
                                        }>
                                        <Title
                                            {...(width > 406
                                                ? { level: 4 }
                                                : { level: 6 })}
                                            level={4}
                                            style={
                                                i + 1 > 4 && {
                                                    color: '#fff',
                                                }
                                            }>
                                            {gate}
                                            <br />
                                            {lastFiveMinute(gates[gate][0]) +
                                                lastFiveMinute(gates[gate][1])}
                                        </Title>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Content>
    );
};

export default ContentBar;
