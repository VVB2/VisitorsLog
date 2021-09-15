import React from 'react';
import { Table, Input, Button, Space, Typography, Card } from 'antd';
import { ExportToCsv } from 'export-to-csv';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, FileOutlined } from '@ant-design/icons';

class ContentBar extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        loading: '',
    };
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() =>
                            this.handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ width: 90 }}>
                        Search
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size='small'
                        style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button
                        type='link'
                        size='small'
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            this.setState({
                                searchText: selectedKeys[0],
                                searchedColumn: dataIndex,
                            });
                        }}>
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? '#1890ff' : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: (text) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const { Title } = Typography;
        const columns = [
            {
                title: 'ID',
                dataIndex: 'ID',
                key: 'ID',
                width: '25%',
                ...this.getColumnSearchProps('ID'),
                sorter: (a, b) => a.ID > b.ID,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Date',
                dataIndex: 'Date',
                key: 'Date',
                width: '25%',
                ...this.getColumnSearchProps('Date'),
                sorter: (a, b) => a.Date > b.Date,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Time',
                dataIndex: 'Time',
                key: 'Time',
                width: '25%',
                ...this.getColumnSearchProps('Time'),
                sorter: (a, b) => a.Time > b.Time,
                sortDirections: ['descend', 'ascend'],
            },
            {
                title: 'Count',
                dataIndex: 'Count',
                key: 'Count',
                width: '25%',
                ...this.getColumnSearchProps('Count'),
                sorter: (a, b) => a.Count > b.Count,
                sortDirections: ['descend', 'ascend'],
            },
        ];
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            filename: 'VisitorsLog',
        };
        const csvExporter = new ExportToCsv(options);
        return (
            <div>
                <Title level={1}>Visitors Log</Title>
                <Card style={{ borderRadius: 15 }}>
                    <Title level={3}>
                        Data List
                        <Button
                            type='primary'
                            shape='round'
                            icon={<FileOutlined />}
                            onClick={() =>
                                csvExporter.generateCsv(this.props.data)
                            }
                            loading={this.state.loading}
                            style={{ float: 'right' }}>
                            Export To CSV
                        </Button>
                    </Title>

                    <Table
                        columns={columns}
                        dataSource={this.props.data}
                        scroll={{ x: 415 }}
                    />
                </Card>
            </div>
        );
    }
}

export default ContentBar;
