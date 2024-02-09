import { useState,useRef } from 'react';

import { Button, ConfigProvider, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, SmileOutlined } from '@ant-design/icons';

const Orders = () => {
  const [selectionType] = useState('checkbox');
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
  const [customize] = useState(true);
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
          placeholder={`Поиск клиента `}
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
      title: 'Товар',
      width: 50,
      dataIndex: 'goods',
      key: 'good',
    },
    {
      title: 'Дата создания',
      width: 50,
      dataIndex: 'updateDate',
      key: 'update',
      responsive: ['md'],
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: '1',
      width: 50,
      responsive: ['md'],
    },
    {
      title: 'Клиент',
      width: 50,
      dataIndex: 'nameClient',
      key: 'client',
      fixed: 'left',
      ...getColumnSearchProps('nameClient'),
    },
    {
      title: 'Сотрудник',
      width: 50,
      dataIndex: 'employee',
      key: 'employee',
    },
  ];
  const data = [];
  for (let i = 1; i < 31; i++) {
    data.push({
      key: i,
      updateDate: `Update in 07.${i}`,
      goods: `Goods ${i}`,
      status: `Status ${i}`,
      nameClient: `Employee ${i}`,
      employee: `Employee ${i}`,
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
    <>
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
    </>
    
  );
}

export default Orders