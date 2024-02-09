import { useState, useRef} from 'react';
import { SearchOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';

import '@assets/styles/main.scss';
import '@assets/styles/global.scss';







function Clients() {
  const [selectionType] = useState('checkbox');
  const [customize] = useState(true);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  };
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Поиск клиента`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Поиск
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Сбросить
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Закрыть
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: 'Full Name',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Age',
      width: 50,
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Column 1',
      dataIndex: 'address',
      key: '1',
      width: 150,
      responsive: ['md'],
    },
    {
      title: 'Column 2',
      dataIndex: 'address',
      key: '2',
      width: 150,
      responsive: ['md'],
    },
    {
      title: 'Column 3',
      dataIndex: 'address',
      key: '3',
      width: 150,
      responsive: ['md'],
    },
    {
      title: 'Column 4',
      dataIndex: 'address',
      key: '4',
      width: 150,
      responsive: ['md'],
    },
    {
      title: 'Column 5',
      dataIndex: 'address',
      key: '5',
      width: 150,
      responsive: ['md'],
    },
  ];
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }

  const customizeRenderEmpty = () => (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <SmileOutlined
        style={{
          fontSize: 20,
        }}
      />
      <p>Данные не найдены</p>
    </div>
  );
  return (
      <main id="main">
        <ConfigProvider renderEmpty={customize ? customizeRenderEmpty : undefined}>
          <Table 
            rowSelection={{ type: selectionType, ...rowSelection }} 
            columns={columns} 
            dataSource={data} 
            pagination={{
              position: ['right'],
            }}
            summary={() => (
              <Table.Summary >
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={2}>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
            />
        </ConfigProvider>
      </main>
  );
}

export default Clients;