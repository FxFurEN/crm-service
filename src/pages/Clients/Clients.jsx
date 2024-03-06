import { useState, useRef} from 'react';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';

import '@assets/styles/main.scss';
import '@assets/styles/global.scss';
import Floatbutton from '@components/float-button/FloatButton';
import NewClients from './NewClients';
import InfoClients from './InfoClients';
function Clients() {
  const [selectionType] = useState('checkbox');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleAddClient = () => {
    setIsModalVisible(true); 
  };
  const handleInfoModal = (client) => {
    setSelectedClient(client);
    setIsModalVisible1(true);
    
  };

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
          placeholder={`Поиск ${dataIndex === 'name' ? 'Имени' : dataIndex === 'phone' ? 'Телефона' : dataIndex === 'email' ? 'Почты' : 'Типа клиента'}`}
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
          title: 'Имя',
          width: 100,
          dataIndex: 'name',
          key: 'name',
          fixed: 'left',
          ...getColumnSearchProps('name'),
      },
      {
          title: 'Телефон',
          width: 150,
          dataIndex: 'phone',
          key: 'phone',
          ...getColumnSearchProps('phone'),
      },
      {
          title: 'Почта',
          width: 100,
          dataIndex: 'email',
          key: 'email',
          responsive: ['md'],
          ...getColumnSearchProps('email'),
      },
      {
          title: 'Тип клиента',
          width: 150,
          dataIndex: 'clientType',
          key: 'clientType',
          filters: [
              { text: 'Физ. лицо', value: '1' },
              { text: 'Юр. лицо', value: '2' },
          ],
          responsive: ['md'],
          onFilter: (value, record) => record.clientType.startsWith(value),
          render: (text) => (
              <span>{text === '1' ? 'Физ. лицо' : 'Юр. лицо'}</span>
          ),
      },
      {
          title: 'ИНН',
          width: 100,
          dataIndex: 'inn',
          key: 'inn',
          responsive: ['md'],
          ...getColumnSearchProps('inn'),
      },
      {
          title: 'ФИО',
          width: 100,
          dataIndex: 'initials',
          key: 'initials',
          responsive: ['md'],
          ...getColumnSearchProps('initials'),
      },
  ];
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
        key: i,
        name: i % 2 === 0 ? `Компания ${i}` : '',
        phone: `+375(29) 501-27-66`,
        email: `example${i}@gmail.com`,
        clientType: i % 2 === 0 ? '' : '1',
        inn: i % 2 === 0 ? `123456789${i}` : '',
        initials: i % 2 !== 0 ? `Абметка Валерий ${i}` : '',
    });
}

  return (
      <main id="main">
          <Table 
            rowSelection={{ type: selectionType, ...rowSelection }} 
            columns={columns} 
            dataSource={data} 
            pagination={{
              pageSize: 50,
              position: ['none'],
            }}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => handleInfoModal(record),   
              };
            }}

            scroll={{
              y: 600,
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
        <Floatbutton 
            text="Добавить клиента" 
            icon={<PlusOutlined />} 
            onClick={handleAddClient} 
        />
        <NewClients
          visible={isModalVisible} 
          handleOk={() => setIsModalVisible(false)} 
          handleCancel={() => setIsModalVisible(false)}
        />
       <InfoClients 
            visible={isModalVisible1} 
            handleOk={() => setIsModalVisible1(false)} 
            handleCancel={() => setIsModalVisible1(false)}
            client={selectedClient} 
        />
      </main>
  );
}

export default Clients;
