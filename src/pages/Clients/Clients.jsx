import { useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { crmAPI } from '@service/api'; 
import { setClientsData, selectClientsData } from '@store/clientsSlice';

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
  const dispatch = useDispatch();
  const clientsData = useSelector(selectClientsData);


  useEffect(() => {
    fetchClientsData();
  }, []);

  const fetchClientsData = () => {
    crmAPI.getAllClientsData()
      .then(response => dispatch(setClientsData(response.data)))
      .catch(error => console.error("Ошибка при получении данных:", error));
  }


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
          placeholder={`Поиск ${dataIndex === 'name' ? 'названия' : dataIndex === 'phone' ? 'телефона' : dataIndex === 'email' ? 'почты' : dataIndex === 'unp' ? 'УНП' : dataIndex === 'initials' ? 'по инициалам' : 'Типа клиента' }`}
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
    dataIndex: 'sign', 
    key: 'sign',
    filters: [
      { text: 'Физ. лицо', value: 'false' },
      { text: 'Юр. лицо', value: 'true' },
    ],
    responsive: ['md'],
    onFilter: (value, record) => String(record.sign) === value,
    render: (text) => (
      <span>{text ? ' Юр. лицо' : 'Физ. лицо'}</span>
    ),
  },
  {
    title: 'УНП',
    width: 100,
    dataIndex: 'unp',
    key: 'unp',
    responsive: ['md'],
    ...getColumnSearchProps('unp'),
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
  

  return (
      <main id="main">
          <Table 
            rowSelection={{ type: selectionType, ...rowSelection }} 
            columns={columns} 
            dataSource={clientsData} 
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
          handleOk={() => {
            setIsModalVisible(false);
            fetchClientsData(); 
          }} 
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
